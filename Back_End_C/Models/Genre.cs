namespace OnlineStore.Models
{
    public class Genre
    {
        public int GenreId { get; }
        public string Name { get; }
        public Genre(int GenreId, string name)
        {
            this.GenreId = GenreId;
            this.Name = name;
        }
    }
}
