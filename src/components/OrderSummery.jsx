import "../styles/OrderSummery.css";
import "../App.css";

function OrderSummery({ subtotal = 0 }) {
  const delivery = 2.9;
  const total = (subtotal + delivery).toFixed(2);

  return (
    <section className="order-summary-container">
      <h2 className="order-summary-title">Order Summary</h2>

      <div className="summary-row subtotal">
        <span className="label">Subtotal:</span>
        <span className="value">${subtotal.toFixed(2)}</span>
      </div>

      <div className="summary-row delivery">
        <span className="label">Delivery:</span>
        <span className="value">${delivery.toFixed(2)}</span>
      </div>

      <hr className="line" />

      <div className="summary-row total">
        <span className="label">Total:</span>
        <span className="value">${total}</span>
      </div>
    </section>
  );
}

export default OrderSummery;
