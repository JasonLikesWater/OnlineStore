import React from "react";
import "./cartPage.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { CartItem } from "../../interfaces";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [items,setItems] = React.useState<CartItem[]>([]);
  const [loading, setLoading] = React.useState(true);
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
        console.log("RAW CART DATA:", data);
        const groupedItems: CartItem[] = [];
        data.forEach((item: any) => {
          const existing = groupedItems.find(i => i.movieId === item.movieId);
          if (existing) {
            existing.quantity += 1;
          } else {
            groupedItems.push({
              cartId: item.cartId,
              orderId: item.orderId,
              movieId: item.movieId,
              title: item.title,
              price: item.price,
              quantity: 1
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
    <div className="cart-page container py-4">
      {/* Top: back / continue shopping */}
      <button
        type="button"
        className="cart-back-btn d-inline-flex align-items-center mb-4"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="me-2" />
        <span>Continue shopping</span>
      </button>

      {/* Cart items */}
      <div className="cart-items">
        {loading && <p>Loading your cart...</p>}
        {!loading && items.length === 0 && <p>Your cart is empty.</p>}
        {!loading && items.length > 0 && items.map((item) => (
          <div key={item.orderId ?? item.cartId} className="cart-item-card d-flex">
            <div className="cart-item-details flex-grow-1">
              <h3 className="cart-item-title">{item.title}</h3>
              <p className="cart-item-meta">
                Quantity: {item.quantity}
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
            onClick={() => navigate("/Pages/checkoutPage")}
          >
            CHECKOUT →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;