// src/components/NavBar.tsx (Assuming your file path)
import jason from "./Adobe Express - file.png";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
// Make sure you have your Bootstrap CSS imported in your main index.tsx file, e.g.,
// import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
  return (
    <nav
      className="navbar navbar-expand-lg" // Added navbar-expand-lg for better responsiveness
      style={{ backgroundColor: "#efebabff" }}
      data-bs-theme="light"
    >
      <div className="container-fluid">
        {/* Logo - changed <a> to <Link> for React Router navigation */}
        <Link to="/" className="navbar-brand me-3">
          <img src={jason} width="150" height="50" alt="Brand Logo" />
        </Link>

        {/* Links Group */}
        <div className="d-flex align-items-center me-auto">
          <Link to="/" className="nav-link-text ms-2 me-2 nav-link">
            Home
          </Link>

          <Link
            to="/Pages/ProductDetailsPage"
            className="nav-link-text nav-link"
          >
            Products
          </Link>
        </div>

        {/* Buttons Group */}
        <div className="d-flex">
          {/* Login Button - Wrapped in Link, removed type="submit" */}
          <Link to="/Pages/cartPage" className="nav-link-text me-2">
            <button className="btn btn-outline-primary" type="button">
              Login
            </button>
          </Link>

          {/* Cart Button - Wrapped in Link, removed type="submit" */}
          <Link to="/Pages/cartPage" className="nav-link-text">
            <button className="btn btn-outline-primary" type="button">
              <FaShoppingCart style={{ color: "green" }} className="me-1" />
              Cart
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
