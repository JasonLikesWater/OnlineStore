namespace Online_Store.Models
{
    public class Order
    {
        public int OrderId {get;}
        public int CartId {get;}
        public int MovieId {get;}
        public Order(int OrderId, int CartId, int MovieId)
        {
            this.OrderId = OrderId;
            this.CartId = CartId;
            this.MovieId = MovieId;
        }
    }
}