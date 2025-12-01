using Online_Store.Models;

public interface IPeopleRepository
{
    Person GetPersonById(int id);
    Person GetPersonByName(string firstName, string lastName);
}