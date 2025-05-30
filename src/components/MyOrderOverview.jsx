import React, { useState } from "react";
import "../styles/MyOrderOverview.css";
import "../App.css";
import { ReactComponent as ArrowDropDownIcon } from "../assets/logos/arrow-drop-down.svg";

function MyOrderOverview({ orderData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  //Formatera datum i format May 29, 2025
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  //Formatera pris med $ och två decimaler
  function formatPrice(price) {
    return `$${parseFloat(price).toFixed(2)}`;
  }

  //Växla mellan expanderad/collapsed vy
  function toggleDetails() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className={`order-container ${isExpanded ? "expanded" : ""}`}>
      <div className="order-overview-container">
        <div className="overview-left-section">
          <p className="overview-ordernumber">Order #{orderData.orderNumber}</p>
          <div className="view-details-section" onClick={toggleDetails}>
            <p className="view-details">View Details</p>
            <ArrowDropDownIcon
              className={`arrow-icon ${isExpanded ? "expanded" : ""}`}
            />
          </div>
        </div>
        <div className="overview-right-section">
          <p className="overview-date">{formatDate(orderData.createdAt)}</p>
          <p className="overview-total">{formatPrice(orderData.total)}</p>
        </div>
      </div>

      <div className={`my-order-details ${isExpanded ? "show" : ""}`}>
        {orderData.items && orderData.items.length > 0 ? (
          //Loopa igenom alla items i beställningen
          orderData.items.map((item) => (
            <div key={item.id} className="product-row">
              <span className="product-name">{item.name}</span>
              <span className="product-quantity">x{item.quantity}</span>
              <span className="product-price">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))
        ) : (
          <div className="product-row">
            <span className="product-name">No items found</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrderOverview;
