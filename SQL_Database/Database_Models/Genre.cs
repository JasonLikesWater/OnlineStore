namespace Online_Store.Models
{
    public class Genre
    {
        public int GenreId { get; }
        public string name { get;}
        public Genre(int GenreId, string name)
        {
            this.GenreId = GenreId;
            this.name = name;
        }
    }
}