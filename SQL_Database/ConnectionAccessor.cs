using System.Data;
using System.Data.SqlClient;

namespace Online_Store
{
    public class ConnectionAccessor
    {
        public static void TestDatabaseConnection()
        {
            Console.WriteLine("Connecting");
            string connString = @"Data Source=localhost;Initial Catalog=master;User ID=sa;Password=TempP4ssw0rd";
            using (SqlConnection conn = new SqlConnection(connString))
            {
                try
                {
                    conn.Open();
                    Console.WriteLine("Connection Success");
                    string query = "SELECT TOP 3 * FROM Movies";
                    SqlCommand cmd = new SqlCommand(query, conn);

                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Console.WriteLine(reader["Title"]);
                        //Movie movie = new Movie(reader["MovieId"], );
                    }
                    conn.Close();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Connection Failed");
                }

                
            }
        }

    }
}
