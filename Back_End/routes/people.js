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

export default router;