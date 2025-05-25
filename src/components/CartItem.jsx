import "../styles/CartItem.css";
import "../App.css";
import { ReactComponent as AddIcon } from "../assets/logos/add.svg";
import { ReactComponent as RemoveIcon } from "../assets/logos/remove.svg";
import { ReactComponent as CloseIcon } from "../assets/logos/close.svg";
import { useCart } from "../context/CartContext";
import example from "../assets/pictures/example.jpg";

function CartItem({ id, image, name, price, quantity }) {
  const { updateQuantity, removeFromCart } = useCart();

  function handleIncrease() {
    updateQuantity(id, quantity + 1);
  }

  function handleDecrease() {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  }

  function handleRemove() {
    removeFromCart(id);
  }

  return (
    <div className="cart-item-container">
      <img className="cart-item-img" src={image || example} alt={name} />
      <p className="cart-item-name">{name}</p>
      <div className="add-remove-container">
        <RemoveIcon className="remove-cart-item" onClick={handleDecrease} />
        <p className="cart-quantity">{quantity}</p>
        <AddIcon className="add-cart-item" onClick={handleIncrease} />
      </div>
      <p className="cart-item-price">${(price * quantity).toFixed(2)}</p>
      <CloseIcon className="close-cart-item-btn" onClick={handleRemove} />
    </div>
  );
}

export default CartItem;
