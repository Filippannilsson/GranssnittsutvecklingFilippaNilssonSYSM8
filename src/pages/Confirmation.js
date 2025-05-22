import { useNavigate } from "react-router-dom";
import "../styles/Confirmation.css";
import "../App.css";
import OrderedItem from "../components/OrderedItem";
import hamburgerImg from "../assets/pictures/hamburger1.png";
import hamburger2Img from "../assets/pictures/hamburger2.png";
import friesImg from "../assets/pictures/frenchfries.png";

function Confirmation() {
  const navigate = useNavigate();

  // Tom array för nu - kommer fyllas från db.json senare
  const orderedItems = [];

  // const orderedItems = [
  //   { image: hamburgerImg, name: "Hamburger", price: "$10.99" },

  // Leveranskostnad
  const delivery = 2.9;

  // Beräkna subtotal
  const calculateSubtotal = () => {
    return orderedItems.reduce((total, item) => {
      // Ta bort $ och konvertera till nummer
      const price = parseFloat(item.price.replace("$", ""));
      return total + price;
    }, 0);
  };

  //Beräkna total
  const subtotal = calculateSubtotal();
  const total = subtotal + delivery;

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <h1 className="confirmation-title">Thank you for your order!</h1>
        <div className="confirmation-message">
          <p className="confirmation-info">
            We have received your order and
            <br />
            are preparing it for delivery
          </p>
          <p className="delivery-time">
            Estimated delivery time:
            <br />
            20-25 minutes
          </p>
        </div>

        <hr className="line" />

        <div className="order-overview">
          <h2 className="your-order-title">Your Order:</h2>

          <div className="order-content">
            <div className="order-left">
              <div className="ordered-items-list">
                {/* Kommenterat bort tills vidare
                {orderedItems.map((item, index) => (
                <OrderedItem key={index} {...item} />
                ))}

                {/* Hårdkodade för layout, ersätts av map senare */}
                <OrderedItem
                  image={hamburgerImg}
                  name="Hamburger"
                  price="$10.99"
                />
                <OrderedItem
                  image={hamburger2Img}
                  name="Hamburger"
                  price="$8.99"
                />
                <OrderedItem
                  image={friesImg}
                  name="French Fries"
                  price="$3.29"
                />
                <OrderedItem
                  image={hamburgerImg}
                  name="Hamburger"
                  price="$9.99"
                />
              </div>

              <div className="confirmation-price">
                <div className="delivery-row">
                  <span className="summary-label">Delivery:</span>
                  <span className="summary-price">
                    ${deliveryFee.toFixed(2)}
                  </span>
                </div>
                <div className="total-row">
                  <span className="summary-label">Total:</span>
                  <span className="summary-price">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="order-right">
              <button className="back-home-btn" onClick={() => navigate("/")}>
                Back Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
