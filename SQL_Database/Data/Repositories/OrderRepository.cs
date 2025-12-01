using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Data.SqlClient;
using Online_Store.Models;

namespace Online_Store.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly string _connectionString;

        public OrderRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public Order GetOrderById(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = $"SELECT * FROM Orders WHERE OrderId = @id";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    conn.Open();
                    using (var reader = cmd.ExecuteReader()){
                        if (!reader.Read())
                        {
                            return null;
                        }
                        return new Order(Convert.ToInt32(Convert.ToInt32(reader["OrderId"])),
                            Convert.ToInt32(reader["CartId"]), Convert.ToInt32(reader["MovieId"])
                        );
                    }
                }
            }
        }

        public Order GetOrderByCartId(int cartId)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = $"SELECT * FROM Orders WHERE CartId = @id";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@id", cartId);
                    conn.Open();
                    using (var reader = cmd.ExecuteReader()){
                        if (!reader.Read())
                        {
                            return null;
                        }
                        return new Order(Convert.ToInt32(Convert.ToInt32(reader["OrderId"])),
                            Convert.ToInt32(reader["CartId"]), Convert.ToInt32(reader["MovieId"])
                        );
                    }
                }
            }
        }
    }
}