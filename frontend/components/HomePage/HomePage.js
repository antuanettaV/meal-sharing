"use client";
import React from 'react';
import MealsList from "../../components/MealsList/MealsList";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to Our Meal Sharing Site</h1>
      <MealsList />
    </div>
  );
};

export default HomePage;
