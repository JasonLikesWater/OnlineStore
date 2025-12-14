import React from "react";
import "./cartPage.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { CartItem } from "../../interfaces";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [items,setItems] = React.useState<CartItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  const handleRemoveOne = async (movieId: number) => {
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/Pages/loginPage");
      return;
    }
    const item = items.find(i => i.movieId === movieId);
    if(!item || item.orderIds.length === 0) return;
    const orderIdToRemove = item.orderIds[0];
    try{
      const res = await fetch(
        `http://localhost:5000/api/users/me/cart/${orderIdToRemove}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(!res.ok) return;
      setItems(prev =>
        prev
          .map(i =>
            i.movieId === movieId
              ? {
                  ...i,
                  quantity: i.quantity - 1,
                  orderIds: i.orderIds.slice(1)
                }
              : i
          )
          .filter(i => i.quantity > 0)
      );
    }catch(err){
      console.error("Failed to remove item:", err);
    }
  };
  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/Pages/loginPage");
      return;
    }
    const fetchCart = async () => {
      try{
        const res = await fetch("http://localhost:5000/api/users/me/carts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if(!res.ok){
          navigate("/Pages/loginPage");
          return;
        }
        const data = await res.json();
        console.log("API /me/carts raw response:", data);
        const groupedItems: CartItem[] = [];
        data.forEach((item: any) => {
          const existing = groupedItems.find(i => i.movieId === item.movieId);
          if(existing){
            existing.quantity += 1;
            if (item.orderId) existing.orderIds.push(item.orderId);
            }else{
            groupedItems.push({
              cartId: item.cartId,
              movieId: item.movieId,
              title: item.title,
              price: item.price,
              category: item.category,
              quantity: 1,
              orderIds: item.orderId ? [item.orderId] : []
            });
          }
        });
        setItems(groupedItems);
      }catch(err){
        console.error("Failed to load cart:", err);
      }finally{
        setLoading(false);
      }
    };
    fetchCart();
  }, [navigate]);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div>
      <div className="tile-pattern">
        <div className="tile-3"></div>
      </div>
      <div className="cart-page container py-4">
        {/* Top: back / continue shopping */}
        <button
          type="button"
          className="cart-back-btn d-inline-flex align-items-center mb-4"
          onClick={() => navigate("/Pages/productListPage")}
        >
          <FaArrowLeft className="me-2" />
          <span>Continue shopping</span>
        </button>

        {/* Cart items */}
        <div className="cart-items">
          {loading && <p>Loading your cart...</p>}
          {!loading && items.length === 0 && <p>Your cart is empty.</p>}
          {!loading && items.length > 0 && items.map((item) => (
            <div key={item.movieId} className="cart-item-card d-flex">
              <div className="cart-item-details flex-grow-1">
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-meta">
                  Quantity: {item.quantity}
                  <br />
                  <span
                    className="remove-one-text"
                    onClick={() => handleRemoveOne(item.movieId)}
                  >
                    Remove one
                  </span>
                </p>
              </div>
              <div className="cart-item-price">
                {(item.price * item.quantity).toFixed(2)} <span className="currency">$</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom: promo + subtotal + checkout */}
        <div className="cart-footer d-flex flex-column flex-md-row align-items-md-center justify-content-between mt-4">
          <div className="promo-wrapper mb-3 mb-md-0">
            <div className="promo-input-wrapper">
              <input
                type="text"
                className="form-control promo-input"
                placeholder="Promo code?"
              />
            </div>
          </div>

          <div className="cart-summary text-md-end">
            <div className="cart-subtotal mb-2">
              Subtotal: <span>${loading ? "0.00" : subtotal.toFixed(2)}</span>
            </div>
            <button
              className="checkout-button"
              onClick={() => {
                const token = localStorage.getItem("token");
                if (!token) {
                  navigate("/Pages/loginPage");
                } else {
                  navigate("/Pages/checkoutPage");
                }
              }}
            >
              CHECKOUT →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;