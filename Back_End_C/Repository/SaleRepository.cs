using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using OnlineStore.Models;

namespace OnlineStore.Repository
{
    public class SaleRepository : ISaleRepository
    {
        private readonly string _connectionString;

        public SaleRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found");
        }

        public Sale GetSaleByID(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = "SELECT * FROM Sales WHERE SaleId = @id";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    conn.Open();
                    using (var reader = cmd.ExecuteReader())
                    {
                        if (!reader.Read()) return null!;
                        return new Sale(
                            Convert.ToInt32(reader["SaleId"]),
                            Convert.ToDouble(reader["Discount"]),
                            reader["StartDate"].ToString() ?? "",
                            reader["EndDate"].ToString() ?? "",
                            reader["Category"].ToString() ?? ""
                        );
                    }
                }
            }
        }

        public List<Sale> GetSaleByCategory(string category)
        {
            var sales = new List<Sale>();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = "SELECT * FROM Sales WHERE Category = @category";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@category", category);
                    conn.Open();
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            sales.Add(new Sale(
                                Convert.ToInt32(reader["SaleId"]),
                                Convert.ToDouble(reader["Discount"]),
                                reader["StartDate"].ToString() ?? "",
                                reader["EndDate"].ToString() ?? "",
                                reader["Category"].ToString() ?? ""
                            ));
                        }
                    }
                }
            }
            return sales;
        }

        public List<Sale> GetSaleByDate(string date)
        {
            var sales = new List<Sale>();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = "SELECT * FROM Sales WHERE StartDate = @date";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@date", date);
                    conn.Open();
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            sales.Add(new Sale(
                                Convert.ToInt32(reader["SaleId"]),
                                Convert.ToDouble(reader["Discount"]),
                                reader["StartDate"].ToString() ?? "",
                                reader["EndDate"].ToString() ?? "",
                                reader["Category"].ToString() ?? ""
                            ));
                        }
                    }
                }
            }
            return sales;
        }

        public List<Sale> GetActiveSales()
        {
            var sales = new List<Sale>();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                // StartDate and EndDate are stored as varchar YYYY-MM-DD — convert to date safely.
                string query = @"
                    SELECT * FROM Sales
                    WHERE TRY_CONVERT(date, StartDate, 23) IS NOT NULL
                      AND TRY_CONVERT(date, EndDate, 23) IS NOT NULL
                      AND CAST(GETDATE() AS date) BETWEEN TRY_CONVERT(date, StartDate, 23) AND TRY_CONVERT(date, EndDate, 23)
                ";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    conn.Open();
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            sales.Add(new Sale(
                                Convert.ToInt32(reader["SaleId"]),
                                Convert.ToDouble(reader["Discount"]),
                                reader["StartDate"].ToString() ?? "",
                                reader["EndDate"].ToString() ?? "",
                                reader["Category"].ToString() ?? ""
                            ));
                        }
                    }
                }
            }
            return sales;
        }

        public List<MovieSale> GetActiveMovieSales()
        {
            var movieSales = new List<MovieSale>();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = @"
                    SELECT ms.MovieId, ms.SaleId
                    FROM MovieSales ms
                    JOIN Sales s ON ms.SaleId = s.SaleId
                    WHERE TRY_CONVERT(date, s.StartDate, 23) IS NOT NULL
                      AND TRY_CONVERT(date, s.EndDate, 23) IS NOT NULL
                      AND CAST(GETDATE() AS date) BETWEEN TRY_CONVERT(date, s.StartDate, 23) AND TRY_CONVERT(date, s.EndDate, 23)
                ";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            movieSales.Add(new MovieSale
                            {
                                MovieId = Convert.ToInt32(reader["MovieId"]),
                                SaleId = Convert.ToInt32(reader["SaleId"])
                            });
                        }
                    }
                }
            }
            return movieSales;
        }
    }
}
