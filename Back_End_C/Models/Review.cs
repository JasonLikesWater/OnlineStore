namespace OnlineStore.Models;

public class Review
{
    public int ReviewId { get; }
    public int? CriticId { get; }
    public string ReviewDescription { get; } = "";
    public int Rating { get; }
    public Review(int reviewId, int? criticId, string reviewDescription, int rating)
    {
        this.ReviewId = reviewId;
        this.CriticId = criticId;
        this.ReviewDescription = reviewDescription;
        this.Rating = rating;
    }
}
