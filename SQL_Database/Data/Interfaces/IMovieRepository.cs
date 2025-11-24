using Online_Store.Models;

public interface IMovieRepository
{
    Movie GetMovieById(int id);
    List<Movie> GetTopMovies(int count);
    List<Movie> GetMoviesByCategory(string Category);
    List<Movie> GetMoviesBySearch(string searchQuery);
    
}