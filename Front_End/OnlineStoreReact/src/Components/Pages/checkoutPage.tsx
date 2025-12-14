import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { CartItem, Sale } from "../../interfaces";
import "./checkoutPage.css";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState<Sale[]>([]);
  const [movieSales, setMovieSales] = useState<{ movieId: number; saleId: number }[]>([]);
  const getItemSaleDiscount = (item: CartItem) => {
    const movieSale = movieSales.find(ms => ms.movieId === item.movieId);
    if (!movieSale) return null;
    const sale = sales.find(s => s.saleId === movieSale.saleId);
    return sale?.discount ?? null;
  };

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/Pages/loginPage");
    return;
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      const [salesRes, cartRes] = await Promise.all([
        fetch("http://localhost:5000/api/sales/active"),
        fetch("http://localhost:5000/api/users/me/carts", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      let salesData: Sale[] = [];
      if (salesRes && salesRes.ok) {
        try { salesData = await salesRes.json(); }
        catch (err) { console.warn("Failed to parse sales JSON:", err); salesData = []; }
      } else {
        console.warn("Sales fetch not OK", salesRes && salesRes.status);
      }
      const movieSalesRes = await fetch("http://localhost:5000/api/sales/activeMovieSales");
      let movieSalesData: { movieId: number; saleId: number }[] = [];
      if (movieSalesRes.ok) {
        movieSalesData = await movieSalesRes.json();
      }
      setMovieSales(movieSalesData);
      setSales(salesData);
      console.debug("Fetched sales:", salesData);
      if (!cartRes) {
        console.error("Cart response missing");
        setItems([]);
        return;
      }
      if (cartRes.status === 401) {
        navigate("/Pages/loginPage");
        return;
      }
      if (!cartRes.ok) {
        let bodyText = "";
        try { bodyText = await cartRes.text(); } catch {}
        console.error("Cart fetch failed", cartRes.status, bodyText);
        setItems([]);
        return;
      }
      const rawCart = await cartRes.json();
      console.debug("Raw /me/carts response:", rawCart);
      if (!Array.isArray(rawCart)) {
        console.warn("/me/carts did not return an array:", rawCart);
        setItems([]);
        return;
      }
      const validRows = rawCart.filter((r: any) => r && r.movieId != null);
      console.debug("Filtered valid cart rows:", validRows);
      const groupedItems: CartItem[] = [];
      validRows.forEach((row: any) => {
        const movieIdNum = typeof row.movieId === "number" ? row.movieId : Number(row.movieId);
        const priceNum = typeof row.price === "number" ? row.price : Number(row.price) || 0;
        const existing = groupedItems.find(i => i.movieId === movieIdNum);
        if (existing) {
          existing.quantity += 1;
          if (row.orderId) existing.orderIds.push(row.orderId);
        } else {
          groupedItems.push({
            cartId: row.cartId,
            movieId: movieIdNum,
            title: row.title ?? "Untitled",
            price: priceNum,
            category: row.category ?? "Uncategorized",
            quantity: 1,
            orderIds: row.orderId ? [row.orderId] : [],
          });
        }
      });
      console.debug("Grouped cart items:", groupedItems);
      setItems(groupedItems);
    } catch (err) {
      console.error("Error fetching checkout data:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [navigate]);
  const getItemDiscount = (item: CartItem) => {
    const movieSale = movieSales.find((ms: { movieId: number; saleId: number }) => ms.movieId === item.movieId);
    if (!movieSale) return 0;
    const sale = sales.find(s => s.saleId === movieSale.saleId);
    if (!sale) return 0;
    return item.price * item.quantity * (sale.discount / 100);
  };
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.length > 0 ? 4.99 : 0;
  const discount = items.reduce((sum, item) => sum + getItemDiscount(item), 0);
  const total = subtotal + shipping - discount;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(items.length === 0){
      alert("Your cart is empty. Add items before placing an order.");
      return;
    }
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/Pages/loginPage");
      return;
    }
    try{
      for(const item of items){
        for(const orderId of item.orderIds){
          await fetch(`http://localhost:5000/api/users/me/cart/${orderId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
      }
      setItems([]);
      alert("Thank you! Your order has been placed successfully.");
      navigate("/Pages/productListPage");
    }catch(err){
      console.error("Failed to place order:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <div className="tile-pattern">
        <div className="tile-3"></div>
      </div>
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
                  type="button"
                    onClick={(e) => handleSubmit(e as any)} // cast to satisfy FormEvent
                    className="btn btn-primary w-100 mt-4 place-order-btn"
                    disabled={items.length === 0}
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
                {loading && <p>Loading order summary...</p>}

                {!loading && items.length === 0 && (
                  <p>Your cart is empty.</p>
                )}

                {!loading && items.length > 0 &&
                  items.map((item) => (
                    <li
                      key={item.movieId}
                      className="order-summary-item"
                    >
                      <div>
                        <div className="order-item-title">{item.title}</div>
                        <div className="text-muted small">
                          Qty: {item.quantity}
                        </div>
                        {getItemSaleDiscount(item) && (
                          <div className="text-success small">
                            {getItemSaleDiscount(item)}% off
                          </div>
                        )}
                      </div>
                      <div>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </li>
                  ))
                }
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
    </div>
  );
};

export default CheckoutPage;