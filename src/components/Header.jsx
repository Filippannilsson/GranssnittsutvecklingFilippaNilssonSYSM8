import { Link } from "react-router-dom";
import "../styles/Header.css";
import "../App.css";
import { ReactComponent as HomeIcon } from "../assets/logos/home.svg";
import { ReactComponent as CartIcon } from "../assets/logos/cart.svg";
import { ReactComponent as MenuIcon } from "../assets/logos/menu.svg";
import { ReactComponent as AccountIcon } from "../assets/logos/account.svg";
import droneDelightsLogo from "../assets/logos/dd-logo2.png";
import { useCart } from "../context/CartContext";

function Header() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img
              src={droneDelightsLogo}
              alt="Drone Delights Logo"
              className="logo-image"
            />
          </Link>
          <h1 className="drone-delights-header">
            Drone <br />
            Delights
          </h1>
        </div>

        <div className="symbols">
          <Link to="/" className="home">
            <HomeIcon className="icon" />
          </Link>
          <Link to="/menu" className="menu">
            <MenuIcon className="icon" />
          </Link>
          <Link to="/cart" className="shopping-cart">
            <CartIcon className="icon" />
            {/* Om cartCount är större än 0, visa antal */}
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <Link to="/login" className="account">
            <AccountIcon className="icon" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
