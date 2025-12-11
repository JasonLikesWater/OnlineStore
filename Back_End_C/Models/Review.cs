namespace OnlineStore.Models;

public class Review
{
    public int ReviewId { get; set; }
    public int? CriticId { get; set; }
    public string ReviewDescription { get; set; } = "";
    public int Rating { get; set; }
}
