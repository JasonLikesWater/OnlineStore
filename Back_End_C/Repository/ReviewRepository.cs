using System.Data.SqlClient;
using OnlineStore.Models;
using Microsoft.Data.SqlClient;


namespace Online_Store.Repository
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly string _connectionString;

        public ReviewRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public Review GetReviewById(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = $"SELECT * FROM Reviews WHERE ReviewId = @id";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    conn.Open();
                    using (var reader = cmd.ExecuteReader()){
                        if (!reader.Read())
                        {
                            return null;
                        }
                        return new Review(Convert.ToInt32(reader["ReviewId"]),
                            Convert.ToInt32(reader["CriticId"]), reader["ReviewDescription"].ToString(), Convert.ToInt32(reader["Rating"])
                        );
                    }
                }
            }
        }

        public List<Review> GetReviewsByCritic(int criticId)
        {
            List<Review> reviews = new List<Review>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = $"SELECT * FROM Reviews WHERE CriticId = @id";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@id", criticId);
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            reviews.Add(new Review(Convert.ToInt32(reader["ReviewId"]),
                            Convert.ToInt32(reader["CriticId"]), reader["ReviewDescription"].ToString(), Convert.ToInt32(reader["Rating"])
                            ));
                        }
                    }
                }
            }

            return reviews;
        }

        public List<Review> GetReviewsByRating(int rating)
        {
            List<Review> reviews = new List<Review>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = $"SELECT * FROM Reviews WHERE Rating = @rating";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@rating", rating);
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            reviews.Add(new Review(Convert.ToInt32(reader["ReviewId"]),
                            Convert.ToInt32(reader["CriticId"]), reader["ReviewDescription"].ToString(), Convert.ToInt32(reader["Rating"])
                            ));
                        }
                    }
                }
            }

            return reviews;
        }
    }
}