using OnlineStore.Models;
public interface IMovieRepository
{
    IEnumerable<Movie> GetAllMovies();
    Movie? GetMovieById(int movieId);
    IEnumerable<OnlineStore.Models.Genre> GetMovieGenres(int movieId);
    IEnumerable<Person> GetMoviePeople(int movieId);
    IEnumerable<Review> GetMovieReviews(int movieId);
    IEnumerable<OnlineStore.Models.MovieDetails> GetMovieEverything(int movieId);
    IEnumerable<Movie> GetMoviesByTitleLike(string titleFragment);
    }