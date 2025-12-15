using Microsoft.AspNetCore.Mvc;
using OnlineStore.Models;

public interface ISalesController
{
    IActionResult GetActiveSales();
    IActionResult GetSalesByCategory(string category);
    IActionResult GetSaleById(int id);
    IActionResult GetActiveMovieSales();
}