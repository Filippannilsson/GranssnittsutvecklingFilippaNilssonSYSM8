import "../styles/OrderedItem.css";
import "../App.css";

function OrderedItem({ image, name, price }) {
  return (
    <div className="ordered-item-container">
      <img className="ordered-item-img" src={image} />
      <p className="ordered-item-name">{name}</p>
      <p className="ordered-item-price">{price}</p>
    </div>
  );
}

export default OrderedItem;
