import "../styles/DeliveryForm.css";
import "../App.css";
import { useState } from "react";

function DeliveryForm({ onDataChange }) {
  const [deliveryData, setDeliveryData] = useState({
    fullName: "",
    streetName: "",
    houseNumber: "",
    city: "",
    phoneNumber: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    const newData = {
      ...deliveryData,
      [name]: value,
    };

    setDeliveryData(newData);

    //Skicka data till Checkout
    if (onDataChange) {
      onDataChange(newData);
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
            pattern="[0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}"
            value={deliveryData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
      </form>
    </div>
  );
}

export default DeliveryForm;
