import "../styles/MenuItem.css";
import "../App.css";
import React from "react";
import { useCart } from "../context/CartContext";

function MenuItem({ id, image, name, description, price }) {
  //Tillgång till cart-funktion via context
  const { addToCart } = useCart();

  //Funktion för att hantera klick på add-knapp
  function handleAddToCart() {
    console.log("Id from props:", id);
    const product = {
      id,
      name,
      description,
      price: parseFloat(price.replace("$", "")), //Ta bort $ och gör om till nummer
    };

    addToCart(product);
    console.log(`Added ${name} to cart`);
  }

  return (
    <div className="product-card">
      <img className="dish-image" src={image} alt={name} />

      <div className="product-info">
        <div className="row">
          <div className="dish-name">{name}</div>
          <div className="price">{price}</div>
        </div>
        <div className="row">
          <div className="description">{description}</div>
          <button className="add-button" onClick={handleAddToCart}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
