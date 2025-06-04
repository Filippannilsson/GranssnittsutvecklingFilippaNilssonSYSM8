import { useState } from "react";
import "../styles/DeliveryForm.css";

function DeliveryForm({ onDataChange }) {
  const [deliveryData, setDeliveryData] = useState({
    fullName: "",
    streetName: "",
    houseNumber: "",
    city: "",
    phoneNumber: "",
  });

  // Hjälpfunktioner för validering
  function validateName(value) {
    //Bara bokstäver och mellanslag
    return value.replace(/[^a-zA-ZåäöÅÄÖ\s]/g, "");
  }

  function validateStreetName(value) {
    //Bara bokstäver och mellanslag
    return value.replace(/[^a-zA-ZåäöÅÄÖ\s]/g, "");
  }

  function validateCity(value) {
    //Bara bokstäver och mellanslag
    return value.replace(/[^a-zA-ZåäöÅÄÖ\s]/g, "");
  }

  function formatPhoneNumber(value) {
    //Ta bort allt som inte är siffror
    const numbers = value.replace(/\D/g, "");

    //Begränsa till 10 siffror
    return numbers.substring(0, 10);
  }

  //Kontrollera om formuläret är giltigt
  function isFormValid(data = deliveryData) {
    //Kontrollera att alla fält är ifyllda
    if (!data.fullName.trim()) return false;
    if (!data.streetName.trim()) return false;
    if (!data.houseNumber.trim()) return false;
    if (!data.city.trim()) return false;
    //Kontrollera att telefonnummer har 10 siffror
    const phoneDigits = data.phoneNumber.replace(/\D/g, "");
    if (phoneDigits.length !== 10) return false;

    return true;
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    let formattedValue = value;

    //Applicera validering baserat på fält
    switch (name) {
      case "fullName":
        formattedValue = validateName(value);
        break;
      case "streetName":
        formattedValue = validateStreetName(value);
        break;
      case "houseNumber":
        formattedValue = value;
        break;
      case "city":
        formattedValue = validateCity(value);
        break;
      case "phoneNumber":
        formattedValue = formatPhoneNumber(value);

        if (formattedValue.length > 0 && formattedValue.length !== 10) {
          e.target.setCustomValidity("Phone number must be 10 digits");
        } else {
          e.target.setCustomValidity("");
        }
        break;
      default:
        formattedValue = value;
    }

    const newData = {
      ...deliveryData,
      [name]: formattedValue,
    };

    setDeliveryData(newData);

    //Skicka data till Checkout
    if (onDataChange) {
      onDataChange({ ...newData, isValid: isFormValid(newData) });
    }
  }

  return (
    <div className="delivery-wrapper">
      <form className="delivery-section">
        <h2 className="delivery-information-title">Delivery Information</h2>

        <div className="delivery-form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            value={deliveryData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="delivery-form-row">
          <div className="delivery-form-group">
            <label>Street Name</label>
            <input
              type="text"
              name="streetName"
              placeholder="Street Name"
              value={deliveryData.streetName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="delivery-form-group">
            <label>House Number</label>
            <input
              type="text"
              name="houseNumber"
              placeholder="House Number"
              value={deliveryData.houseNumber}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="delivery-form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={deliveryData.city}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="delivery-form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="07X XXX XX XX"
            value={deliveryData.phoneNumber}
            onChange={handleInputChange}
            onBlur={(e) => e.target.reportValidity()}
            required
          />
        </div>
      </form>
    </div>
  );
}

export default DeliveryForm;
