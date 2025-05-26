import React, { useState, useEffect } from "react";
import "../styles/Menu.css";
import "../App.css";
import MenuFilter from "../components/MenuFilter";
import MenuItem from "../components/MenuItem";
import { getMenu, getMenuByCategory } from "../services/api";
import ScrollToTop from "../components/ScrollToTop";
import example from "../assets/pictures/example.jpg";

function Menu() {
  const [allMenuItems, setAllMenuItem] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  //Funktion för att hämta meny baserat på kategori
  function fetchMenuItems(category = "all") {
    if (category === "all") {
      getMenu()
        .then((data) => {
          console.log("Menu fetched successfully:", data.length, "items");
          setAllMenuItem(data);
          setMenuItems(data);
        })
        .catch((error) => {
          console.error("Error fetching menu:", error);
        });
    } else {
      getMenuByCategory(category)
        .then((data) => {
          console.log(`Category ${category} fetched:`, data.length, "items");
          setAllMenuItem(data);
          setMenuItems(data);
        })
        .catch((error) => {
          console.error(`Error fetching category ${category}:`, error);
        });
    }
  }

  //Filtrera baserat på sökning
  useEffect(() => {
    if (searchTerm === "") {
      setMenuItems(allMenuItems);
    } else {
      const filtered = allMenuItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setMenuItems(filtered);
    }
  }, [searchTerm, allMenuItems]);

  useEffect(() => {
    console.log("Fetching menu");
    fetchMenuItems(); //Hämta alla items från början
  }, []);

  //Funktion som MenuFilter anropar när kategori väljs
  function handleCategoryChange(category) {
    setSelectedCategory(category);
    setSearchTerm("");
    fetchMenuItems(category);
  }

  //Funktion för att hantera sökning
  function handleSearchChange(newSearchTerm) {
    setSearchTerm(newSearchTerm);
  }

  return (
    <div className="menu-page">
      <main>
        <MenuFilter
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        <div className="menu-items">
          {menuItems.length > 0 ? (
            menuItems.map((menu) => (
              <MenuItem
                key={menu.id}
                id={menu.id}
                image={menu.image || example} // Använd en standardbild om ingen bild finns
                name={menu.name}
                description={menu.description}
                price={`$${menu.price.toFixed(2)}`}
              />
            ))
          ) : (
            <p className="no-search-results">No matching items found</p>
          )}
        </div>
      </main>
      <ScrollToTop showButton={true} />
    </div>
  );
}

export default Menu;
