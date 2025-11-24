namespace Online_Store.Models
{
    public class Sale
    {
        private int SaleId { get; }
        private double Discount { get;}
        private string StartDate { get; }
        private string EndDate {get;}
        private string Category {get;}


        public Sale(int SaleId, double Discount, string StartDate, string EndDate, string Category)
        {
            this.SaleId = SaleId;
            this.Discount = Discount;
            this.StartDate = StartDate;
            this.EndDate = EndDate;
            this.Category = Category;
        }

    }

    
}
