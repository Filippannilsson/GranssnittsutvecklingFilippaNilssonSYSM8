import "../styles/MenuFilter.css";
import "../App.css";
import Searchbar from "./Searchbar";

function MenuFilter() {
  return (
    <div className="menu-filter-section">
      <h1 className="menu-title">Menu</h1>

      <div className="first-row">
        <div className="filter-bar">
          <button className="all-btn">All</button>
          <button className="starters-btn">Starters</button>
          <button className="dips-btn">Dips</button>
          <button className="main-dishes-btn">Mains</button>
          <button className="desserts-btn">Desserts</button>
          <button className="drinks-btn">Drinks</button>
        </div>

        <div className="right-controls">
          <div className="sort-container">
            <select id="sort" name="sort" defaultValue="">
              <option value="" disabled>
                Sort By
              </option>
              <option value="price">Price</option>
              <option value="name">Name</option>
            </select>
          </div>

          <button className="clear-filter-btn">Clear X</button>
        </div>
      </div>

      <div className="second-row">
        <Searchbar />
      </div>
    </div>
  );
}

export default MenuFilter;
