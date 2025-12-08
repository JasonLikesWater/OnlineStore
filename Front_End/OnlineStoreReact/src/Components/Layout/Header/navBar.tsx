import logo from "./logo.png";
import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa"; // Imported FaSearch icon
import { Link } from "react-router-dom";

function NavBar() {
  // Define a style for the text links to ensure they are white against the dark background
  const textLinkStyle = { color: "white" };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{ backgroundColor: "rgba(0, 4, 53, 0.9)" }} // Dark Blue Background
      data-bs-theme="dark" // Use dark theme for better contrast on text links
    >
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/" className="navbar-brand me-3">
          <img src={logo} width="200" height="50" alt="Brand Logo" />
        </Link>

        {/* Links Group (Text/Tertiary Buttons) */}
        {/* me-auto pushes this group to the left and the next group to the right */}
        <div className="d-flex align-items-center me-auto">
          <Link
            to="/"
            className="nav-link nav-text-link me-3" // Increased margin for spacing
            style={textLinkStyle}
          >
            Home
          </Link>

          <Link
            to="/Pages/productListPage"
            className="nav-link nav-text-link me-3"
            style={textLinkStyle}
          >
            Products
          </Link>

          <Link
            to="/Pages/salesPage"
            className="nav-link nav-text-link"
            style={textLinkStyle}
          >
            On Sale
          </Link>
        </div>

        {/* Buttons Group (Includes the new Search Bar) */}
        <div className="d-flex align-items-center">
          {/* 🔍 NEW SEARCH BAR 🔍 */}
          <div className="input-group me-3" style={{ width: "250px" }}>
            <input
              type="text"
              className="form-control form-control-sm" // Use form-control-sm for smaller height
              placeholder="Search products..."
              aria-label="Search products"
              aria-describedby="button-addon2"
            />
            <button
              className="btn btn-outline-light btn-sm"
              type="button"
              id="button-addon2"
            >
              <FaSearch />
            </button>
          </div>
          {/* ------------------- */}

          {/* Login Button (Secondary/Outline Style) */}
          <Link
            to="/Pages/loginPage"
            className="btn btn-sm btn-outline-light me-2 d-flex align-items-center"
            style={{ borderRadius: "5px" }}
          >
            <FaUserCircle className="me-1" />
            Login
          </Link>

          {/* Cart Button (Primary/Solid Style - Main CTA) */}
        <Link
        to="/Pages/cartPage"
        className="btn btn-sm btn-outline-light d-flex align-items-center"
        style={{ borderRadius: "5px" }}
      >
        <FaShoppingCart className="me-1" />
        Cart
      </Link>


        </div>
      </div>
    </nav>
  );
}

export default NavBar;
