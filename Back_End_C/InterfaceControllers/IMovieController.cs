using OnlineStore.Models;
using Microsoft.AspNetCore.Mvc;


public interface IMovieController
{
   ActionResult<IEnumerable<Movie>> GetMovies();
   ActionResult<Movie> GetMovie(int id);
   ActionResult<IEnumerable<OnlineStore.Models.MovieDetails>> GetMovieEverything(int id);
   
}