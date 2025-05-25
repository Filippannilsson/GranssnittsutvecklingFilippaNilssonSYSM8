import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../styles/Checkout.css";
import "../App.css";
import DeliveryForm from "../components/DeliveryForm";
import PaymentForm from "../components/PaymentForm";
import OrderSummery from "../components/OrderSummery";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/api";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getSubtotal, clearCart } = useCart();
  const [deliveryData, setDeliveryData] = useState({});
  const [paymentData, setPaymentData] = useState({});

  //Funktion som tar emot data från DeliveryForm
  function handleDeliveryData(data) {
    setDeliveryData(data);
    console.log("Delivery data received:", data);
  }

  //Funktion som tar emot data från PaymentForm
  function handlePaymentData(data) {
    setPaymentData(data);
    console.log("Payment data received:", data);
  }

  //Funktion för att validera beställningen
  function handleCompletePayment() {
    if (
      !deliveryData.fullName ||
      !deliveryData.streetName ||
      !deliveryData.houseNumber ||
      !deliveryData.city ||
      !deliveryData.phoneNumber
    ) {
      alert("Please fill in all delivery information");
      return;
    }

    if (!paymentData.paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (paymentData.paymentMethod === "card") {
      if (
        !paymentData.cardNumber ||
        !paymentData.nameOnCard ||
        !paymentData.expiryDate ||
        !paymentData.cvc
      ) {
        alert("Please fill in card information");
        return;
      }
    }

    if (paymentData.paymentMethod === "swish" && !paymentData.swishNumber) {
      alert("Please fill in phone number");
      return;
    }

    createOrder({
      items: cartItems,
      delivery: deliveryData,
      payment: paymentData,
      subtotal: getSubtotal(),
      total: getSubtotal() + 2.9,
    })
      .then((createdOrder) => {
        clearCart();
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
        <OrderSummery subtotal={getSubtotal()} />
        <div className="checkout-btns">
          <button
            className="complete-btn"
            onClick={() => {
              handleCompletePayment();
            }}
          >
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
