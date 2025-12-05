import express from "express";
import { getPool } from '../db.js';

const router = express.Router();

/** 
 * GET all genres
 * /api/genres
 */
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM Genres");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching genres:", err);
    res.status(500).json({ error: "Failed to fetch genres" });
  }
});

/**
 * GET a specific genre
 * /api/genres/:id
 */ 
router.get('/:id', async (req, res) => {
  const genreId = req.params.id;
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('GenreId', genreId)
      .query('SELECT * FROM Genres WHERE GenreId = @GenreId');
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Genre not found" });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error fetching genre:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;