import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

function Cart() {
  const navigate = useNavigate();
  const { cartItems, getSubtotal } = useCart();

  //Hantera tom varukorg
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-title-items-container">
          <h1 className="cart-title">Cart</h1>
          <div className="cart-content-wrapper empty">
            <div className="empty-cart">
              <p className="empty-cart-text">Your cart is empty</p>
              <button
                className="back-menu-btn"
                onClick={() => navigate("/menu")}
              >
                Back to menu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-title-items-container">
        <h1 className="cart-title">Cart</h1>
        <div className="cart-content-wrapper">
          <div className="cart-items">
            {/* Visa alla produkter i kundvagnen */}
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
          </div>
          <div className="order-summary-wrapper">
            <div className="order-summary-cart">
              <OrderSummary subtotal={getSubtotal()} />
            </div>
            <div className="order-summary-btn">
              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </button>
              <button
                className="back-menu-btn"
                onClick={() => navigate("/menu")}
              >
                Back to menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
