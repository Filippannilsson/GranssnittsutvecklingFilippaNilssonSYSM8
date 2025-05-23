import "../styles/PaymentForm.css";
import "../App.css";
import { useState } from "react";

function PaymentForm() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
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
                id="card"
                name="payment-method"
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
                id="card-number"
                name="card-number"
                placeholder="1234 5678 9012 3456"
                inputMode="numeric"
                disabled={selectedPaymentMethod !== "card"}
                required={selectedPaymentMethod === "card"}
              />
            </div>

            <div className="payment-form-group">
              <label>Name on Card</label>
              <input
                type="text"
                id="name-on-card"
                name="name-on-card"
                placeholder="Full name"
                disabled={selectedPaymentMethod !== "card"}
                required={selectedPaymentMethod === "card"}
              />
            </div>

            <div className="payment-form-row">
              <div className="payment-form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  id="expiry-date"
                  name="expiry-date"
                  placeholder="MM/YY"
                  pattern="(0[1-9]|1[0-2])\/\d{2}"
                  disabled={selectedPaymentMethod !== "card"}
                  required={selectedPaymentMethod === "card"}
                />
              </div>

              <div className="payment-form-group">
                <label>CVC</label>
                <input
                  type="text"
                  id="cvc"
                  name="cvc"
                  placeholder="123"
                  pattern="\d{3,4}"
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
                id="swish"
                name="payment-method"
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
                id="payment-phone"
                name="payment-phone"
                placeholder="07X XXX XX XX"
                pattern="[0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}"
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
