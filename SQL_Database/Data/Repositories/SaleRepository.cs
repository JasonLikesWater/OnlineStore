using System.Data.SqlClient;
using Online_Store.Models;

namespace Online_Store.Repository
{
    public class SaleRepository : ISaleRepository
    {
        private readonly string _connectionString;

        public SaleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public Sale GetSaleByID(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = $"SELECT * FROM Sales WHERE SaleId = @id";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    conn.Open();
                    using (var reader = cmd.ExecuteReader()){
                        if (!reader.Read())
                        {
                            return null;
                        }
                        return new Sale(Convert.ToInt32(reader["SaleId"]),
                            Convert.ToDouble(reader["Discount"]), reader["StartDate"].ToString(), 
                            reader["EndDate"].ToString(), reader["Category"].ToString()
                        );
                    }
                }
            }
        }
        public List<Sale> GetSaleByCategory(string category)
        {
            List<Sale> sales = new List<Sale>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = $"SELECT * FROM Sales WHERE Category = @category";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@category", category);
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            sales.Add(new Sale(Convert.ToInt32(reader["SaleId"]),
                            Convert.ToDouble(reader["Discount"]), reader["StartDate"].ToString(), 
                            reader["EndDate"].ToString(), reader["Category"].ToString()));
                        }
                    }
                }
            }

            return sales;
        }

        public List<Sale> GetSaleByDate(string date)
        {
            List<Sale> sales = new List<Sale>();
            //Todo work out date logic
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = $"SELECT * FROM Sales WHERE StartDate = @date";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@date", date);
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            sales.Add(new Sale(Convert.ToInt32(reader["SaleId"]),
                            Convert.ToDouble(reader["Discount"]), reader["StartDate"].ToString(), 
                            reader["EndDate"].ToString(), reader["Category"].ToString()));
                        }
                    }
                }
            }

            return sales;
        }

    }
}