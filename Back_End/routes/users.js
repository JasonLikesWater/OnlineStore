import express from "express";
import { getPool } from '../db.js';

const router = express.Router();

/** 
 * GET all users
 * /api/users
 */
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM Users");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

/**
 * GET a specific user
 * /api/user/:id
 */ 
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('UserId', userId)
      .query('SELECT * FROM Users WHERE UserId = @UserId');
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error fetching User:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET a specific user's cart
 * /api/user/:id/carts
 */
router.get('/:id/carts', async (req, res) => {
  const userId = req.params.id;
  const query = `SELECT Carts.CartId, Orders.OrderId, Movies.MovieId, Movies.Title, Movies.Price FROM Carts LEFT JOIN Orders ON Carts.CartId = Orders.CartId LEFT JOIN Movies ON Orders.MovieId = Movies.MovieId WHERE Carts.UserId = @UserId`;
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('UserId', userId)
      .query(query);
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching user's carts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET a specific user's reviews
 * /api/user/:id/reviews
 */
router.get('/:id/reviews', async (req, res) => {
  const userId = req.params.id;
  const query = `SELECT ReviewId, CriticId, ReviewDescription, Rating FROM Reviews WHERE CriticId = @UserId`;
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('UserId', userId)
      .query(query);
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching user's carts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Create a new user.
 *
 * Required fields:
 *  UserName, PasswordHash
 *
 * POST /api/sales
 */
router.post('/', async (req, res) => {
  const { UserName, PasswordHash } = req.body;
  const required = [UserName, PasswordHash];
  if (required.some(field => field === undefined)) {
  return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const pool = await getPool();
    const userResult = await pool.request()
      .input("UserName", UserName)
      .input("PasswordHash", PasswordHash)
      .query(`INSERT INTO Users (UserName, PasswordHash) OUTPUT INSERTED.* VALUES (@UserName, @PasswordHash)`);
    const newUser = userResult.recordset[0];
    await pool.request()
      .input("UserId", newUser.UserId)
      .query(`INSERT INTO Carts (UserId) VALUES (@UserId)`);
    res.status(201).json({message: "User and cart created successfully", user: newUser});
  } catch (err) {
    console.error("Error inserting user and cart:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Update an existing user.
 *
 * All fields are optional, any field not provided will not be changed.
 *
 * PUT /api/users/:id
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = {};
  for (const [key, value] of Object.entries(req.body)) {
    if (value !== undefined) {
      updates[key] = value;
    }
  }
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "No fields provided to update" });
  }
  const setClauses = Object.keys(updates)
    .map(field => `${field} = @${field}`)
    .join(", ");
  const query = `UPDATE Users SET ${setClauses} WHERE UserId = @UserId`;
  try {
    const pool = await getPool();
    const request = pool.request().input("UserId", id);
    for (const [key, value] of Object.entries(updates)) {
      request.input(key, value);
    }
    await request.query(query);
    res.json({ message: "User updated successfully" });
  } catch (error) {
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
 * DELETE /api/users/:id
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getPool();
    await pool.request()
      .input("UserId", id)
      .query(`UPDATE Reviews SET CriticId = NULL WHERE CriticId = @UserId`);
    const cartResult = await pool.request()
      .input("UserId", id)
      .query(`SELECT CartId FROM Carts WHERE UserId = @UserId`);
    if (cartResult.recordset.length === 0) {
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
  } catch (error) {
    console.error("Error deleting user, cart, or orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;