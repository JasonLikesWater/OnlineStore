using Microsoft.AspNetCore.Mvc;
using OnlineStore.Repository;
using System.Collections.Generic;
using System;
using OnlineStore.Models; // Required for the 'Exception' type in your catch block


// --- CRITICAL FIX: Add the file-scoped namespace declaration here ---
// It MUST be after all 'using' statements and before the attributes/class.
namespace OnlineStore.Controllers;

// Defines the base route for all methods in this controller: /api/movies
[Route("api/[controller]")]
[ApiController] // Indicates this class is an API controller
public class MoviesController : ControllerBase
{
    private readonly IMovieRepository _movieRepository;

    // Constructor for Dependency Injection (assuming setup in Program.cs)
    public MoviesController(IMovieRepository movieRepository)
    {
        _movieRepository = movieRepository;
    }

    // Corresponds to: GET http://localhost:PORT/api/movies
    [HttpGet]
    public ActionResult<IEnumerable<Movie>> GetMovies()
    {
        try
        {
            // Calls the repository method you are translating from Node.js
            var movies = _movieRepository.GetAllMovies();

            // Returns 200 OK with the JSON data
            return Ok(movies);
        }
        catch (Exception) // Removed 'ex' to prevent CS0168 warning, or ensure it's used
        {
            // Logs the error and returns a 500 Internal Server Error
            return StatusCode(500, "Failed to fetch movies from the database.");
        }
    }

    // Corresponds to: GET http://localhost:PORT/api/movies/:id
    [HttpGet("{id}")]
    public ActionResult<Movie> GetMovie(int id)
    {
        var movie = _movieRepository.GetMovieById(id);

        if (movie == null)
        {
            return NotFound(); // Returns a 404 Not Found error
        }

        return Ok(movie); // Returns 200 OK with the movie object
    }

    [HttpGet("{id}/everything")]
    public ActionResult<IEnumerable<OnlineStore.Models.MovieDetails>> GetMovieEverything(int id)
    {
        // 1. Call the new repository method
        var movieDetails = _movieRepository.GetMovieEverything(id);

        // 2. Check if any data was returned
        if (movieDetails == null || !movieDetails.Any())
        {
            // Return 404 Not Found if the movie ID doesn't exist
            return NotFound();
        }

        // 3. Return the data with a 200 OK status
        return Ok(movieDetails);
    }

    // Add other GET routes here (e.g., GetMovieReviews, GetMovieEverything)
}