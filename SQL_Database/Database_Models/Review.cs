namespace Online_Store.Models
{
    public class Review
    {
        public int ReviewId {get;}
        public int CriticId {get;}
        public string ReviewDescription {get;}
        public int Rating {get;}
        public Review(int ReviewId, int CriticId, string ReviewDescription, int Rating)
        {
            this.ReviewId = ReviewId;
            this.CriticId = CriticId;
            this.ReviewDescription = ReviewDescription;
            this.Rating = Rating;
        }
    }
}