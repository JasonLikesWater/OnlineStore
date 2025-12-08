import Message from "./message";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Layout/Header/navBar.tsx";
import ListPage from "./Components/Pages/productListPage.tsx";
import CartPage from "./Components/Pages/cartPage";
import CheckoutPage from "./Components/Pages/checkoutPage";
import LoginPage from "./Components/Pages/loginPage.tsx";
import SalesPage from "./Components/Pages/salesPage.tsx";
import ProductDetailsPage from "./Components/Pages/productDetailsPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Message />} />
        <Route path="/Pages/productListPage" element={<ListPage />} />
        <Route
          path="/Pages/productDetailsPage/:productId"
          element={<ProductDetailsPage />}
        />
        <Route path="/Pages/cartPage" element={<CartPage />} />
        <Route path="/Pages/checkoutPage" element={<CheckoutPage />} />
        <Route path="/Pages/salesPage" element={<SalesPage />} />
        <Route path="/Pages/loginPage" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
