// components/SearchBar.js
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query); // This will trigger the search function passed from ProductsPage or Home
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "5px",
          width: "100%",      // Full width on mobile
          maxWidth: "400px",  // Max width for larger screens
          margin: "0 auto",  // Center align
        }}
      />
      <button type="submit" style={{ marginTop: "10px", padding: "10px" }}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
