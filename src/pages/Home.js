import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPopularItems } from "../services/api";
import "../styles/Home.css";
import "../App.css";
import Hero from "../components/Hero";
import MenuItem from "../components/MenuItem";
import example from "../assets/pictures/example.jpg";

function Home() {
  const navigate = useNavigate();
  const [popularItems, setPopularItems] = useState([]);

  useEffect(() => {
    console.log("Fetching popular items");

    getPopularItems()
      .then((data) => {
        console.log(
          "Popular items fetched successfully:",
          data.length,
          "items"
        );
        setPopularItems(data);
      })
      .catch((error) => {
        console.error("Error fetching popular items:", error);
      });
  }, []);

  return (
    <div className="home-page">
      <Hero />
      <main className="main-content">
        <div className="text-and-button">
          <h1 className="popular-title">Popular</h1>
          <button className="menu-btn" onClick={() => navigate("/menu")}>
            Menu
          </button>
        </div>
        <div className="popular-cards">
          {popularItems.map((item) => (
            <MenuItem
              key={item.id}
              image={item.image || example}
              name={item.name}
              description={item.description}
              price={`$${item.price.toFixed(2)}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
export default Home;
