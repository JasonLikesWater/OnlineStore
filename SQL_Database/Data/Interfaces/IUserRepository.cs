using Online_Store.Models;

public interface IUserRepository
{
    User GetUserById(int id);
}