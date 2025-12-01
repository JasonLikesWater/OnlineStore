import express from "express";
import { getPool } from '../db.js';

const router = express.Router();

/** 
 * GET all sales
 * /api/sales
 */
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM Sales");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching sales:", err);
    res.status(500).json({ error: "Failed to fetch sales" });
  }
});

/**
 * GET a specific sale
 * /api/sale/:id
 */ 
router.get('/:id', async (req, res) => {
  const saleId = req.params.id;
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('SaleId', saleId)
      .query('SELECT * FROM Sales WHERE SaleId = @SaleId');
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Sale not found" });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error fetching sale:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET the movies that are part of a specific sale
 * /api/sales/:id/movies
 */
router.get('/:id/movies', async (req, res) => {
  const saleId = req.params.id;
  const query = `SELECT Movies.* FROM movieSales JOIN Movies ON MovieSales.MovieId = Movies.MovieId WHERE MovieSales.SaleId = @SaleId`;
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('SaleId', saleId)
      .query(query);
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching movies that are a part of this sale:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;