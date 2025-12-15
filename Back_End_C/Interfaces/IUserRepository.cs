using OnlineStore.Models;

namespace OnlineStore.Repository
{
    public interface IUserRepository
    {
        Task<bool> UsernameExistsAsync(string username);
        Task<bool> EmailExistsAsync(string email);
        Task<User> CreateUserAsync(User newUser);
        Task CreateCartForUserAsync(int userId);

        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByIdAsync(int userId);

        Task<List<object>> GetCartsForUserAsync(int userId);
        Task<List<Review>> GetReviewsByUserAsync(int userId);

        Task<User?> UpdateUserAsync(int userId, UpdateUserRequest request);
        Task<bool> DeleteUserAsync(int userId);

        Task<int> AddMovieToCartAsync(int userId, int movieId);
        Task<bool> RemoveOrderFromCartAsync(int userId, int orderId);
    }
}
