import logo from "./logo.png";
import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa"; // Imported FaSearch icon
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useLayoutEffect} from "react";

function NavBar() {
  // Define a style for the text links to ensure they are white against the dark background
  const textLinkStyle = { color: "white" };

  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(80);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const loginRef = useRef<HTMLAnchorElement | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
      setDropdownOpen(false);
    };
    loadUser();
    window.addEventListener("userChanged", loadUser);
    return () => window.removeEventListener("userChanged", loadUser);
  }, []);

  useLayoutEffect(() => {
    const currentRef = user ? buttonRef.current : loginRef.current;
    if(currentRef){
      const width = Math.max(currentRef.offsetWidth, 80);
      setButtonWidth(width);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    window.dispatchEvent(new Event("userChanged"));
  };

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

          {user ? (
            <div className="dropdown me-3" style={{ position: "relative" }}>
              <button
                ref={buttonRef}
                className="btn btn-sm btn-outline-light"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ borderRadius: "5px", cursor: "pointer", minWidth: "80px" }}
              >
                {user.username}
              </button>
              {dropdownOpen && (
                <div
                  className="dropdown-menu show"
                  style={{
                    position: "absolute",
                    right: 0,
                    width: `${buttonWidth}px`,
                    minWidth: 0,
                  }}
                >
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              ref={loginRef}
              to="/Pages/loginPage"
              className="btn btn-sm btn-outline-light me-2 d-flex align-items-center"
              style={{ borderRadius: "5px", minWidth: "80px" }}
            >
              <FaUserCircle className="me-1" />
              Login
            </Link>
          )}

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