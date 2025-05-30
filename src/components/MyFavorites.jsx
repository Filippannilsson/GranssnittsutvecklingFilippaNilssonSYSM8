import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import MenuItem from "./MenuItem";
import "../styles/MyFavorites.css";

function MyFavorites() {
  const { favorites } = useFavorites();

  return (
    <div className="favorites-section">
      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((favorite) => (
            <MenuItem
              key={favorite.id}
              id={favorite.id}
              image={favorite.image}
              name={favorite.name}
              description={favorite.description}
              price={`$${favorite.price.toFixed(2)}`}
            />
          ))}
        </div>
      ) : (
        <div className="no-favorites">
          <p>You haven't added any favorites yet</p>
        </div>
      )}
    </div>
  );
}

export default MyFavorites;
