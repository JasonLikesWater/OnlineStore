using System.Collections.Generic;
using System.Data;
using Microsoft.Data.SqlClient;
using Dapper;
using OnlineStore.Models; // <-- Must import the model definitions

namespace OnlineStore.Repository;

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
    public Movie? GetMovieById(int movieId)
    {
        const string sql = "SELECT * FROM Movies WHERE MovieId = @MovieId";
        using IDbConnection db = new SqlConnection(_connectionString);
        return db.QueryFirstOrDefault<Movie>(sql, new { MovieId = movieId });
    }

    // Corresponds to: GET /api/movies/:id/genres
    public IEnumerable<OnlineStore.Models.Genre> GetMovieGenres(int movieId)
    {
        const string sql =
            @"SELECT Genres.GenreId, Genres.Name 
              FROM MovieGenres 
              JOIN Genres ON MovieGenres.GenreId = Genres.GenreId 
              WHERE MovieGenres.MovieId = @MovieId";
        using IDbConnection db = new SqlConnection(_connectionString);
        return db.Query<OnlineStore.Models.Genre>(sql, new { MovieId = movieId });
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
    public IEnumerable<OnlineStore.Models.MovieDetails> GetMovieEverything(int movieId)
    {
        const string sql =
            @"SELECT
    CAST(M.MovieId AS INT) AS MovieId,
    M.Title, 
    M.Sku, 
    M.Price, 
    M.Rating AS MovieRating,          
    M.ReleaseDate, 
    M.Description, 
    M.CoverImage, 

    P.FirstName AS DirectorFirstName,
    P.LastName AS DirectorLastName,   

    G.Name AS Genre,                  

    U.Username AS CriticUsername,     
    R.Rating AS ReviewScore,         
    R.ReviewDescription, 

    S.Discount AS SaleDiscount,       
    S.Category AS SaleCategory       

FROM 
    Movies AS M 
LEFT JOIN 
    People AS P ON M.DirectorId = P.PersonId        
LEFT JOIN 
    Genres AS G ON M.GenreId = G.GenreId            
LEFT JOIN 
    MovieReview AS MR ON M.MovieId = MR.MovieId     
LEFT JOIN 
    Reviews AS R ON MR.ReviewId = R.ReviewId        
LEFT JOIN 
    Users AS U ON R.CriticId = U.UserId             
LEFT JOIN 
    MovieSales AS MS ON M.MovieId = MS.MovieId      
LEFT JOIN 
    Sales AS S ON MS.SaleId = S.SaleId              
WHERE 
    M.MovieId =  @MovieId";
        using IDbConnection db = new SqlConnection(_connectionString);
        return db.Query<OnlineStore.Models.MovieDetails>(sql, new { MovieId = movieId });
    }

    public IEnumerable<Movie> GetMoviesByTitleLike(string titleFragment)
    {


        const string sql = "SELECT * FROM Movies WHERE Title LIKE @TitlePattern";
        using IDbConnection db = new SqlConnection(_connectionString);
        return db.Query<Movie>(sql, new { TitlePattern = $"%{titleFragment}%" });
    }
}