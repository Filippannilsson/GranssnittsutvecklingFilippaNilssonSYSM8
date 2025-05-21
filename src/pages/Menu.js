import "../styles/Menu.css";
import "../App.css";
import MenuFilter from "../components/MenuFilter";
import MenuItem from "../components/MenuItem";
import hamburgerImg from "../assets/pictures/hamburger1.png";
import hamburger2Img from "../assets/pictures/hamburger2.png";
import friesImg from "../assets/pictures/frenchfries.png";

function Menu() {
  return (
    <div className="menu-page">
      <main>
        <MenuFilter />
        <div className="menu-items">
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

          <MenuItem
            image={hamburgerImg}
            name="Hamburger"
            description="Juicy grilled burger"
            price="$8.99"
          />

          <MenuItem
            image={hamburger2Img}
            name="Hamburger"
            description="Juicy grilled burger"
            price="$10.99"
          />

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
        </div>
      </main>
    </div>
  );
}

export default Menu;
