using System.Collections.Generic;
using System.Data;
using Microsoft.Data.SqlClient;
using Dapper;
using Back_End_C.Models; // <-- Must import the model definitions

namespace Back_End_C.Repository;

public class MovieRepository
{
    private readonly string _connectionString;

    public MovieRepository(string connectionString)
    {
        _connectionString = connectionString;
    }

    // Corresponds to: GET /api/movies
    public IEnumerable<Movie> GetAllMovies()
    {
        const string sql = "SELECT * FROM Movies";
        using IDbConnection db = new SqlConnection(_connectionString);
        return db.Query<Movie>(sql);
    }

    // Corresponds to: GET /api/movies/:id
    public Movie GetMovieById(int movieId)
    {
        const string sql = "SELECT * FROM Movies WHERE MovieId = @MovieId";
        using IDbConnection db = new SqlConnection(_connectionString);
        return db.QueryFirstOrDefault<Movie>(sql, new { MovieId = movieId });
    }

    // Corresponds to: GET /api/movies/:id/genres
    public IEnumerable<Back_End_C.Models.Genre> GetMovieGenres(int movieId)
    {
        const string sql =
            @"SELECT Genres.GenreId, Genres.Name 
              FROM MovieGenres 
              JOIN Genres ON MovieGenres.GenreId = Genres.GenreId 
              WHERE MovieGenres.MovieId = @MovieId";
        using IDbConnection db = new SqlConnection(_connectionString);
        return db.Query<Back_End_C.Models.Genre>(sql, new { MovieId = movieId });
    }

    // Corresponds to: GET /api/movies/:id/people
    public IEnumerable<Person> GetMoviePeople(int movieId) // Assuming a 'Person' model exists
    {
        const string sql =
            @"SELECT People.PersonId, People.FirstName, People.LastName 
              FROM MoviePeople 
              JOIN People ON MoviePeople.PersonId = People.PersonId 
              WHERE MoviePeople.MovieId = @MovieId";
        using IDbConnection db = new SqlConnection(_connectionString);
        return db.Query<Person>(sql, new { MovieId = movieId });
    }

    // Corresponds to: GET /api/movies/:id/reviews
    // Assuming a 'Review' model exists with the fields used in the query
    public IEnumerable<Review> GetMovieReviews(int movieId)
    {
        const string sql =
            @"SELECT Reviews.ReviewId, Reviews.ReviewDescription, Reviews.Rating, Reviews.CriticId 
              FROM MovieReview 
              JOIN Reviews ON MovieReview.ReviewId = Reviews.ReviewId 
              WHERE MovieReview.MovieId = @MovieId";
        using IDbConnection db = new SqlConnection(_connectionString);
        return db.Query<Review>(sql, new { MovieId = movieId });
    }



    // Corresponds to: GET /api/movies/:id/everything
    // NOTE: This complex query might return multiple rows for one movie (e.g., one row per review/sale item).
    public IEnumerable<Back_End_C.Models.MovieDetails> GetMovieEverything(int movieId)
    {
        const string sql =
            @"SELECT M.Title, M.Sku, M.Price, M.Rating AS Movie_Rating, M.ReleaseDate, M.Description, M.CoverImage, 
                     P.FirstName AS Director_FirstName, P.LastName AS Director_LastName, 
                     G_Main.Name AS Main_Genre, 
                     U.Username AS Critic_Username, R.Rating AS Review_Score, R.ReviewDescription, 
                     S.Discount AS Current_Sale_Discount, S.Category AS Sale_Category 
              FROM Movies AS M 
              LEFT JOIN People AS P ON M.DirectorId = P.PersonId 
              LEFT JOIN Genres AS G_Main ON M.GenreId = G_Main.GenreId 
              LEFT JOIN MovieReview AS MR ON M.MovieId = MR.MovieId 
              LEFT JOIN Reviews AS R ON MR.ReviewId = R.ReviewId 
              LEFT JOIN Users AS U ON R.CriticId = U.UserId 
              LEFT JOIN MovieSales AS MS ON M.MovieId = MS.MovieId 
              LEFT JOIN Sales AS S ON MS.SaleId = S.SaleId 
              WHERE M.MovieId = @MovieId";
        using IDbConnection db = new SqlConnection(_connectionString);
        return db.Query<Back_End_C.Models.MovieDetails>(sql, new { MovieId = movieId });
    }

    // Corresponds to: GET /api/movies/:title (using LIKE)
    public IEnumerable<Movie> GetMoviesByTitleLike(string titleFragment)
    {
        // NOTE: Your JS uses `req.params.title` and a LIKE query, which means it's a search, 
        // not a direct match, so I'm returning a list/IEnumerable.
        const string sql = "SELECT * FROM Movies WHERE Title LIKE @TitlePattern";
        using IDbConnection db = new SqlConnection(_connectionString);
        // The Dapper dynamic parameter object automatically handles adding the '%' for LIKE
        return db.Query<Movie>(sql, new { TitlePattern = $"%{titleFragment}%" });
    }
}