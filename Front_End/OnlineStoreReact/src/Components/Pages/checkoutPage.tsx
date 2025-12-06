import React, { FormEvent } from "react";
import "./checkoutPage.css";

const CheckoutPage: React.FC = () => {
  // TODO: Replace this with real cart data from context or props
  const items = [
    { id: 1, title: "Inception (Blu-ray)", qty: 1, price: 19.99 },
    { id: 2, title: "The Dark Knight (DVD)", qty: 2, price: 9.99 },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = 4.99;
  const discount = 0; // hook this up to sales later
  const total = subtotal + shipping - discount;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Mock checkout – no real payment processing
    alert("Thank you! This is a mock checkout – your order has been placed.");
  };

  return (
    <div className="checkout-page container py-4">
      <h1 className="mb-4 text-center">Checkout</h1>

      <div className="row gy-4">
        {/* Left column: shipping + payment */}
        <div className="col-lg-7">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="card shadow-sm mb-4">
              <div className="card-header fw-semibold">Shipping Information</div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      className="form-control"
                      type="text"
                      placeholder="Howraa"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      className="form-control"
                      type="text"
                      placeholder="Al-Robaie"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      className="form-control"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="address">
                      Address
                    </label>
                    <input
                      id="address"
                      className="form-control"
                      type="text"
                      placeholder="1234 Movie Lane"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="city">
                      City
                    </label>
                    <input
                      id="city"
                      className="form-control"
                      type="text"
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label" htmlFor="state">
                      State
                    </label>
                    <input
                      id="state"
                      className="form-control"
                      type="text"
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label" htmlFor="zip">
                      ZIP
                    </label>
                    <input
                      id="zip"
                      className="form-control"
                      type="text"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow-sm">
              <div className="card-header fw-semibold">Payment Details</div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-12">
                    <p className="text-muted small mb-2">
                      This is a mock checkout – enter any fake card details.
                    </p>
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="cardName">
                      Name on Card
                    </label>
                    <input
                      id="cardName"
                      className="form-control"
                      type="text"
                      placeholder="Howraa Al-Robaie"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="cardNumber">
                      Card Number
                    </label>
                    <input
                      id="cardNumber"
                      className="form-control"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="expiry">
                      Expiration
                    </label>
                    <input
                      id="expiry"
                      className="form-control"
                      type="text"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="cvv">
                      CVV
                    </label>
                    <input
                      id="cvv"
                      className="form-control"
                      type="text"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-4 place-order-btn"
                >
                  Place Order
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right column: order summary */}
        <div className="col-lg-5">
          <div className="card shadow-sm order-summary-card">
            <div className="card-header fw-semibold">Order Summary</div>
            <div className="card-body">
              <ul className="list-unstyled order-summary-list mb-3">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="order-summary-item d-flex justify-content-between"
                  >
                    <div>
                      <div className="order-item-title">{item.title}</div>
                      <div className="text-muted small">Qty: {item.qty}</div>
                    </div>
                    <div>${(item.price * item.qty).toFixed(2)}</div>
                  </li>
                ))}
              </ul>

              <div className="order-totals">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="d-flex justify-content-between mb-1 text-success">
                    <span>Discount</span>
                    <span>- ${discount.toFixed(2)}</span>
                  </div>
                )}
                <hr />
                <div className="d-flex justify-content-between fw-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <p className="text-muted small mt-3 mb-0">
                By placing your order, you agree to the MovieHub terms and
                conditions. Since this is a class project, no real payment is
                processed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
