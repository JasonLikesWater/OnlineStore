using Online_Store.Repository;
using Online_Store;

class Program
{
    static void Main()
    {
        string connString = @"Data Source=localhost;Initial Catalog=master;User ID=sa;Password=TempP4ssw0rd";
        MovieRepository repo = new MovieRepository(connString);

        var movies = repo.GetTopMovies(4);

        foreach (var m in movies)
        {
            Console.WriteLine($"{m.MovieId}: {m.Title} ({m.ReleaseDate}) - ${m.Price}");
        }
    }
}
