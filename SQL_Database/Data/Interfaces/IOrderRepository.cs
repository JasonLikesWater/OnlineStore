using Online_Store.Models;

public interface IOrderRepository
{
    Order GetOrderById(int id);
    Order GetOrderByCartId(int cartId);
}