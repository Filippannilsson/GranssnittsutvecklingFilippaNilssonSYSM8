import "../styles/Hero.css";
import "../App.css";
import heroImage from "../assets/pictures/hero-image.jpg";

function Hero() {
  return (
    <div className="hero">
      <section className="slogan-container">
        <div className="slogan-box" />
        <div className="slogan-text">
          <h1 className="hero-tagline">
            Food from the sky
            <br />
            straight to your
            <br />
            door
          </h1>

          <ul className="core-values">
            <li>Speed</li>
            <li>Flavour</li>
            <li>Innovation</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Hero;
