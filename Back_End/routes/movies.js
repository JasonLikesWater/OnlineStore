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
 * GET everything about a movie
 * /api/movies/:id/everything 
 */
router.get('/:id/everything', async (req, res) => {
  const movieId = req.params.id;
  const query = `SELECT M.Title, M.Sku, M.Price, M.Rating AS Movie_Rating, M.ReleaseDate, M.Description, M.CoverImage, P.FirstName AS Director_FirstName, P.LastName AS Director_LastName, G_Main.Name AS Main_Genre, U.Username AS Critic_Username, R.Rating AS Review_Score, R.ReviewDescription, S.Discount AS Current_Sale_Discount, S.Category AS Sale_Category FROM Movies AS M LEFT JOIN People AS P ON M.DirectorId = P.PersonId LEFT JOIN Genres AS G_Main ON M.GenreId = G_Main.GenreId LEFT JOIN MovieReview AS MR ON M.MovieId = MR.MovieId LEFT JOIN Reviews AS R ON MR.ReviewId = R.ReviewId LEFT JOIN Users AS U ON R.CriticId = U.UserId LEFT JOIN MovieSales AS MS ON M.MovieId = MS.MovieId LEFT JOIN Sales AS S ON MS.SaleId = S.SaleId WHERE M.MovieId = @MovieId`;
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