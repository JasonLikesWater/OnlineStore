using Microsoft.Extensions.Configuration;
using Online_Store.Repository;
using Online_Store;
using Online_Store.Models;

class Program
{
    static void Main()
    {

        var config = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("SQL_Database/Data/appsettings.json", optional: false).Build();

        string connString = config.GetConnectionString("DefaultConnection");

        UserRepository repo = new UserRepository(connString);

        User order = repo.GetUserById(1);

        //foreach (Sale x in order){
        Console.WriteLine($"{order.UserId}: {order.Username} {order.PasswordHash}");
        //}
    }
}
