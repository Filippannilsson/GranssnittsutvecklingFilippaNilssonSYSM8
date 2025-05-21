import "../styles/DeliveryForm.css";
import "../App.css";

function DeliveryForm() {
  return (
    <div className="delivery-wrapper">
      <form className="delivery-section">
        <h2 className="delivery-information-title">Delivery Information</h2>

        <div className="delivery-form-group">
          <label>Full Name</label>
          <input
            type="text"
            id="full-name"
            name="full-name"
            placeholder="Full name"
            required
          />
        </div>

        <div className="delivery-form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            id="phone-number"
            name="phone-number"
            placeholder="07X XXX XX XX"
            pattern="[0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}"
            required
          />
        </div>

        <div className="delivery-form-group">
          <label>City</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            required
          />
        </div>

        <div className="delivery-form-group">
          <label>Street Name</label>
          <input
            type="text"
            id="street-name"
            name="street-name"
            placeholder="Street Name"
            required
          />
        </div>

        <div className="delivery-form-group">
          <label>House Number</label>
          <input
            type="text"
            id="house-number"
            name="house-number"
            placeholder="House Number"
            required
          />
        </div>
      </form>
    </div>
  );
}

export default DeliveryForm;
