import express from "express";
import { getPool } from "../db.js";

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
  try{
    const pool = await getPool();
    const result = await pool
      .request()
      .input('GenreId', genreId)
      .query('SELECT * FROM Genres WHERE GenreId = @GenreId');
    if(result.recordset.length === 0){
      return res.status(404).json({ error: "Genre not found" });
    }
    res.json(result.recordset[0]);
  }catch(error){
    console.error("Error fetching genre:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Create a new genre.
 *
 * Required fields:
 *  Name
 *
 * POST /api/genres
 */
router.post('/', async (req, res) => {
  const { Name } = req.body;
  const required = [Name];
  if(required.some(field => field === undefined)){
    return res.status(400).json({ error: "Missing required fields" });
  }
  try{
    const pool = await getPool();
    const result = await pool.request()
      .input("Name", Name)
      .query(`INSERT INTO Genres (Name) OUTPUT INSERTED.* VALUES (@Name)`);
    res.status(201).json(result.recordset[0]);
  }catch(err){
    console.error("Error inserting genre:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Update an existing genre.
 *
 * All fields are optional, any field not provided will not be changed.
 *
 * PUT /api/genres/:id
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const allowedFields = ["Name"];
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
  const query = `UPDATE Genres SET ${setClauses} WHERE GenreId = @GenreId`;
  try{
    const pool = await getPool();
    const request = pool.request().input("GenreId", id);
    for(const [key, value] of Object.entries(updates)){
      request.input(key, value);
    }
    await request.query(query);
    res.json({ message: "Genre updated successfully" });
  }catch(error){
    console.error("Error updating genre:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Delete a genre and all related records.
 *
 * This will remove:
 *  MovieGenres links
 *  The genre itself
 * 
 * DELETE /api/genres/:id
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM Genres WHERE GenreId = @GenreId`;
  try{
    const pool = await getPool();
    await pool.request()
      .input('GenreId', id)
      .query(`DELETE FROM MovieGenres WHERE GenreId = @GenreId`);
    await pool.request().input('GenreId', id).query(query);
    res.json({ message: "Genre deleted successfully" });
  }catch(error){
    console.error("Error deleting genre:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;