import React, { useState } from "react";
import "../styles/MyOrderOverview.css";
import "../App.css";
import { ReactComponent as ArrowDropDownIcon } from "../assets/logos/arrow-drop-down.svg";

function OrderOverview() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Hårdkodad data för testning
  const orderData = {
    id: "DD-123456",
    date: "May 27, 2025",
    total: "19.50",
    products: [
      { id: 1, name: "Cheeseburger", quantity: 1, price: "10.50" },
      { id: 2, name: "Milkshake", quantity: 2, price: "9.00" },
    ],
  };

  function toggleDetails() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className={`order-container ${isExpanded ? "expanded" : ""}`}>
      <div className="order-overview-container">
        <div className="overview-left-section">
          <p className="overview-ordernumber">Order #{orderData.id}</p>
          <div className="view-details-section" onClick={toggleDetails}>
            <p className="view-details">View Details</p>
            <ArrowDropDownIcon
              style={{
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            />
          </div>
        </div>
        <div className="overview-right-section">
          <p className="overview-date">{orderData.date}</p>
          <p className="overview-total">{orderData.total}</p>
        </div>
      </div>

      <div className={`my-order-details ${isExpanded ? "show" : ""}`}>
        {orderData.products.map((product) => (
          <div key={product.id} className="product-row">
            <span className="product-name">{product.name}</span>
            <span className="product-quantity">x{product.quantity}</span>
            <span className="product-price">${product.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderOverview;
