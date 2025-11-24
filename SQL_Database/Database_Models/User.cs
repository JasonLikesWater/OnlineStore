namespace Online_Store.Models
{
    public class User
    {
        private int UserId;
        private string Username;
        private string PasswordHash;
    public User(int UserId, string Username, string PasswordHash)
        {
            this.UserId = UserId;
            this.Username = Username;
            this.PasswordHash = PasswordHash;
        }
    }
}