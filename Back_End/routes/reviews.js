import express from "express";
import { getPool } from '../db.js';

const router = express.Router();

/** 
 * GET all reviews
 * /api/reviews
 */
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM Reviews");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

/**
 * GET a specific review
 * /api/review/:id
 */ 
router.get('/:id', async (req, res) => {
  const reviewId = req.params.id;
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('ReviewId', reviewId)
      .query('SELECT * FROM Reviews WHERE ReviewId = @ReviewId');
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error fetching Review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;