import React, { useState } from "react";
import styles from "./Meals.module.css";

const MealSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchQuery.trim()); 
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search for meals..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button className={styles.searchButton} onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
};

export default MealSearch;
