using System.Collections.Generic;
using OnlineStore.Models;

namespace OnlineStore.Repository
{
    public interface IMovieRepository
    {
        IEnumerable<Movie> GetAllMovies();
        Movie? GetMovieById(int movieId);
        IEnumerable<Genre> GetMovieGenres(int movieId);
        IEnumerable<Person> GetMoviePeople(int movieId);
        IEnumerable<Review> GetMovieReviews(int movieId);
        IEnumerable<MovieDetails> GetMovieEverything(int movieId);
    }
}
