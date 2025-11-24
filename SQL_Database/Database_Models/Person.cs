namespace Online_Store.Models
{
    public class Person
    {
        private int PersonId {get;}
        private string FirstName {get;}
        private string LastName {get;}
        public Person(int PersonId, string FirstName, string LastName)
        {
            this.PersonId = PersonId;
            this.FirstName = FirstName;
            this.LastName = LastName;
        }
    }
}