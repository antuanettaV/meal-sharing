import React, { useState, useEffect } from "react";
import { Link } from "next/link";

const MealsPage = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch("/api/meals");
      const data = await response.json();
      setMeals(data);
    };
    fetchMeals();
  }, []);

  return (
    <div>
      <h1>All Meals</h1>
      <div>
        {meals.map((meal) => (
          <div key={meal.id}>
            <h3>{meal.title}</h3>
            <Link href={`/meals/${meal.id}`}>View Meal Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealsPage;