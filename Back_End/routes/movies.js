import express from 'express';
import { getPool } from '../db.js';

const router = express.Router();

/** 
 * GET all movies
 * /api/movies
 */
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM Movies");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching movies:", err);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

/**
 * GET a specific movie
 * /api/movies/:id
 */ 
router.get('/:id', async (req, res) => {
  const movieId = req.params.id;
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('MovieId', movieId)
      .query('SELECT * FROM Movies WHERE MovieId = @MovieId');
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET a the genres of a specific movie 
 * /api/movies/:id/genres
 */
router.get('/:id/genres', async (req, res) => {
  const movieId = req.params.id;
  const query = `SELECT Genres.GenreId, Genres.Name FROM MovieGenres JOIN Genres ON MovieGenres.GenreId = Genres.GenreId WHERE MovieGenres.MovieId = @MovieId`;
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('MovieId', movieId)
      .query(query);
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET the people in a specific movie
 * /api/movies/:id/people 
 */
router.get('/:id/people', async (req, res) => {
  const movieId = req.params.id;
  const query = `SELECT People.PersonId, People.FirstName, People.LastName FROM MoviePeople JOIN People ON MoviePeople.PersonId = People.PersonId WHERE MoviePeople.MovieId = @MovieId`;
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('MovieId', movieId)
      .query(query);
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching movie people:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET the reviews of a specific movie
 * /api/movies/:id/reviews 
 */
router.get('/:id/reviews', async (req, res) => {
  const movieId = req.params.id;
  const query = `SELECT Reviews.ReviewId, Reviews.ReviewDescription, Reviews.Rating, Reviews.CriticId FROM MovieReview JOIN Reviews ON MovieReview.ReviewId = Reviews.ReviewId WHERE MovieReview.MovieId = @MovieId`;
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('MovieId', movieId)
      .query(query);
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;