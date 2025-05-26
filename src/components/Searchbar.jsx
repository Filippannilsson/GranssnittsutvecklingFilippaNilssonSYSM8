import "../styles/Searchbar.css";
import "../App.css";

function Searchbar({ searchTerm, onSearchChange }) {
  return (
    <form className="searchbar">
      <input
        type="text"
        name="search"
        placeholder="Search..."
        className="search-input"
        value={searchTerm}
        onInput={(e) => onSearchChange(e.target.value)}
      />
    </form>
  );
}

export default Searchbar;
