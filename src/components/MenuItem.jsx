import "../styles/MenuItem.css";
import { ReactComponent as NotFavoriteIcon } from "../assets/logos/not-favorite.svg";
import { ReactComponent as FavoriteIcon } from "../assets/logos/is-favorite.svg";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

function MenuItem({ id, image, name, description, price }) {
  //Tillgång till cart-funktion via context
  const { addToCart } = useCart();

  //Tillgång till favorite-funktion via context
  const { toggleFavorite, isFavorite } = useFavorites();

  //Funktion för att hantera klick på add-knapp
  function handleAddToCart() {
    console.log("Id from props:", id);
    const product = {
      id,
      name,
      description,
      price: parseFloat(price.replace("$", "")), //Tar bort $ och gör om till nummer
      image,
    };

    addToCart(product);
    console.log(`Added ${name} to cart`);
  }

  //Funktion för att hantera favorit-markering
  function handleToggleFavorite(e) {
    e.preventDefault();

    const product = {
      id,
      name,
      description,
      price: parseFloat(price.replace("$", "")),
      image,
    };

    //Toggle favorite
    const isNowFavorite = toggleFavorite(product);
    console.log(
      `${isNowFavorite ? "Added to" : "Removed from"} favorites: ${name}`
    );
  }

  //Kontrollera om produkt är favoritmarkerad för att visa rätt hjärt-ikon
  const productIsFavorite = isFavorite(id);

  return (
    <div className="product-card">
      <div className="favorite-heart" onClick={handleToggleFavorite}>
        {productIsFavorite ? (
          <FavoriteIcon className="favorite-logo favorite" />
        ) : (
          <NotFavoriteIcon className="favorite-logo not-favorite" />
        )}
      </div>
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
