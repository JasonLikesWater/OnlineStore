import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { tokenAuth } from "../tokenAuth.js";
import { getPool } from "../db.js";

const router = express.Router();

/**
 * GET the logged in user
 * /api/user/me
 */ 
router.get('/me', tokenAuth, async(req, res) => {
  const userId = req.user.UserId;
  try{
    const pool = await getPool();
    const result = await pool
      .request()
      .input('UserId', userId)
      .query('SELECT UserId, Username FROM Users WHERE UserId = @UserId');
    if(result.recordset.length === 0){
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.recordset[0]);
  }catch(error){
    console.error("Error fetching User:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET the logged in user's cart
 * /api/user/me/carts
 */
router.get('/me/carts', tokenAuth, async (req, res) => {
  const userId = req.user.UserId;
  const query = `SELECT Carts.CartId, Orders.OrderId, Movies.MovieId, Movies.Title, Movies.Price FROM Carts LEFT JOIN Orders ON Carts.CartId = Orders.CartId LEFT JOIN Movies ON Orders.MovieId = Movies.MovieId WHERE Carts.UserId = @UserId`;
  try{
    const pool = await getPool();
    const result = await pool
      .request()
      .input('UserId', userId)
      .query(query);
    res.json(result.recordset);
  }catch(error){
    console.error("Error fetching user's carts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET a specific user's reviews
 * /api/user/me/reviews
 */
router.get('/me/reviews', tokenAuth, async (req, res) => {
  const userId = req.user.UserId;
  const query = `SELECT ReviewId, CriticId, ReviewDescription, Rating FROM Reviews WHERE CriticId = @UserId`;
  try{
    const pool = await getPool();
    const result = await pool
      .request()
      .input('UserId', userId)
      .query(query);
    res.json(result.recordset);
  }catch(error){
    console.error("Error fetching user's carts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Create a new user.
 *
 * Required fields:
 *  Username, PasswordHash
 *
 * POST /api/users
 */
router.post('/', async (req, res) => {
  const { Username, PasswordHash } = req.body;
  const required = [Username, PasswordHash];
  if(required.some(field => field === undefined)){
    return res.status(400).json({ error: "Missing required fields" });
  }
  try{
    const pool = await getPool();
    const existingUser = await pool.request()
      .input("Username", Username)
      .query("SELECT UserId FROM Users WHERE LOWER(Username) = LOWER(@Username)");
    if(existingUser.recordset.length > 0){
      return res.status(400).json({ error: "Username already exists"});
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(PasswordHash, saltRounds);
    const userResult = await pool.request()
      .input("Username", Username)
      .input("PasswordHash", hashedPassword)
      .query(`INSERT INTO Users (Username, PasswordHash) OUTPUT INSERTED.* VALUES (@Username, @PasswordHash)`);
    const newUser = userResult.recordset[0];
    await pool.request()
      .input("UserId", newUser.UserId)
      .query(`INSERT INTO Carts (UserId) VALUES (@UserId)`);
    const { PasswordHash: _, ...userSafe} = newUser;
    res.status(201).json({message: "User and cart created successfully", user: userSafe});
  }catch (err){
    console.error("Error inserting user and cart:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Log in an existing user.
 *
 * This route checks the username and password, and if valid,
 * returns a signed JWT token that the front end will use for
 * authenticated requests.
 *
 * Important:
 *  Create your own .env file in the back_end folder
 *  and add the following line (with any value you choose):
 *
 *    JWT_KEY = yourvaluesgoeshere
 *
 *  Do not commit your .env file to git.
 *  Everyone will have their own local key.
 *  Your local JWT tokens only need to work on your own computer.
 *
 *  POST /api/users/login
 */
router.post('/login', async (req, res) => {
  const { Username, Password } = req.body;
  const required = [Username, Password];
  if(required.some(field => field === undefined)){
    return res.status(400).json({ error: "Missing required fields" });
  }
  try{
    const pool = await getPool();
    const userQuery = await pool.request()
      .input("Username", Username)
      .query(`SELECT * FROM Users WHERE LOWER(Username) = LOWER(@Username)`);
    if(userQuery.recordset.length === 0){
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const user = userQuery.recordset[0];
    const passwordMatches = await bcrypt.compare(Password, user.PasswordHash);
    if(!passwordMatches){
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const token = jwt.sign(
      { UserId: user.UserId, Username: user.Username },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    const { PasswordHash, ...userSafe } = user;
    return res.json({
      message: "Logged in successfully",
      token,
      user: userSafe
    });
  }catch(error){
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Update an existing user.
 *
 * All fields are optional, any field not provided will not be changed.
 *
 * PUT /api/users/me
 */
router.put('/me', tokenAuth, async (req, res) => {
  const id = req.user.UserId;
  const allowedFields = ["Username", "PasswordHash"];
  const updates = {};
  for(const [key, value] of Object.entries(req.body)){
    if((allowedFields.includes(key)) && (value !== undefined)){
      updates[key] = value;
    }
  }
  if(Object.keys(updates).length === 0){
    return res.status(400).json({ error: "No fields provided to update" });
  }
  const pool = await getPool();
  if (updates.Username) {
    const existingUser = await pool.request()
      .input("Username", updates.Username)
      .input("UserId", id)
      .query("SELECT UserId FROM Users WHERE LOWER(Username) = LOWER(@Username) AND UserId != @UserId");
    if (existingUser.recordset.length > 0) {
      return res.status(400).json({ error: "Username already taken" });
    }
  }
  if(updates.PasswordHash){
    const saltRounds = 10;
    updates.PasswordHash = await bcrypt.hash(updates.PasswordHash, saltRounds);
  }
  const setClauses = Object.keys(updates)
    .map(field => `${field} = @${field}`)
    .join(", ");
  const query = `UPDATE Users SET ${setClauses} WHERE UserId = @UserId`;
  try{
    const request = pool.request().input("UserId", id);
    for(const [key, value] of Object.entries(updates)){
      request.input(key, value);
    }
    await request.query(query);
    res.json({ message: "User updated successfully" });
  }catch(error){
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Delete a user and all related records besides reviews.
 *
 * This will set CriticId to NULL in all reviews made by the user.
 * 
 * This will remove:
 *  User's orders
 *  User's cart
 *  The user itself
 *
 * DELETE /api/users/me
 */
router.delete('/me', tokenAuth, async (req, res) => {
  const id = req.user.UserId;
  try {
    const pool = await getPool();
    const userResult = await pool.request()
      .input("UserId", id)
      .query(`SELECT UserId FROM Users WHERE UserId = @UserId`);
    if(userResult.recordset.length === 0){
      return res.status(404).json({ error: "User not found" });
    }
    await pool.request()
      .input("UserId", id)
      .query(`UPDATE Reviews SET CriticId = NULL WHERE CriticId = @UserId`);
    const cartResult = await pool.request()
      .input("UserId", id)
      .query(`SELECT CartId FROM Carts WHERE UserId = @UserId`);
    if(cartResult.recordset.length === 0){
      await pool.request()
        .input("UserId", id)
        .query(`DELETE FROM Users WHERE UserId = @UserId`);
      return res.json({ message: "User deleted (no cart found)" });
    }
    const cartId = cartResult.recordset[0].CartId;
    await pool.request()
      .input("CartId", cartId)
      .query(`DELETE FROM Orders WHERE CartId = @CartId`);
    await pool.request()
      .input("UserId", id)
      .query(`DELETE FROM Carts WHERE UserId = @UserId`);
    await pool.request()
      .input("UserId", id)
      .query(`DELETE FROM Users WHERE UserId = @UserId`);
    res.json({
      message: "User, cart, and all cart orders deleted successfully"
    });
  }catch(error){
    console.error("Error deleting user, cart, or orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;