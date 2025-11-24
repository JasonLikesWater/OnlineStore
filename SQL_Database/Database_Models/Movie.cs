namespace Online_Store.Models
{
    public class Movie
    {
        public int MovieId { get;}
        public string Title { get;}
        public int DirectorId { get; }
        public string Studio { get; }
        public int GenreId { get; }
        public int Rating { get; }
        public string Sku { get; }
        public double Price { get; }
        public double Weight { get; }
        public string Dimensions { get;}
        public string Description { get; }
        public string CoverImage { get; }
        public string ReleaseDate { get; }

        public Movie(int MovieId, string Title, int DirectorId, string Studio, int GenreId, int Rating, string Sku, 
            double Price, double Weight, string Dimensions, string Description, string CoverImage, string ReleaseDate)
        {
            this.MovieId = MovieId;
            this.Title = Title;
            this.DirectorId = DirectorId;
            this.Studio = Studio;
            this.GenreId = GenreId;
            this.Rating = Rating;
            this.Sku = Sku;
            this.Price = Price;
            this.Weight = Weight;
            this.Dimensions = Dimensions;
            this.Description = Description;
            this.CoverImage = CoverImage;
            this.ReleaseDate = ReleaseDate;
        }

    }

    
}
