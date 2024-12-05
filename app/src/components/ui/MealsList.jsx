import React, { useEffect, useState } from "react";
import Meal from "./Meals";
import styles from "./MealList.module.css";

const MealsList = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("none");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      try {
                const mealsResponse = await fetch("http://localhost:3001/api/meals");
        if (!mealsResponse.ok) {
          throw new Error(`HTTP error! status: ${mealsResponse.status}`);
        }
        const mealsData = await mealsResponse.json();

                const reviewsResponse = await fetch("http://localhost:3001/api/reviews");
        if (!reviewsResponse.ok) {
          throw new Error(`HTTP error! status: ${reviewsResponse.status}`);
        }
        const reviewsData = await reviewsResponse.json();

                const mealsWithReviews = mealsData.map((meal) => {
          const mealReviews = reviewsData.filter((review) => review.meal_id === meal.id);
          return { ...meal, reviews: mealReviews };
        });

        setMeals(mealsWithReviews);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load meals or reviews:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const handleSort = (option) => {
    setSortOption(option);
    let sortedMeals = [...meals];

    switch (option) {
      case "titleAsc":
        sortedMeals.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "titleDesc":
        sortedMeals.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "priceAsc":
        sortedMeals.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "priceDesc":
        sortedMeals.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      default:
        break;
    }

    setMeals(sortedMeals);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredMeals = meals.filter((meal) =>
    meal.title.toLowerCase().includes(searchQuery)
  );

  if (loading) {
    return <p>Loading meals...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (filteredMeals.length === 0) {
    return <p>No meals available right now.</p>;
  }

  return (
    <div>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search meal by name"
          onChange={(e) => handleSearch(e.target.value)}
          className={styles.searchBox}
        />
        <div className={styles.sortOptions}>
          <button className={styles.btnSearch} onClick={() => handleSort("titleAsc")}>Sort by Title (Asc)</button>
          <button className={styles.btnSearch} onClick={() => handleSort("titleDesc")}>Sort by Title (Desc)</button>
          <button className={styles.btnSearch} onClick={() => handleSort("priceAsc")}>Sort by Price (Asc)</button>
          <button className={styles.btnSearch} onClick={() => handleSort("priceDesc")}>Sort by Price (Desc)</button>
        </div>
      </div>
      <h2 className={styles.heading}>Explore Our Delicious Meals</h2>
      <div className={styles.mealsGrid}>
        {filteredMeals.map((meal) => (
          <Meal key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default MealsList;

