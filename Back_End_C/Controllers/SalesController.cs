using Microsoft.AspNetCore.Mvc;
using OnlineStore.Repository;
using OnlineStore.Models;

[ApiController]
[Route("api/[controller]")]
public class SalesController : ControllerBase {
    private readonly ISaleRepository _saleRepo;
    public SalesController(ISaleRepository saleRepo){
        _saleRepo = saleRepo;
    }

    [HttpGet("active")]
    public IActionResult GetActiveSales(){
        var sales = _saleRepo.GetActiveSales();
        return Ok(sales);
    }

    [HttpGet("category/{category}")]
    public IActionResult GetSalesByCategory(string category){
        var sales = _saleRepo.GetSaleByCategory(category);
        return Ok(sales);
    }

    [HttpGet("{id}")]
    public IActionResult GetSaleById(int id){
        var sale = _saleRepo.GetSaleByID(id);
        if(sale == null){
            return NotFound();
        }
        return Ok(sale);
    }

    [HttpGet("activeMovieSales")]
    public IActionResult GetActiveMovieSales()
    {
        var movieSales = (_saleRepo as SaleRepository)?.GetActiveMovieSales();
        return Ok(movieSales);
    }
}