import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPopularItems } from "../services/api";
import Hero from "../components/Hero";
import MenuItem from "../components/MenuItem";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const [popularItems, setPopularItems] = useState([]);

  //Hämta populära items
  useEffect(() => {
    console.log("Fetching popular items");

    getPopularItems()
      .then((data) => {
        console.log("Popular items fetched successfully:");
        setPopularItems(data);
      })
      .catch((error) => {
        console.error("Error fetching popular items:", error);
      });
  }, []);

  return (
    <div className="home-page">
      <Hero />
      <div className="main-content">
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
              id={item.id}
              image={item.image}
              name={item.name}
              description={item.description}
              price={`$${item.price.toFixed(2)}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
