namespace Back_End_C.Models;

public class Movie
{
    public int MovieId { get; set; }
    public string Title { get; set; }
    public int DirectorId { get; set; }
    public string Studio { get; set; }
    public int GenreId { get; set; }
    public double Rating { get; set; }
    public string Sku { get; set; }
    public decimal Price { get; set; }
    public decimal Weight { get; set; }
    public string Dimensions { get; set; }
    public string Description { get; set; }
    public string CoverImage { get; set; }
    public DateTime ReleaseDate { get; set; }
}

// You'll also need a model for People, Genres, Reviews, etc., for the complex queries.
public class Genre
{
    public int GenreId { get; set; }
    public string Name { get; set; }
}

// Model for the rich data returned by the 'everything' endpoint
public class MovieDetail
{
    public string Title { get; set; }
    public string Sku { get; set; }
    public decimal Price { get; set; }
    public double Movie_Rating { get; set; }
    public DateTime ReleaseDate { get; set; }
    public string Description { get; set; }
    public string CoverImage { get; set; }
    public string Director_FirstName { get; set; }
    public string Director_LastName { get; set; }
    public string Main_Genre { get; set; }
    public string Critic_Username { get; set; }
    public int Review_Score { get; set; }
    public string ReviewDescription { get; set; }
    public decimal Current_Sale_Discount { get; set; }
    public string Sale_Category { get; set; }
}