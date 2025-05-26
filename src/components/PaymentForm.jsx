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

  //Hjälpfunktioner för validering
  function formatCardNumber(value) {
    //Ta bort allt som inte är siffror
    const numbers = value.replace(/\D/g, "");

    //Begränsa till 16 siffror
    const limited = numbers.substring(0, 16);

    //Mellanrum var fjärde siffra
    return limited.replace(/(.{4})/g, "$1 ").trim();
  }

  function validateNameOnCard(value) {
    //Bara bokstäver och mellanslag
    return value.replace(/[^a-zA-ZåäöÅÄÖ\s]/g, "");
  }

  function formatExpiryDate(value) {
    //Ta bort allt som inte är siffror
    const numbers = value.replace(/\D/g, "");

    //Begränsa till 4 siffror
    let limited = numbers.substring(0, 4);

    //Formatera som MM/YY
    if (limited.length >= 2) {
      return `${limited.substring(0, 2)}/${limited.substring(2, 4)}`;
    }
    return limited;
  }

  //Valideringsfunktion
  function isValidExpiryDate(value) {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length !== 4) return false;

    const month = parseInt(numbers.substring(0, 2));
    const year = parseInt(numbers.substring(2, 4));

    //Kontrollera giltig månad
    if (month < 1 || month > 12) return false;

    //Kontrollera att datumet inte har gått ut
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }

    return true;
  }

  function formatCVC(value) {
    //Ta bort allt som inte är siffror, begränsa till 3 siffror
    return value.replace(/\D/g, "").substring(0, 3);
  }

  function formatSwishNumber(value) {
    //Ta bort allt som inte är siffror, begränsa till 10 siffror
    return value.replace(/\D/g, "").substring(0, 10);
  }

  //Kontrollera om formuläret är giltigt
  function isFormValid(data = paymentData, method = selectedPaymentMethod) {
    if (method === "card") {
      const cardDigits = data.cardNumber.replace(/\D/g, "");
      const cvcDigits = data.cvc.replace(/\D/g, "");

      //Kontrollera alla krav
      if (cardDigits.length !== 16) return false;
      if (!data.nameOnCard.trim()) return false;
      if (!isValidExpiryDate(data.expiryDate)) return false;
      if (cvcDigits.length !== 3) return false;
    } else if (method === "swish") {
      const swishDigits = data.swishNumber.replace(/\D/g, "");
      if (swishDigits.length < 10) return false;
    } else {
      //Ingen betalmetod vald
      return false;
    }

    return true;
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    let formattedValue = value;

    //Applicera validering baserat på fält
    switch (name) {
      case "cardNumber":
        formattedValue = formatCardNumber(value);
        //Validering för kortnummer
        const cardDigits = formattedValue.replace(/\D/g, "");
        if (cardDigits.length > 0 && cardDigits.length !== 16) {
          e.target.setCustomValidity("Card number must be 16 digits");
        } else {
          e.target.setCustomValidity("");
        }
        break;

      case "nameOnCard":
        formattedValue = validateNameOnCard(value);
        break;
      case "expiryDate":
        formattedValue = formatExpiryDate(value);

        //Validering för expiry date
        if (formattedValue.length === 5) {
          if (!isValidExpiryDate(formattedValue)) {
            e.target.setCustomValidity("Invalid expiry date");
          } else {
            e.target.setCustomValidity("");
          }
        } else {
          e.target.setCustomValidity("");
        }
        break;
      case "cvc":
        formattedValue = formatCVC(value);

        //Validering för CVC
        if (formattedValue.length > 0 && formattedValue.length !== 3) {
          e.target.setCustomValidity("CVC must be 3 digits");
        } else {
          e.target.setCustomValidity("");
        }
        break;
      case "swishNumber":
        formattedValue = formatSwishNumber(value);
        //Validering för Swish
        if (formattedValue.length > 0 && formattedValue.length < 10) {
          e.target.setCustomValidity("Phone number must be 10 digits");
        } else {
          e.target.setCustomValidity("");
        }
        break;
      default:
        formattedValue = value;
    }

    const newData = {
      ...paymentData,
      [name]: formattedValue,
    };

    setPaymentData(newData);

    //Skicka data till Checkout
    if (onDataChange) {
      onDataChange({
        ...newData,
        isValid: isFormValid(newData, selectedPaymentMethod),
      });
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
      onDataChange({ ...newData, isValid: isFormValid(newData, method) });
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
                onBlur={(e) => e.target.reportValidity()}
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
                  value={paymentData.expiryDate}
                  onChange={handleInputChange}
                  onBlur={(e) => e.target.reportValidity()}
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
                  value={paymentData.cvc}
                  onChange={handleInputChange}
                  onBlur={(e) => e.target.reportValidity()}
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
                value={paymentData.swishNumber}
                onChange={handleInputChange}
                onBlur={(e) => e.target.reportValidity()}
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
