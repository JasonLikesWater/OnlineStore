import logo from "./logo.png";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa"; // Added FaUserCircle for Login
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

        {/* Buttons Group */}
        <div className="d-flex">
          {/* Login Button (Secondary/Outline Style) */}
          {/* Applied btn-outline-light class directly to the Link for clean ghost button look */}
          <Link
            to="/Pages/loginPage"
            className="btn btn-sm btn-outline-light me-2 d-flex align-items-center" // Used btn-sm for smaller button
            style={{ borderRadius: "5px" }} // Added slight rounding
          >
            <FaUserCircle className="me-1" /> {/* Icon for visual clarity */}
            Login
          </Link>

          {/* Cart Button (Primary/Solid Style - Main CTA) */}
          {/* Applied btn-success class directly to the Link for solid primary button */}
          <Link
            to="/Pages/cartPage"
            className="btn btn-sm btn-success d-flex align-items-center" // Used a contrasting color (green/success)
            style={{ borderColor: "white", borderRadius: "5px" }} // Added slight rounding
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
