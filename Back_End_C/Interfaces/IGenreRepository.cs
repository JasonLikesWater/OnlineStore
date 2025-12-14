using OnlineStore.Models;

public interface IGenreRepository
{
    Genre GetGenreById(int id);
    Genre GetGenreByName(string name);
}