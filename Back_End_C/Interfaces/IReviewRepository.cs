using OnlineStore.Models;

public interface IReviewRepository
{
    Review GetReviewById(int id);
    List<Review>GetReviewsByCritic(int criticId);
    List<Review>GetReviewsByRating(int rating);
}