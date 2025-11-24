namespace Online_Store.Models
{
    public class Review
    {
        private int ReviewId {get;}
        private int CriticId {get;}
        private string ReviewDescription {get;}
        private int Rating {get;}
        public Review(int ReviewId, int CriticId, string ReviewDescription, int Rating)
        {
            this.ReviewId = ReviewId;
            this.CriticId = CriticId;
            this.ReviewDescription = ReviewDescription;
            this.Rating = Rating;
        }
    }
}