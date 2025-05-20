import "../styles/MenuItem.css";
import "../App.css";

function MenuItem({ image, name, description, price }) {
  return (
    <div className="product-card">
      <img className="dish-image" src={image} alt="Hamburger" />

      <div className="product-info">
        <div className="row">
          <div className="dish-name">{name}</div>
          <div className="price">{price}</div>
        </div>
        <div className="row">
          <div className="description">{description}</div>
          <button className="add-button">Add</button>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
