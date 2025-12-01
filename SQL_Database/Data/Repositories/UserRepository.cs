using System.Data.SqlClient;
using Online_Store.Models;

namespace Online_Store.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly string _connectionString;

        public UserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public User GetUserById(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = $"SELECT * FROM Users WHERE UserId = @id";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    conn.Open();
                    using (var reader = cmd.ExecuteReader()){
                        if (!reader.Read())
                        {
                            return null;
                        }
                        return new User(Convert.ToInt32(Convert.ToInt32(reader["UserId"])),
                            reader["Username"].ToString(), reader["PasswordHash"].ToString()
                        );
                    }
                }
            }
        }
    }
}