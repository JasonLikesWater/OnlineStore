namespace OnlineStore.Models
{

    // Model for the rich data returned by the 'everything' endpoint
    // Back_End_C/Models/MovieDetails.cs
    public class MovieDetails
    {
        // Movie Details
        public int MovieId { get; set; }
        public required string Title { get; set; }
        public required string Sku { get; set; }
        public decimal Price { get; set; } // Nullable, as discussed
        public double MovieRating { get; set; } // Note: Matches SQL alias Movie_Rating
        public DateTime ReleaseDate { get; set; }
        public required string Description { get; set; }
        public required string CoverImage { get; set; }

        // Director Details
        public required string DirectorFirstName { get; set; } // Matches SQL alias
        public required string DirectorLastName { get; set; } // Matches SQL alias

        // Genre
        public string? Genre { get; set; } // Matches SQL alias

        // Review Details
        public required string CriticUsername { get; set; } // Can be null if no review
        public double? ReviewScore { get; set; }    // Can be null
        public string? ReviewDescription { get; set; } // Can be null

        // Sales Details
        public decimal? SaleDiscount { get; set; } // Can be null
        public string? SaleCategory { get; set; }         // Can be null
    }
}