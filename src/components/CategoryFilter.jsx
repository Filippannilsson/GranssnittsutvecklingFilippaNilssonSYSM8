import "../styles/CategoryFilter.css";
import "../App.css";
import Searchbar from "./Searchbar";

function CategoryFilter() {
  return (
    <div className="menu-filter-section">
      <h1 className="menu-title">Menu</h1>
      <div className="filter-bar">
        <button className="all-btn">All</button>
        <button className="starters-btn">Starters</button>
        <button className="main-dishes-btn">Main Dishes</button>
        <button className="desserts-btn">Desserts</button>
        <button className="drinks-btn">Drinks</button>
      </div>
      <div className="filter-controls">
        <div className="left-controls">
          <Searchbar />
          <button className="clear-filter-btn">Clear X</button>
        </div>
        <div className="sort-container">
          <select id="sort" name="sort">
            <option value="" disabled selected>
              Sort
            </option>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
