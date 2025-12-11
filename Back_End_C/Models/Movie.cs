namespace OnlineStore.Models;

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
