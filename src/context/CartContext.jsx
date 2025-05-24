import React, { createContext, useState, useContext } from "react";

//Skapa context
const CartContext = createContext();

//CartProvider som skickar data till alla children med cart-data
export function CartProvider({ children }) {
  //State för varukorgen, ska delas mellan komponenter
  const [cartItems, setCartItems] = useState([]);

  //Funktion för att lägga till i cart
  function addToCart(product) {
    console.log("Adding to cart:", product);

    setCartItems((prevItems) => {
      //Kolla om produkten redan finns
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        //Öka quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        //Ny produkt, lägg till med quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  }

  //Funktion för att ta bort från cart
  function removeFromCart(productId) {
    console.log("Removing från cart:", productId);

    setCartItems((prevItems) => {
      //Behåll bara items som inte matchar ID
      return prevItems.filter((item) => item.id !== productId);
    });
  }

  //Funktion för att uppdatera antal
  function updateQuantity(productId, newQuantity) {
    console.log("Updating quantity:", productId, newQuantity);

    // Minsta quantity är 1, jämför med newQuantity
    const finalQuantity = Math.max(1, newQuantity);

    //Ändrar quantity för rätt produkt
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: finalQuantity } : item
      )
    );
  }

  //Beräkna totalt antal items
  function getCartCount() {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  //Beräkna subtotal i cart
  function getSubtotal() {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  //Töm hela cart efter beställning
  function clearCart() {
    setCartItems([]);
  }

  //Alla värden som ska delas med andra components
  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartCount,
    getSubtotal,
    clearCart,
  };

  //Ge alla children tillgång till contextValue
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

//Custom hook för enkel användning av Context
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used in a CartProvider");
  }

  return context;
}

export default CartContext;
