import "../styles/Searchbar.css";
import "../App.css";

function Searchbar() {
  return (
    <form className="searchbar">
      <input
        type="text"
        name="search"
        placeholder="Search..."
        className="search-input"
        // onInput={}
      />
    </form>
  );
}

export default Searchbar;
