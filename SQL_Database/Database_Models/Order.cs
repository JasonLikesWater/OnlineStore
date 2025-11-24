namespace Online_Store.Models
{
    public class Order
    {
        private int OrderId {get;}
        private int CartId {get;}
        private int MovieId {get;}
        public Order(int OrderId, int CartId, int MovieId)
        {
            this.OrderId = OrderId;
            this.CartId = CartId;
            this.MovieId = MovieId;
        }
    }
}