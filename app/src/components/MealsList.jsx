import React, { useEffect, useState } from "react";
import Meal from "./Meals.jsx";  // Import the Meal component

const MealsList = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch meals from API or any data source
  useEffect(() => {
    fetch("http://localhost:3001/api/meals")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);  // Log the data to check the meal names
        setMeals(data);  // Assuming API returns an array of meals
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load meals:", error);
        setLoading(false);
      });
  }, []);

  // If data is loading, show a loading message
  if (loading) {
    return <p>Loading meals...</p>;
  }

  return (
    <div>
      {meals.map((meal) => (
        <Meal key={meal.id} meal={meal} />  // Pass each meal to the Meal component
      ))}
    </div>
  );
};

export default MealsList;
