import "../styles/CartItem.css";
import "../App.css";
import { ReactComponent as AddIcon } from "../assets/logos/add.svg";
import { ReactComponent as RemoveIcon } from "../assets/logos/remove.svg";
import { ReactComponent as CloseIcon } from "../assets/logos/close.svg";

function CartItem({ image, name, price }) {
  return (
    <div className="cart-item-container">
      <img className="cart-item-img" src={image} />
      <p className="cart-item-name">{name}</p>
      <div className="add-remove-container">
        <RemoveIcon className="remove-cart-item" />
        <p className="cart-quantity">1</p>
        <AddIcon className="add-cart-item" />
      </div>
      <p className="cart-item-price">{price}</p>
      <CloseIcon className="close-cart-item-btn" />
    </div>
  );
}

export default CartItem;
