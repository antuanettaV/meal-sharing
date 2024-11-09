import React from "react";

const imageMap = {
  paella: "paella.jpg",
  dumplings1: "dumplings1.jpg",
  dumplings2: "dumplings2.jpg",
};

const Meal = ({ meal }) => {
    const mealImage = `/images/${imageMap[meal.name] || "paella.jpg"}`;

  return (
    <div className="card">
      <img
        src={mealImage}
        alt={meal.name}
        style={{ width: "100%", height: "auto" }}
      />
      <h3>{meal.name}</h3>
      <p className="description">{meal.description}</p>
      <p className="price">${meal.price}</p>
    </div>
  );
};

export default Meal;
