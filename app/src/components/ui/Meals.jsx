
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Meals.module.css";

const Meal = ({ meal }) => {
  const {
    id,
    image_url,
    title,
    description,
    price,
    location,
    max_reservations,
    reviews,
  } = meal;
  const mealImage = image_url || "/images/default.jpg";
  const formattedPrice = parseFloat(price) || 0;

  return (
    <div className={styles.mealsContainer}>
      <div className={styles.card}>
        <h3 className={styles.title}>{title}</h3>
        <img src={mealImage} alt={title} className={styles.mealImage} />
        <div className={styles.content}>
          <p className={styles.description}>{description}</p>
          <p className={styles.price}>
            ${isNaN(formattedPrice) ? "N/A" : formattedPrice.toFixed(2)}
          </p>
          <p className={styles.location}>Location: {location}</p>
          <p className={styles.reservations}>
            Max Reservations: {max_reservations}
          </p>

          <div className={styles.reviewsSection}>
            {reviews && reviews.length > 0 ? (
              <ul>
                {reviews.map((review, index) => (
                  <li key={index}>
                    <strong>{review.reviewer_name}</strong> {review.comment}
                    <div className={styles.rating}>
                      <span className={styles.ratingLabel}>Rating:</span>{" "}
                      {Array(review.rating).fill("★★★★★").join("")}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
        <Link to={`/meals/${id}`} className={styles.cardLink}>
          <button className={styles.reserveButton}>Reserve</button>
        </Link>
      </div>
    </div>
  );
};

Meal.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image_url: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    location: PropTypes.string,
    max_reservations: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        reviewer_name: PropTypes.string,
        comment: PropTypes.string,
        rating: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
};

export default Meal;
