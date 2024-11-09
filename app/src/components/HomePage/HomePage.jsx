import React from "react";
import hyfLogo from "../../assets/hyf.svg";
import styles from "./HomePage.module.css";
import MealsList from "../MealsList";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to Our Meal Sharing Site</h1>
      <MealsList />
    </div>
  );
};

export default HomePage;
