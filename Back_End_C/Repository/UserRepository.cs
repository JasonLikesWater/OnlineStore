using System.Data;
using Microsoft.Data.SqlClient;
using Dapper;
using OnlineStore.Models;

namespace OnlineStore.Repository;

public class UserRepository : IUserRepository
{
    private readonly string _connectionString;
    public UserRepository(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task<bool> UsernameExistsAsync(string username)
    {
        using var conn = new SqlConnection(_connectionString);
        await conn.OpenAsync();
        var cmd = new SqlCommand("SELECT UserId FROM Users WHERE LOWER(Username) = LOWER(@Username)", conn);
        cmd.Parameters.AddWithValue("@Username", username);
        var result = await cmd.ExecuteScalarAsync();
        return result != null;
    }

    public async Task<bool> EmailExistsAsync(string email)
    {
        using var conn = new SqlConnection(_connectionString);
        await conn.OpenAsync();
        var cmd = new SqlCommand("SELECT UserId FROM Users WHERE LOWER(Email) = LOWER(@Email)", conn);
        cmd.Parameters.AddWithValue("@Email", email);
        var result = await cmd.ExecuteScalarAsync();
        return result != null;
    }

    public async Task<User> CreateUserAsync(User newUser)
    {
        using var conn = new SqlConnection(_connectionString);
        await conn.OpenAsync();
        var cmd = new SqlCommand("INSERT INTO Users (Username, PasswordHash, Email) OUTPUT INSERTED.* VALUES (@Username, @PasswordHash, @Email)", conn);
        cmd.Parameters.AddWithValue("@Username", newUser.Username);
        cmd.Parameters.AddWithValue("@PasswordHash", newUser.PasswordHash);
        cmd.Parameters.AddWithValue("@Email", newUser.Email);
        using var reader = await cmd.ExecuteReaderAsync();
        if (await reader.ReadAsync())
        {
            return new User
            {
                UserId = (int)reader["UserId"],
                Username = reader["Username"].ToString()!,
                PasswordHash = reader["PasswordHash"].ToString()!,
                Email = reader["Email"].ToString()
            };
        }
        throw new Exception("Failed to create user");
    }

    public async Task CreateCartForUserAsync(int userId)
    {
        using var conn = new SqlConnection(_connectionString);
        await conn.OpenAsync();
        var cmd = new SqlCommand("INSERT INTO Carts (UserId) VALUES (@UserId)", conn);
        cmd.Parameters.AddWithValue("@UserId", userId);
        await cmd.ExecuteNonQueryAsync();
    }

    public async Task<User?> GetByUsernameAsync(string username)
    {
        using var conn = new SqlConnection(_connectionString);
        await conn.OpenAsync();
        var cmd = new SqlCommand("SELECT * FROM Users WHERE LOWER(Username) = LOWER(@Username)", conn);
        cmd.Parameters.AddWithValue("@Username", username);
        using var reader = await cmd.ExecuteReaderAsync();
        if (await reader.ReadAsync())
        {
            return new User
            {
                UserId = (int)reader["UserId"],
                Username = reader["Username"].ToString()!,
                PasswordHash = reader["PasswordHash"].ToString()!,
                Email = reader["Email"].ToString()
            };
        }
        return null;
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        using var conn = new SqlConnection(_connectionString);
        await conn.OpenAsync();
        var cmd = new SqlCommand("SELECT * FROM Users WHERE LOWER(Email) = LOWER(@Email)", conn);
        cmd.Parameters.AddWithValue("@Email", email);
        using var reader = await cmd.ExecuteReaderAsync();
        if (await reader.ReadAsync())
        {
            return new User
            {
                UserId = (int)reader["UserId"],
                Username = reader["Username"].ToString()!,
                PasswordHash = reader["PasswordHash"].ToString()!,
                Email = reader["Email"].ToString()!
            };
        }
        return null;
    }

    public async Task<User?> GetByIdAsync(int userId)
    {
        using var conn = new SqlConnection(_connectionString);
        await conn.OpenAsync();
        var cmd = new SqlCommand("SELECT * FROM Users WHERE UserId = @UserId", conn);
        cmd.Parameters.AddWithValue("@UserId", userId);
        using var reader = await cmd.ExecuteReaderAsync();
        if (await reader.ReadAsync())
        {
            return new User
            {
                UserId = (int)reader["UserId"],
                Username = reader["Username"].ToString()!,
                PasswordHash = reader["PasswordHash"].ToString()!,
                Email = reader["Email"].ToString()
            };
        }
        return null;
    }

    public async Task<List<object>> GetCartsForUserAsync(int userId){
        var carts = new List<object>();
        using var conn = new SqlConnection(_connectionString);
        await conn.OpenAsync();
        var cmd = new SqlCommand(
            @"SELECT
            Carts.CartId,
            Orders.OrderId,
            Movies.MovieId,
            Movies.Title,
            Movies.Price,
            Genres.Name AS Category
            FROM Carts
            LEFT JOIN Orders ON Carts.CartId = Orders.CartId
            LEFT JOIN Movies ON Orders.MovieId = Movies.MovieId
            LEFT JOIN Genres ON Movies.GenreId = Genres.GenreId
            WHERE Carts.UserId = @UserId
            AND Orders.OrderId IS NOT NULL", conn);
        cmd.Parameters.AddWithValue("@UserId", userId);
        using var reader = await cmd.ExecuteReaderAsync();
        while(await reader.ReadAsync()){
            carts.Add(new
            {
                CartId = (int)reader["CartId"],
                OrderId = (int)reader["OrderId"],
                MovieId = (int)reader["MovieId"],
                Title = reader["Title"].ToString(),
                Price = reader["Price"] is DBNull ? 0m : Convert.ToDecimal(reader["Price"]),
                Category = reader["Category"].ToString()
            });
        }
        return carts;
    }

    public async Task<List<Review>> GetReviewsByUserAsync(int userId)
    {
        var reviews = new List<Review>();
        using var conn = new SqlConnection(_connectionString);
        await conn.OpenAsync();
        var cmd = new SqlCommand("SELECT ReviewId, CriticId, ReviewDescription, Rating FROM Reviews WHERE CriticId = @UserId", conn);
        cmd.Parameters.AddWithValue("@UserId", userId);
        using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            var reviewId = (int)reader["ReviewId"];
            var criticId = reader["CriticId"] is DBNull ? null : (int?)reader["CriticId"];
            var reviewDescription = reader["ReviewDescription"].ToString()!;
            var rating = (int)reader["Rating"];
            reviews.Add(new Review(reviewId, criticId, reviewDescription, rating));
        }
        return reviews;
    }

    public async Task<User?> UpdateUserAsync(int userId, UpdateUserRequest request)
    {
        if (request.Username == null && request.PasswordHash == null && request.Email == null) return null;
        using var conn = new SqlConnection(_connectionString);
        await conn.OpenAsync();
        if (request.Username != null)
        {
            var checkCmd = new SqlCommand("SELECT UserId FROM Users WHERE LOWER(Username) = LOWER(@Username) AND UserId != @UserId", conn);
            checkCmd.Parameters.AddWithValue("@Username", request.Username);
            checkCmd.Parameters.AddWithValue("@UserId", userId);
            var exists = await checkCmd.ExecuteScalarAsync();
            if (exists != null) return null;
        }
        if (request.Email != null)
        {
            var checkCmd = new SqlCommand("SELECT UserId FROM Users WHERE LOWER(Email) = LOWER(@Email) AND UserId != @UserId", conn);
            checkCmd.Parameters.AddWithValue("@Email", request.Email);
            checkCmd.Parameters.AddWithValue("@UserId", userId);
            var exists = await checkCmd.ExecuteScalarAsync();
            if (exists != null) return null;
        }
        var updates = new List<string>();
        if (request.Username != null) updates.Add("Username = @Username");
        if (request.PasswordHash != null)
        {
            var hashed = BCrypt.Net.BCrypt.HashPassword(request.PasswordHash, 10);
            updates.Add("PasswordHash = @PasswordHash");
            request.PasswordHash = hashed;
        }
        if (request.Email != null) updates.Add("Email = @Email");
        var query = $"UPDATE Users SET {string.Join(", ", updates)} WHERE UserId = @UserId";
        var cmd = new SqlCommand(query, conn);
        cmd.Parameters.AddWithValue("@UserId", userId);
        if (request.Username != null) cmd.Parameters.AddWithValue("@Username", request.Username);
        if (request.PasswordHash != null) cmd.Parameters.AddWithValue("@PasswordHash", request.PasswordHash);
        if (request.Email != null) cmd.Parameters.AddWithValue("@Email", request.Email);
        await cmd.ExecuteNonQueryAsync();
        return await GetByIdAsync(userId);
    }

    public async Task<bool> DeleteUserAsync(int userId)
    {
        using var conn = new SqlConnection(_connectionString);
        await conn.OpenAsync();
        var cmdReviews = new SqlCommand("UPDATE Reviews SET CriticId = NULL WHERE CriticId = @UserId", conn);
        cmdReviews.Parameters.AddWithValue("@UserId", userId);
        await cmdReviews.ExecuteNonQueryAsync();
        var cartIds = new List<int>();
        var cmdCarts = new SqlCommand("SELECT CartId FROM Carts WHERE UserId = @UserId", conn);
        cmdCarts.Parameters.AddWithValue("@UserId", userId);
        using var reader = await cmdCarts.ExecuteReaderAsync();
        while (await reader.ReadAsync())
            cartIds.Add(reader.GetInt32(0));
        reader.Close();
        foreach (var cartId in cartIds)
        {
            var cmdOrders = new SqlCommand("DELETE FROM Orders WHERE CartId = @CartId", conn);
            cmdOrders.Parameters.AddWithValue("@CartId", cartId);
            await cmdOrders.ExecuteNonQueryAsync();
        }
        var cmdDeleteCarts = new SqlCommand("DELETE FROM Carts WHERE UserId = @UserId", conn);
        cmdDeleteCarts.Parameters.AddWithValue("@UserId", userId);
        await cmdDeleteCarts.ExecuteNonQueryAsync();
        var cmdDeleteUser = new SqlCommand("DELETE FROM Users WHERE UserId = @UserId", conn);
        cmdDeleteUser.Parameters.AddWithValue("@UserId", userId);
        var rows = await cmdDeleteUser.ExecuteNonQueryAsync();
        return rows > 0;
    }

    public async Task<int> AddMovieToCartAsync(int userId, int movieId){
        using var conn = new SqlConnection(_connectionString);
        await conn.OpenAsync();
        var cartIdObj = await new SqlCommand("SELECT CartId FROM Carts WHERE UserId = @UserId", conn){
            Parameters = { new SqlParameter("@UserId", userId) }
        }.ExecuteScalarAsync();
        if(cartIdObj == null)
            throw new Exception("Cart not found");
        var cartId = Convert.ToInt32(cartIdObj);
        var cmd = new SqlCommand("INSERT INTO Orders (CartId, MovieId) OUTPUT INSERTED.OrderId VALUES (@CartId, @MovieId)", conn);
        cmd.Parameters.AddWithValue("@CartId", cartId);
        cmd.Parameters.AddWithValue("@MovieId", movieId);
        var result = await cmd.ExecuteScalarAsync();
        if(result == null){
            throw new Exception("Failed to add movie to cart");
        }
        return Convert.ToInt32(result);
    }

    public async Task<bool> RemoveOrderFromCartAsync(int userId, int orderId){
        using var conn = new SqlConnection(_connectionString);
        await conn.OpenAsync();
        var cartIdObj = await new SqlCommand("SELECT CartId FROM Carts WHERE UserId = @UserId", conn){
            Parameters = { new SqlParameter("@UserId", userId) }
        }.ExecuteScalarAsync();
        if(cartIdObj == null){
            return false;
        }
        var cartId = Convert.ToInt32(cartIdObj);
        var cmd = new SqlCommand("DELETE FROM Orders WHERE OrderId = @OrderId AND CartId = @CartId", conn);
        cmd.Parameters.AddWithValue("@OrderId", orderId);
        cmd.Parameters.AddWithValue("@CartId", cartId);
        var rowsAffected = await cmd.ExecuteNonQueryAsync();
        return rowsAffected > 0;
    }
}