import "../styles/Cart.css";
import "../App.css";
import CartItem from "../components/CartItem";
import OrderSummery from "../components/OrderSummery";
import hamburgerImg from "../assets/pictures/hamburger1.png";
import hamburger2Img from "../assets/pictures/hamburger2.png";
import friesImg from "../assets/pictures/frenchfries.png";

function Cart() {
  return (
    <div className="cart-page">
      <div className="cart-title-items-container">
        <h1 className="cart-title">Cart</h1>
        <div className="cart-content-wrapper">
          <div className="cart-items">
            <CartItem image={hamburgerImg} name="Hamburger" price="$8.99" />
            <CartItem image={hamburger2Img} name="Hamburger" price="$10.99" />
            <CartItem image={friesImg} name="French Fries" price="$3.29" />
            <CartItem image={friesImg} name="French Fries" price="$3.29" />
          </div>
          <div className="order-summery-container">
            <div className="order-summery-cart">
              <OrderSummery />
            </div>
            <div className="order-summery-btn">
              <button className="checkout-btn">Checkout</button>
              <button className="back-menu-btn">Back to menu</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
