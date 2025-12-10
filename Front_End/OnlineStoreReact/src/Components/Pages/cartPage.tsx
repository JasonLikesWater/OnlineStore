import React from "react";
import "./cartPage.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { type MovieDetails } from "../../interfaces";

type CartItem = {
  id: number;
  title: string;
  director: string;
  writers: string;
  cast: string;
  price: number;
  posterUrl: string;
};

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  // TODO: replace with real cart data from context / backend
  const items: CartItem[] = [
    {
      id: 1,
      title: "Barbie (2023)",
      director: "Greta Gerwig",
      writers: "Greta Gerwig, Noah Baumbach",
      cast: "Ensemble cast includes well-known stars from film and TV",
      price: 18.99,
      posterUrl: "https://via.placeholder.com/80x120?text=Barbie",
    },
    {
      id: 2,
      title: "Expendables 2",
      director: "Simon West",
      writers: "Richard Wenk, Sylvester Stallone",
      cast: "Ensemble cast includes well-known stars from film and TV",
      price: 29.99,
      posterUrl: "https://via.placeholder.com/80x120?text=Expendables",
    },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  const handleApplyPromo = () => {
    // mock handler for now
    alert("Promo codes will be implemented later.");
  };

  return (
    <div className="cart-page container py-4">
      {/* Top: back / continue shopping */}
      <button
        type="button"
        className="cart-back-btn d-inline-flex align-items-center mb-4"
      >
        <FaArrowLeft className="me-2" />
        <span>Continue shopping</span>
      </button>

      {/* Cart items */}
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item-card d-flex">
            <div className="cart-item-image">
              <img src={item.posterUrl} alt={item.title} />
            </div>

            <div className="cart-item-details flex-grow-1">
              <h3 className="cart-item-title">{item.title}</h3>
              <p className="cart-item-meta">
                <span className="label">Director:</span> {item.director}
              </p>
              <p className="cart-item-meta">
                <span className="label">Writers:</span> {item.writers}
              </p>
              <p className="cart-item-meta">
                <span className="label">Cast:</span> {item.cast}
              </p>
            </div>

            <div className="cart-item-price">
              {item.price.toFixed(2)} <span className="currency">$</span>
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
            Subtotal: <span>${subtotal.toFixed(2)}</span>
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
