import express from "express";
import { getPool } from "../db.js";

const router = express.Router();

/** 
 * GET all reviews
 * /api/reviews
 */
router.get('/', async (req, res) => {
  try{
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM Reviews");
    res.json(result.recordset);
  }catch(err){
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

/**
 * GET a specific review
 * /api/reviews/:id
 */ 
router.get('/:id', async (req, res) => {
  const reviewId = req.params.id;
  try{
    const pool = await getPool();
    const result = await pool
      .request()
      .input('ReviewId', reviewId)
      .query('SELECT * FROM Reviews WHERE ReviewId = @ReviewId');
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(result.recordset[0]);
  }catch(error){
    console.error("Error fetching Review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Create a new review.
 *
 * Required fields:
 *  CriticId, ReviewDescription, Rating
 *
 * POST /api/reviews
 */
router.post('/', async (req, res) => {
  const { CriticId, ReviewDescription, Rating } = req.body;
  const required = [CriticId, ReviewDescription, Rating];
  if(required.some(field => field === undefined)){
    return res.status(400).json({ error: "Missing required fields" });
  }
  try{
    const pool = await getPool();
    const result = await pool.request()
      .input("CriticId", CriticId)
      .input("ReviewDescription", ReviewDescription)
      .input("Rating", Rating)
      .query(`INSERT INTO Reviews (CriticId, ReviewDescription, Rating) OUTPUT INSERTED.* VALUES (@CriticId, @ReviewDescription, @Rating)`);
    res.status(201).json(result.recordset[0]);
  }catch(err){
    console.error("Error inserting review:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Update an existing review.
 *
 * All fields are optional, any field not provided will not be changed.
 *
 * PUT /api/reviews/:id
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const allowedFields = ["CriticId", "ReviewDescription", "Rating"];
  const updates = {};
  for(const [key, value] of Object.entries(req.body)){
    if((allowedFields.includes(key)) && (value !== undefined)){
      updates[key] = value;
    }
  }
  if(Object.keys(updates).length === 0){
    return res.status(400).json({ error: "No fields provided to update" });
  }
  const setClauses = Object.keys(updates)
    .map(field => `${field} = @${field}`)
    .join(", ");
  const query = `UPDATE Reviews SET ${setClauses} WHERE ReviewId = @ReviewId`;
  try {
    const pool = await getPool();
    const request = pool.request().input("ReviewId", id);
    for(const [key, value] of Object.entries(updates)){
      request.input(key, value);
    }
    await request.query(query);
    res.json({ message: "Review updated successfully" });
  }catch(error){
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Delete a review and all related records.
 *
 * This will remove:
 *  MovieReview links
 *  The review itself
 * 
 * DELETE /api/reviews/:id
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM Reviews WHERE ReviewId = @ReviewId`;
  try{
    const pool = await getPool();
    await pool.request()
      .input('ReviewId', id)
      .query(`DELETE FROM MovieReview WHERE ReviewId = @ReviewId`);
    await pool.request().input('ReviewId', id).query(query);
    res.json({ message: "ReviewId deleted successfully" });
  }catch(error){
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;