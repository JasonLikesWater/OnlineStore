namespace OnlineStore.Models;

public class Sale
{
    public int SaleId { get; }
    public double Discount { get; }
    public string StartDate { get; }
    public string EndDate { get; }
    public string Category { get; }


    public Sale(int SaleId, double Discount, string StartDate, string EndDate, string Category)
    {
        this.SaleId = SaleId;
        this.Discount = Discount;
        this.StartDate = StartDate;
        this.EndDate = EndDate;
        this.Category = Category;
    }

}



