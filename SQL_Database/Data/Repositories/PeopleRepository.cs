using System.Data.SqlClient;
using Online_Store.Models;

namespace Online_Store.Repository
{
    public class PeopleRepository : IPeopleRepository
    {
        private readonly string _connectionString;

        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public Person GetPersonById(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = $"SELECT * FROM People WHERE PersonId = @id";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    conn.Open();
                    using (var reader = cmd.ExecuteReader()){
                        if (!reader.Read())
                        {
                            return null;
                        }
                        return new Person(Convert.ToInt32(reader["PersonId"]),
                            reader["FirstName"].ToString(), reader["LastName"].ToString()
                        );
                    }
                }
            }
        }

        public Person GetPersonByName(string firstName, string lastName)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = $"SELECT * FROM People WHERE FirstName = @firstName and LastName = @lastName";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@firstName", firstName);
                    cmd.Parameters.AddWithValue("@lastName", lastName);
                    conn.Open();
                    using (var reader = cmd.ExecuteReader()){
                        if (!reader.Read())
                        {
                            return null;
                        }
                        return new Person(Convert.ToInt32(reader["PersonId"]),
                            reader["FirstName"].ToString(), reader["LastName"].ToString()
                        );
                    }
                }
            }
        }
    }
}