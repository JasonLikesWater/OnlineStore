import jason from "./react.svg";
import { FaShoppingCart } from "react-icons/fa";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <>
        <a className="navbar-brand" href="#">
          <img src={jason} width="50" height="30"></img>
          MOVIEHUB
        </a>

        <div className="container-fluid">
          <a className="navbar-brand"></a>
          <form className="d-flex" role="search">
            <button className="btn btn-outline-primary " type="submit">
              Login
            </button>
            <button className="btn btn-putline-primary " type="submit">
              <FaShoppingCart style={{ color: "green" }} />
              Cart
            </button>
          </form>
        </div>
      </>
    </nav>
  );
}

export default NavBar;
