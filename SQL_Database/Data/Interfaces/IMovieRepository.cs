using Online_Store.Models;

public interface IMovieRepository
{
    Movie GetMovieById(int id);
    List<Movie> GetTopMovies(int count);
    List<Movie> GetMoviesByDirector(string directorName);
    List<Movie> GetMoviesBySearch(string searchQuery);
    List<Movie> GetMoviesByGenre(string genre);
}