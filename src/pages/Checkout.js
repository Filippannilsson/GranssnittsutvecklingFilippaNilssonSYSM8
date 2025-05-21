import "../styles/Checkout.css";
import "../App.css";
import DeliveryForm from "../components/DeliveryForm";
import PaymentForm from "../components/PaymentForm";
import OrderSummery from "../components/OrderSummery";

function Checkout() {
  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-wrapper">
        <div className="delivery-payment-form">
          <DeliveryForm />
          <PaymentForm />
        </div>
        <OrderSummery subtotal={33.16} />
        <div className="checkout-btns">
          <button className="complete-btn">Complete Payment</button>
          <button className="back-cart-btn">Back to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
