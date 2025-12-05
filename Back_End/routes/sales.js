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

/**
 * Create a new sale.
 *
 * Required fields:
 *  Discount, StartDate, EndDate, Category
 *
 * POST /api/sales
 */
router.post('/', async (req, res) => {
  const { Discount, StartDate, EndDate, Category } = req.body;
  const required = [Discount, StartDate, EndDate, Category];
  if (required.some(field => field === undefined)) {
  return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input("Discount", Discount)
      .input("StartDate", StartDate)
      .input("EndDate", EndDate)
      .input("Category", Category)
      .query(`INSERT INTO Sales (Discount, StartDate, EndDate, Category) OUTPUT INSERTED.* VALUES (@Discount, @StartDate, @EndDate, @Category)`);
    res.status(201).json(result.recordset[0]);

  } catch (err) {
    console.error("Error inserting sale:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Update an existing sale.
 *
 * All fields are optional, any field not provided will not be changed.
 *
 * PUT /api/sales/:id
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
  const query = `UPDATE Sales SET ${setClauses} WHERE SaleId = @SaleId`;
  try {
    const pool = await getPool();
    const request = pool.request().input("SaleId", id);
    for (const [key, value] of Object.entries(updates)) {
      request.input(key, value);
    }
    await request.query(query);
    res.json({ message: "Sale updated successfully" });
  } catch (error) {
    console.error("Error updating sale:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Delete a sale and all related records.
 *
 * This will remove:
 *  MovieSales links
 *  The sale itself
 * 
 * DELETE /api/sales/:id
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM Sales WHERE SaleId = @SaleId`;
  try {
    const pool = await getPool();
    await pool.request()
      .input('SaleId', id)
      .query(`DELETE FROM MovieSales WHERE SaleId = @SaleId`);
    await pool.request().input('SaleId', id).query(query);
    res.json({ message: "Sale deleted successfully" });
  } catch (error) {
    console.error("Error deleting sale:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;