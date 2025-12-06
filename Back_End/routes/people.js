import express from "express";
import { getPool } from '../db.js';

const router = express.Router();

/** 
 * GET all people
 * /api/people
 */
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM People");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching people:", err);
    res.status(500).json({ error: "Failed to fetch people" });
  }
});

/**
 * GET a specific person
 * /api/people/:id
 */ 
router.get('/:id', async (req, res) => {
  const personId = req.params.id;
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('PersonId', personId)
      .query('SELECT * FROM People WHERE PersonId = @PersonId');
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error fetching person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET the movies a specific person is in
 * /api/people/:id/movies 
 */
router.get('/:id/movies', async (req, res) => {
  const personId = req.params.id;
  const query = `SELECT Movies.* FROM MoviePeople JOIN Movies ON MoviePeople.MovieId = Movies.MovieId WHERE MoviePeople.personId = @personId`;
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('PersonId', personId)
      .query(query);
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching movies this person is in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Create a new person.
 *
 * Required fields:
 *  FirstName, LastName
 *
 * POST /api/people
 */
router.post('/', async (req, res) => {
  const { FirstName, LastName } = req.body;
  const required = [FirstName, LastName];
  if (required.some(field => field === undefined)) {
  return res.status(400).json({ error: "Missing required fields" });
}
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input("FirstName", FirstName)
      .input("LastName", LastName)
      .query(`INSERT INTO People (FirstName, LastName) OUTPUT INSERTED.* VALUES (@FirstName, @LastName)`);
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error("Error inserting person:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Update an existing person.
 *
 * All fields are optional, any field not provided will not be changed.
 *
 * PUT /api/people/:id
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
  const query = `UPDATE People SET ${setClauses} WHERE PersonId = @PersonId`;
  try {
    const pool = await getPool();
    const request = pool.request().input("PersonId", id);
    for (const [key, value] of Object.entries(updates)) {
      request.input(key, value);
    }
    await request.query(query);
    res.json({ message: "Person updated successfully" });
  } catch (error) {
    console.error("Error updating person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Delete a person and all related records.
 *
 * This will remove:
 *  MoviePeople links
 *  The person itself
 * 
 * DELETE /api/people/:id
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM People WHERE PersonId = @PersonId`;
  try {
    const pool = await getPool();
    await pool.request()
      .input('PersonId', id)
      .query(`DELETE FROM MoviePeople WHERE PersonId = @PersonId`);
    await pool.request()
      .input('PersonId', id)
      .query(query);
    res.json({ message: "Person deleted successfully" });
  } catch (error) {
    console.error("Error deleting person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;