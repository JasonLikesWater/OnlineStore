using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Data.SqlClient;
using Online_Store.Models;

namespace Online_Store.Repository
{
    public class MovieRepository : IMovieRepository
    {
        private readonly string _connectionString;

        public MovieRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public Movie GetMovieById(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = $"SELECT * FROM Movies WHERE MovieId = @id";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    conn.Open();
                    using (var reader = cmd.ExecuteReader()){
                        if (!reader.Read())
                        {
                            return null;
                        }
                        return new Movie(Convert.ToInt32(reader["MovieId"]),
                            reader["Title"].ToString(),
                            Convert.ToInt32(reader["DirectorId"]),
                            reader["Studio"].ToString(),
                            Convert.ToInt32(reader["GenreId"]),
                            Convert.ToInt32(reader["Rating"]),
                            reader["Sku"].ToString(),
                            Convert.ToDouble(reader["Price"]),
                            Convert.ToDouble(reader["Weight"]),
                            reader["Dimensions"].ToString(),
                            reader["Description"].ToString(),
                            reader["CoverImage"].ToString(),
                            reader["ReleaseDate"].ToString()
                        );
                    }
                }
            }
        }

        public List<Movie> GetTopMovies(int count)
        {
            List<Movie> movies = new List<Movie>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = $"SELECT TOP (@count) * FROM Movies";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@count", count);
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            movies.Add(new Movie(Convert.ToInt32(reader["MovieId"]),
                                reader["Title"].ToString(),
                                Convert.ToInt32(reader["DirectorId"]),
                                reader["Studio"].ToString(),
                                Convert.ToInt32(reader["GenreId"]),
                                Convert.ToInt32(reader["Rating"]),
                                reader["Sku"].ToString(),
                                Convert.ToDouble(reader["Price"]),
                                Convert.ToDouble(reader["Weight"]),
                                reader["Dimensions"].ToString(),
                                reader["Description"].ToString(),
                                reader["CoverImage"].ToString(),
                                reader["ReleaseDate"].ToString()
                            ));
                        }
                    }
                }
            }

            return movies;
        }
        public List<Movie> GetMoviesByDirector(string directorName)
        {
            List<Movie> movies = new List<Movie>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                //TODO Need a get director id from name function
                string query = $"SELECT * FROM Movies WHERE DirectorId = @directorName";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@directorName", directorName);
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            movies.Add(new Movie(Convert.ToInt32(reader["MovieId"]),
                                reader["Title"].ToString(),
                                Convert.ToInt32(reader["DirectorId"]),
                                reader["Studio"].ToString(),
                                Convert.ToInt32(reader["GenreId"]),
                                Convert.ToInt32(reader["Rating"]),
                                reader["Sku"].ToString(),
                                Convert.ToDouble(reader["Price"]),
                                Convert.ToDouble(reader["Weight"]),
                                reader["Dimensions"].ToString(),
                                reader["Description"].ToString(),
                                reader["CoverImage"].ToString(),
                                reader["ReleaseDate"].ToString()
                            ));
                        }
                    }
                }
            }

            return movies;
        }
        public List<Movie> GetMoviesBySearch(string searchQuery)
        {
            List<Movie> movies = new List<Movie>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                //TODO Need a get director id from name function
                string query = $"SELECT * FROM Movies WHERE Title LIKE @title";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@title", "%" + searchQuery + "%");
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            movies.Add(new Movie(Convert.ToInt32(reader["MovieId"]),
                                reader["Title"].ToString(),
                                Convert.ToInt32(reader["DirectorId"]),
                                reader["Studio"].ToString(),
                                Convert.ToInt32(reader["GenreId"]),
                                Convert.ToInt32(reader["Rating"]),
                                reader["Sku"].ToString(),
                                Convert.ToDouble(reader["Price"]),
                                Convert.ToDouble(reader["Weight"]),
                                reader["Dimensions"].ToString(),
                                reader["Description"].ToString(),
                                reader["CoverImage"].ToString(),
                                reader["ReleaseDate"].ToString()
                            ));
                        }
                    }
                }
            }

            return movies;
        }
       public List<Movie> GetMoviesByGenre(string genre)
       {
            List<Movie> movies = new List<Movie>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                //TODO Need a get genre id from genere name function
                string query = $"SELECT * FROM Movies WHERE GenreID = @genreId";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@genreId", genre);
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            movies.Add(new Movie(Convert.ToInt32(reader["MovieId"]),
                                reader["Title"].ToString(),
                                Convert.ToInt32(reader["DirectorId"]),
                                reader["Studio"].ToString(),
                                Convert.ToInt32(reader["GenreId"]),
                                Convert.ToInt32(reader["Rating"]),
                                reader["Sku"].ToString(),
                                Convert.ToDouble(reader["Price"]),
                                Convert.ToDouble(reader["Weight"]),
                                reader["Dimensions"].ToString(),
                                reader["Description"].ToString(),
                                reader["CoverImage"].ToString(),
                                reader["ReleaseDate"].ToString()
                            ));
                        }
                    }
                }
            }

            return movies;
        }
    }
}
