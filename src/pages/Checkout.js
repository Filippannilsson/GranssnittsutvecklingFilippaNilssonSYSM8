import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import DeliveryForm from "../components/DeliveryForm";
import PaymentForm from "../components/PaymentForm";
import OrderSummary from "../components/OrderSummary";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { createOrder } from "../services/api";
import "../styles/Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getSubtotal } = useCart();
  const { user } = useUser();
  const [deliveryData, setDeliveryData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const delivery = 2.9;

  //Omdirigera till cart om inget är tillagt i cart
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems.length, navigate]);

  //Funktion som tar emot och validerar data från DeliveryForm
  function handleDeliveryData(data) {
    setDeliveryData(data);
    console.log("Delivery data received:", data);
  }

  //Funktion som tar emot och validerar data från PaymentForm
  function handlePaymentData(data) {
    setPaymentData(data);
    console.log("Payment data received:", data);
  }

  //Funktion för att validera och genomföra beställningen
  function handleCompletePayment() {
    if (!deliveryData.isValid) {
      alert("Please fill in all delivery information correctly");
      return;
    }

    if (!paymentData.isValid) {
      alert("Please fill in payment information correctly");
      return;
    }

    createOrder({
      userId: user?.id, //null för gästbeställningar
      items: cartItems,
      delivery: deliveryData,
      payment: paymentData,
      subtotal: getSubtotal(),
      total: getSubtotal() + delivery,
    })
      .then((createdOrder) => {
        navigate("/confirmation", {
          state: {
            orderNumber: createdOrder.orderNumber,
            orderData: createdOrder,
          },
        });
      })
      .catch((error) => {
        console.error("Failed to create order:", error);
        alert("Order failed. Please try again.");
      });
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-wrapper">
        <div className="delivery-payment-form">
          <DeliveryForm onDataChange={handleDeliveryData} />
          <PaymentForm onDataChange={handlePaymentData} />
        </div>
        <OrderSummary subtotal={getSubtotal()} />
        <div className="checkout-btns">
          <button className="complete-btn" onClick={handleCompletePayment}>
            Complete Payment
          </button>
          <button className="back-cart-btn" onClick={() => navigate("/cart")}>
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
