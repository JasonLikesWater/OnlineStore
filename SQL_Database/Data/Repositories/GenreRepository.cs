using System.Data.SqlClient;
using Online_Store.Models;


namespace Online_Store.Repository
{
    public class GenereRepository : IGenreRepository
    {
        private readonly string _connectionString;

        public GenereRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public Genre GetGenreById(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = $"SELECT * FROM Genres WHERE GenreId = @id";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    conn.Open();
                    using (var reader = cmd.ExecuteReader()){
                        if (!reader.Read())
                        {
                            return null;
                        }
                        return new Genre(Convert.ToInt32(Convert.ToInt32(reader["GenreId"])),
                            reader["Name"].ToString()
                        );
                    }
                }
            }
        }

        public Genre GetGenreByName(string name)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = $"SELECT * FROM Genres WHERE name = @name";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@name", name);
                    conn.Open();
                    using (var reader = cmd.ExecuteReader()){
                        if (!reader.Read())
                        {
                            return null;
                        }
                        return new Genre(Convert.ToInt32(Convert.ToInt32(reader["GenreId"])),
                            reader["Name"].ToString()
                        );
                    }
                }
            }
        }
    }
}