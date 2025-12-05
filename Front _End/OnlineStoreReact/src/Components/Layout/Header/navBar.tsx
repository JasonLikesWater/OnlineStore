import jason from "./react.svg";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <>
        {/* Logo + Link to Home */}
        <Link className="navbar-brand" to="/">
          <img src={jason} width="50" height="30" alt="logo" />
          MOVIEHUB
        </Link>

        <div className="container-fluid">
          <div className="d-flex" role="navigation">

            {/* Login Button — update route later if needed */}
            <Link to="/login" className="btn btn-outline-primary me-2">
              Login
            </Link>

            {/* Cart Button */}
            <Link to="/cart" className="btn btn-outline-primary">
              <FaShoppingCart style={{ color: "green", marginRight: 5 }} />
              Cart
            </Link>

          </div>
        </div>
      </>
    </nav>
  );
}

export default NavBar;
