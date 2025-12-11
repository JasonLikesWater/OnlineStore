namespace Online_Store.Models
{
    public class Person
    {
        public int PersonId { get; }
        public string FirstName { get; }
        public string LastName { get; }
        public Person(int PersonId, string FirstName, string LastName)
        {
            this.PersonId = PersonId;
            this.FirstName = FirstName;
            this.LastName = LastName;
        }
    }
}