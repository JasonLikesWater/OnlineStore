import Message from "./message";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Layout/Header/navBar.tsx";
import DetailsPage from "./Components/Pages/productListPage.tsx";
import CartPage from "./Components/Pages/cartPage.tsx";
import LoginPage from "./Components/Pages/loginPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Message />} />
        <Route path="/Pages/productListPage" element={<DetailsPage />} />
        <Route path="/Pages/cartPage" element={<CartPage />} />
        <Route path="/Pages/loginPage" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
