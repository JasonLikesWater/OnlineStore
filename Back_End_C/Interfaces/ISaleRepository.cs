using OnlineStore.Models;

public interface ISaleRepository
{
    Sale GetSaleByID(int id);
    List<Sale> GetSaleByCategory(string category);
    List<Sale> GetSaleByDate(string date);
    
}