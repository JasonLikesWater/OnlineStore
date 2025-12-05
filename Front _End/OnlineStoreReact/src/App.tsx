import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Message from "./message";
import NavBar from "./Components/Layout/Header/navBar.tsx";
import CheckoutPage from "./Components/Pages/checkoutPage";
import CartPage from "./Components/Pages/cartPage";

function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Optional: Default route */}
        <Route path="/" element={<CheckoutPage />} />
      </Routes>

      <Message />
    </Router>
  );
}

export default App;
