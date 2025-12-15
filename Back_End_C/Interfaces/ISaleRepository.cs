using OnlineStore.Models;
using System.Collections.Generic;

public interface ISaleRepository
{
    Sale GetSaleByID(int id);
    List<Sale> GetSaleByCategory(string category);
    List<Sale> GetSaleByDate(string date);
    List<Sale> GetActiveSales();
    List<MovieSale> GetActiveMovieSales();
}