import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import "../App.css";
import Hero from "../components/Hero";
import MenuItem from "../components/MenuItem";
import hamburgerImg from "../assets/pictures/hamburger1.png";
import hamburger2Img from "../assets/pictures/hamburger2.png";
import friesImg from "../assets/pictures/frenchfries.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <Hero />
      <div className="main-content">
        <div className="text-and-button">
          <h1 className="popular-title">Popular</h1>
          <button className="menu-btn" onClick={() => navigate("/menu")}>
            Go To Menu
          </button>
        </div>
        <div className="popular-cards">
          <MenuItem
            image={hamburgerImg}
            name="Hamburger"
            description="Juicy grilled burger"
            price="$8.99"
          />
          <MenuItem
            image={friesImg}
            name="French Fries"
            description="Cripsy potatoe fries"
            price="$3.29"
          />

          <MenuItem
            image={hamburger2Img}
            name="Hamburger"
            description="Juicy grilled burger"
            price="$10.99"
          />
        </div>
      </div>
    </div>
  );
}
export default Home;
