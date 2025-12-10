namespace Back_End_C.Models;

public class Movie
{
    public int MovieId { get; set; }
    public required string Title { get; set; }
    public int DirectorId { get; set; }
    public required string Studio { get; set; }
    public int GenreId { get; set; }
    public double Rating { get; set; }
    public required string Sku { get; set; }
    public decimal? Price { get; set; }
    public decimal Weight { get; set; }
    public required string Dimensions { get; set; }
    public required string Description { get; set; }
    public required string CoverImage { get; set; }
    public DateTime ReleaseDate { get; set; }
}

// You'll also need a model for People, Genres, Reviews, etc., for the complex queries.
public class Genre
{
    public int GenreId { get; set; }
    public required string Name { get; set; }
}

// Model for the rich data returned by the 'everything' endpoint
// Back_End_C/Models/MovieDetails.cs

public class MovieDetails
{
    // Movie Details
    public required string Title { get; set; }
    public required string Sku { get; set; }
    public decimal? Price { get; set; } // Nullable, as discussed
    public double Movie_Rating { get; set; } // Note: Matches SQL alias Movie_Rating
    public DateTime ReleaseDate { get; set; }
    public required string Description { get; set; }
    public required string CoverImage { get; set; }

    // Director Details
    public required string Director_FirstName { get; set; } // Matches SQL alias
    public required string Director_LastName { get; set; } // Matches SQL alias

    // Genre
    public required string Main_Genre { get; set; } // Matches SQL alias

    // Review Details
    public string? Critic_Username { get; set; } // Can be null if no review
    public double? Review_Score { get; set; }    // Can be null
    public string? ReviewDescription { get; set; } // Can be null

    // Sales Details
    public decimal? Current_Sale_Discount { get; set; } // Can be null
    public string? Sale_Category { get; set; }         // Can be null
}