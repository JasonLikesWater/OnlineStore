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

export default router;