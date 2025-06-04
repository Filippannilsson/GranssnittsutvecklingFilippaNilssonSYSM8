import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import OrderedItem from "../components/OrderedItem";
import { useCart } from "../context/CartContext";
import "../styles/Confirmation.css";

function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();

  const [orderData, setOrderData] = useState(null);

  //Leveranskostnad
  const delivery = 2.9;

  useEffect(() => {
    //Hämta den orderdata som skickades från checkout
    if (location.state) {
      setOrderData(location.state.orderData);
      clearCart();
    } else {
      //Omdirigera till cart om den är tom
      console.log("No order data");
      navigate("/cart");
    }
  }, [location.state, navigate]);

  if (!orderData) {
    return null; // Ingenting visas
  }

  const orderedItems = orderData.items;

  //Beräkna subtotal
  function calculateSubtotal() {
    return orderedItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  //Beräkna total
  const subtotal = calculateSubtotal();
  const total = subtotal + delivery;

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <h1 className="confirmation-title">Thank you for your order!</h1>
        <div className="confirmation-message">
          <p className="confirmation-info">
            We have received your order and
            <br />
            are preparing it for delivery
          </p>
          <p className="delivery-time">
            Estimated delivery time:
            <br />
            20-25 minutes
          </p>
        </div>

        <hr className="line" />

        <div className="order-overview">
          <h2 className="your-order-title">Your Order:</h2>

          <div className="order-content">
            <div className="order-left">
              <div className="ordered-items-list">
                {orderedItems.map((item) => (
                  <OrderedItem
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    price={`$${item.price.toFixed(2)}`}
                    quantity={item.quantity}
                  />
                ))}
              </div>
              <div className="confirmation-price">
                <div className="delivery-row">
                  <span className="summary-label">Delivery:</span>
                  <span className="summary-price">${delivery.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span className="summary-label">Total:</span>
                  <span className="summary-price">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="order-right">
              <button className="back-home-btn" onClick={() => navigate("/")}>
                Back Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
