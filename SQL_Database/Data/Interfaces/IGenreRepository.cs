using Online_Store.Models;

public interface IGenreRepository
{
    Genre GetGenreById(int id);
    Genre GetGenreByName(string name);
}