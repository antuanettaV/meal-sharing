"use client";
import React, { useEffect, useState } from 'react';
import Meal from './Meal';  
import styles from './MealList.module.css';

const MealsList = () => {
  const [meals, setMeals] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('http://localhost:5000/all-meals');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMeals(data);
      } catch (error) {
        console.error('Error fetching meals:', error);
        setError('Failed to load meals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (loading) {
    return <p>Loading meals...</p>; 
  }

  if (error) {
    return <p>{error}</p>; 
  }

  return (
    <div className={styles.mealsGrid}>  
      <h2>Meals</h2>
      {meals.map((meal) => (
        <Meal key={meal.id} meal={meal} />  
      ))}
    </div>
  );
};

export default MealsList;
