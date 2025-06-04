import "../styles/MenuFilter.css";
import Searchbar from "./Searchbar";

function MenuFilter({
  onCategoryChange,
  selectedCategory,
  searchTerm,
  onSearchChange,
}) {
  //Kategorier som en array
  const categories = [
    { id: "all", label: "All" },
    { id: "starters", label: "Starters" },
    { id: "dips", label: "Dips" },
    { id: "mains", label: "Mains" },
    { id: "desserts", label: "Desserts" },
    { id: "drinks", label: "Drinks" },
    { id: "favorites", label: "Favorites" },
  ];

  return (
    <div className="menu-filter-section">
      <h1 className="menu-title">Menu</h1>

      <div className="first-row">
        <div className="filter-bar">
          <div className="filter-bar-btns">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${category.id}-btn ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => onCategoryChange(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="second-row">
        <Searchbar searchTerm={searchTerm} onSearchChange={onSearchChange} />
        <div className="clear-section">
          <button
            className="clear-filter-btn"
            onClick={() => {
              onCategoryChange("all");
              onSearchChange("");
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuFilter;
