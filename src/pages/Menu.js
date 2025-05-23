import React, { useState, useEffect } from "react";
import "../styles/Menu.css";
import "../App.css";
import MenuFilter from "../components/MenuFilter";
import MenuItem from "../components/MenuItem";
import { getMenu } from "../services/api";
import example from "../assets/pictures/example.jpg";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching menu...");

    getMenu()
      .then((data) => {
        console.log("Menu fetched successfully:", data.length, "items");
        setMenu(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  //Visa loading meddelande
  if (loading) {
    return (
      <div className="menu-page">
        <main>
          <p>Loading menu...</p>
        </main>
      </div>
    );
  }

  //Visa om något går fel
  if (error) {
    return (
      <div className="menu-page">
        <main>
          <p>Error loading menu: {error}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="menu-page">
      <main>
        <MenuFilter />
        <div className="menu-items">
          {menu.map((menu) => (
            <MenuItem
              key={menu.id}
              image={menu.image || example} // Använd en standardbild om ingen bild finns
              name={menu.name}
              description={menu.description}
              price={`$${menu.price.toFixed(2)}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Menu;
