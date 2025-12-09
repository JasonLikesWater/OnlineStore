// Back_End_C/Repository/ConnectionAccessor.cs

using System;
using System.Data;
// 🛑 FIX: Use the correct, modern namespace for SQL Server types
using Microsoft.Data.SqlClient;

namespace Back_End_C.Repository
{
    public class ConnectionAccessor
    {
        private readonly string _connectionString;

        public ConnectionAccessor(string connectionString)
        {
            _connectionString = connectionString;
        }

        // Method used by other parts of the application to get an open connection
        public IDbConnection GetConnection()
        {
            return new SqlConnection(_connectionString);
        }

        // Example: Method to execute a command without Dapper (for complex, non-query tasks)
        public int ExecuteNonQuery(string sql)
        {
            using IDbConnection connection = new SqlConnection(_connectionString);
            using IDbCommand command = connection.CreateCommand();

            command.CommandText = sql;
            command.CommandType = CommandType.Text;

            try
            {
                connection.Open();
                return command.ExecuteNonQuery();
            }
            // ⚠️ FIX: Removed the variable name 'ex' to resolve warning CS0168
            catch (Exception)
            {
                // In a production app, you would use ILogger here to log the exception
                throw;
            }
        }
    }
}