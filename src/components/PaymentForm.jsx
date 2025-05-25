import "../styles/PaymentForm.css";
import "../App.css";
import { useState } from "react";

function PaymentForm({ onDataChange }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const [paymentData, setPaymentData] = useState({
    paymentMethod: null,
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    cvc: "",
    swishNumber: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    const newData = {
      ...paymentData,
      [name]: value,
    };

    setPaymentData(newData);

    //Skicka data till Checkout
    if (onDataChange) {
      onDataChange(newData);
    }
  }

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);

    //Rensa fält baserat på vilken metod som väljs
    const newData = {
      paymentMethod: method,
      cardNumber: method === "card" ? paymentData.cardNumber : "",
      nameOnCard: method === "card" ? paymentData.nameOnCard : "",
      expiryDate: method === "card" ? paymentData.expiryDate : "",
      cvc: method === "card" ? paymentData.cvc : "",
      swishNumber: method === "swish" ? paymentData.swishNumber : "",
    };

    setPaymentData(newData);

    //Skicka till Checkout
    if (onDataChange) {
      onDataChange(newData);
    }
  };

  return (
    <div className="payment-wrapper">
      <form className="payment-section">
        <h2 className="payment-method-title">Payment Method</h2>

        <div className="payment-form">
          <div className="payment-form-card">
            <div className="radio-group">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={selectedPaymentMethod === "card"}
                onChange={() => handlePaymentMethodChange("card")}
                required
              />
              <label>Card</label>
            </div>
            <div className="payment-form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                inputMode="numeric"
                value={paymentData.cardNumber}
                onChange={handleInputChange}
                disabled={selectedPaymentMethod !== "card"}
                required={selectedPaymentMethod === "card"}
              />
            </div>

            <div className="payment-form-group">
              <label>Name on Card</label>
              <input
                type="text"
                name="nameOnCard"
                placeholder="Full name"
                value={paymentData.nameOnCard}
                onChange={handleInputChange}
                disabled={selectedPaymentMethod !== "card"}
                required={selectedPaymentMethod === "card"}
              />
            </div>

            <div className="payment-form-row">
              <div className="payment-form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  pattern="(0[1-9]|1[0-2])\/\d{2}"
                  value={paymentData.expiryDate}
                  onChange={handleInputChange}
                  disabled={selectedPaymentMethod !== "card"}
                  required={selectedPaymentMethod === "card"}
                />
              </div>

              <div className="payment-form-group">
                <label>CVC</label>
                <input
                  type="text"
                  name="cvc"
                  placeholder="123"
                  pattern="\d{3,4}"
                  value={paymentData.cvc}
                  onChange={handleInputChange}
                  disabled={selectedPaymentMethod !== "card"}
                  required={selectedPaymentMethod === "card"}
                />
              </div>
            </div>
          </div>

          <div className="payment-form-phone">
            <div className="radio-group">
              <input
                type="radio"
                name="paymentMethod"
                value="swish"
                checked={selectedPaymentMethod === "swish"}
                onChange={() => handlePaymentMethodChange("swish")}
                required
              />
              <label>Swish</label>
            </div>
            <div className="payment-form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="swishNumber"
                placeholder="07X XXX XX XX"
                pattern="[0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}"
                value={paymentData.swishNumber}
                onChange={handleInputChange}
                disabled={selectedPaymentMethod !== "swish"}
                required={selectedPaymentMethod === "swish"}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PaymentForm;
