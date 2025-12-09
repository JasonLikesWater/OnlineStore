
using System.Data;
using Microsoft.Data.SqlClient;
using Dapper;
using Back_End_C.Models; // Assume a User model exists

namespace Back_End_C.Repository;

public class UserRepository
{
    private readonly string _connectionString;

    public UserRepository(string connectionString)
    {
        _connectionString = connectionString;
    }


    // Get a user by their unique ID
    public User? GetUserById(int userId)
    {
        const string sql = "SELECT * FROM Users WHERE UserId = @UserId";
        using IDbConnection db = new SqlConnection(_connectionString);
        return db.QueryFirstOrDefault<User>(sql, new { UserId = userId });
    }

    // Get a user by username (useful for login)
    public User? GetUserByUsername(string username)
    {
        const string sql = "SELECT * FROM Users WHERE Username = @Username";
        using IDbConnection db = new SqlConnection(_connectionString);
        return db.QueryFirstOrDefault<User>(sql, new { Username = username });
    }
}