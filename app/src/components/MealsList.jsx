import React, { useEffect, useState } from "react";
import Meal from "./Meals.jsx"; 

const MealsList = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch("http://localhost:3001/api/meals")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);  
        setMeals(data);  
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load meals:", error);
        setLoading(false);
      });
  }, []);

  
  if (loading) {
    return <p>Loading meals...</p>;
  }

  return (
    <div>
      {meals.map((meal) => (
        <Meal key={meal.id} meal={meal} />  
      ))}
    </div>
  );
};

export default MealsList;
