import logo from "./logo.png";
import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "../../../interfaces.ts";

function NavBar() {
  const textLinkStyle = { color: "white" };

  // --- NEW STATE FOR SEARCH ---
  const [searchTerm, setSearchTerm] = useState("");

  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(80);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const loginRef = useRef<HTMLAnchorElement | null>(null);

  const navigate = useNavigate();

  // --- NEW HANDLER FOR SEARCH SUBMISSION ---
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents full page reload on form submission

    const trimmedTerm = searchTerm.trim();

    if (trimmedTerm) {
      // 1. Clear the search bar text
      setSearchTerm("");

      // 2. Navigate to the search results page
      navigate(`/Pages/searchResultsPage?q=${encodeURIComponent(trimmedTerm)}`);
    }
  };

  useEffect(() => {
    const loadUser = () => {
      const stored = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (stored && token) {
        try {
          const decoded = jwtDecode<DecodedToken>(token);
          if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
            return;
          }
          setUser(JSON.parse(stored));
        } catch {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
      setUser(stored ? JSON.parse(stored) : null);
      setDropdownOpen(false);
    };
    loadUser();
    window.addEventListener("userChanged", loadUser);
    return () => window.removeEventListener("userChanged", loadUser);
  }, []);

  useLayoutEffect(() => {
    const currentRef = user ? buttonRef.current : loginRef.current;
    if (currentRef) {
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

        {/* Links Group */}
        <div className="d-flex align-items-center me-auto">
          <Link
            to="/"
            className="nav-link nav-text-link me-3"
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

        {/* Buttons Group (Includes the Search Bar) */}
        <div className="d-flex align-items-center">
          {/* 🔍 COMPLETED SEARCH BAR FORM 🔍 */}
          <form
            onSubmit={handleSearchSubmit}
            className="input-group me-3"
            style={{ width: "250px" }}
          >
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search products..."
              aria-label="Search products"
              value={searchTerm} // Controlled component
              onChange={(e) => setSearchTerm(e.target.value)} // Updates state on change
            />
            <button
              className="btn btn-outline-light btn-sm"
              type="submit" // Triggers handleSearchSubmit
            >
              <FaSearch />
            </button>
          </form>
          {/* ------------------- */}

          {/* User/Login Button Group */}
          {user ? (
            <div className="dropdown me-3" style={{ position: "relative" }}>
              <button
                ref={buttonRef}
                className="btn btn-sm btn-outline-light"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  borderRadius: "5px",
                  cursor: "pointer",
                  minWidth: "80px",
                }}
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

          {/* Cart Button (Primary CTA) */}
          <button
            className="btn btn-sm btn-outline-light d-flex align-items-center"
            style={{ borderRadius: "5px" }}
            onClick={() => {
              const token = localStorage.getItem("token");
              if (!token) {
                navigate("/Pages/loginPage");
              } else {
                navigate("/Pages/cartPage");
              }
            }}
          >
            <FaShoppingCart className="me-1" />
            Cart
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
