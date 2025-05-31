import { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "./UserContext";

//Skapa context
const FavoritesContext = createContext();

//FavoritesProvider som skickar data till alla children med favorit-data
export function FavoritesProvider({ children }) {
  const { user, isLoggedIn } = useUser();
  //State för favoriter, tom array från början
  const [favorites, setFavorites] = useState([]);
  //State för att hålla koll på om data är laddad
  const [isLoaded, setIsLoaded] = useState(false);

  //Funktion för vilken localStorage som ska användas
  function getStorageKey() {
    //Egen nyckel till användare
    if (isLoggedIn() && user?.id) {
      return `droneDelightsFavorites_${user.id}`;
      //Gemensam nyckel till gäster
    } else {
      return "droneDelightsFavorites_guest";
    }
  }

  //Ladda favoriter från localStorage
  useEffect(() => {
    try {
      //Hämtar rätt nyckel
      const storageKey = getStorageKey();
      //Hämtar sparade favoriter
      const savedFavorites = localStorage.getItem(storageKey);
      setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error loading favorites", error);
      setFavorites([]);
      setIsLoaded(true);
    }
  }, [user, isLoggedIn]); //Körs när user eller isLoggedin ändras

  //Spara favoriter till localStorage när de ändras
  useEffect(() => {
    if (isLoaded) {
      try {
        const storageKey = getStorageKey();
        localStorage.setItem(storageKey, JSON.stringify(favorites));
      } catch (error) {
        console.error("Error saving favorites", error);
      }
    }
  }, [favorites, user, isLoggedIn, isLoaded]);

  //Lägg till favorit
  function addToFavorites(product) {
    setFavorites((prev) => {
      //Kontrollera om produkten redan finns i favoriter
      const exists = prev.some((item) => item.id === product.id);
      //Returnera samma array om den redan finns, annars läggs den till med spread-operator
      return exists ? prev : [...prev, { ...product }];
    });
  }

  //Ta bort favorit
  function removeFromFavorites(productId) {
    //Skapar ny array med items som inte matchar productId
    setFavorites((prev) => prev.filter((item) => item.id !== productId));
  }

  //Toggle favorit
  function toggleFavorite(product) {
    //Kontrollera om produkten är favorit
    const isFav = favorites.some((item) => item.id === product.id);
    if (isFav) {
      //Om favorit, ta bort
      removeFromFavorites(product.id);
      return false;
    } else {
      //Om inte favorit, lägg till
      addToFavorites(product);
      return true;
    }
  }

  //Kontrollera om specifik produkt är favorit för att visa rätt hjärt-ikon
  function isFavorite(productId) {
    //True om minst ett element uppfyller villkoret
    return favorites.some((item) => item.id === productId);
  }

  //Ta bort alla favoriter
  function clearAllFavorites() {
    setFavorites([]);
    console.log("All favorites cleared");
  }

  //Alla värden som ska delas med andra components
  const contextValue = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearAllFavorites,
  };

  //Ge alla children tillgång till contextValue
  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}

//Custom hook för att använda context
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

export default FavoritesContext;
