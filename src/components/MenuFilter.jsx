import "../styles/MenuFilter.css";
import "../App.css";
import Searchbar from "./Searchbar";

function MenuFilter({
  onCategoryChange,
  selectedCategory,
  searchTerm,
  onSearchChange,
}) {
  //Funktion för att hantera kategoriklick
  const handleCategoryClick = (category) => {
    onCategoryChange(category);
  };

  return (
    <div className="menu-filter-section">
      <h1 className="menu-title">Menu</h1>

      <div className="first-row">
        <div className="filter-bar">
          <button
            className={
              selectedCategory === "all" ? "all-btn active" : "all-btn"
            }
            onClick={() => handleCategoryClick("all")}
          >
            All
          </button>
          <button
            className={
              selectedCategory === "starters"
                ? "starters-btn active"
                : "starters-btn"
            }
            onClick={() => handleCategoryClick("starters")}
          >
            Starters
          </button>
          <button
            className={
              selectedCategory === "dips" ? "dips-btn active" : "dips-btn"
            }
            onClick={() => handleCategoryClick("dips")}
          >
            Dips
          </button>
          <button
            className={
              selectedCategory === "mains" ? "mains-btn active" : "mains-btn"
            }
            onClick={() => handleCategoryClick("mains")}
          >
            Mains
          </button>
          <button
            className={
              selectedCategory === "desserts"
                ? "desserts-btn active"
                : "desserts-btn"
            }
            onClick={() => handleCategoryClick("desserts")}
          >
            Desserts
          </button>
          <button
            className={
              selectedCategory === "drinks" ? "drinks-btn active" : "drinks-btn"
            }
            onClick={() => handleCategoryClick("drinks")}
          >
            Drinks
          </button>
        </div>

        <div className="right-controls">
          {/* <div className="sort-container">
            <select id="sort" name="sort" defaultValue="">
              <option value="" disabled>
                Sort By
              </option>
              <option value="price">Price</option>
              <option value="name">Name</option>
            </select>
          </div> */}

          <button
            className="clear-filter-btn"
            onClick={() => handleCategoryClick("all")}
          >
            Clear X
          </button>
        </div>
      </div>

      <div className="second-row">
        <Searchbar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      </div>
    </div>
  );
}

export default MenuFilter;
