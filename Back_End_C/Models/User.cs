namespace Back_End_C.Models
{
    public class User
    {
        public int UserId { get; }
        public string Username { get; }
        public string PasswordHash { get; }
        public User(int UserId, string Username, string PasswordHash)
        {
            this.UserId = UserId;
            this.Username = Username;
            this.PasswordHash = PasswordHash;
        }
    }
}