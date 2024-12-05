import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./ReviewsList.module.css";

const ReviewsList = ({ mealId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/reviews/meals/${mealId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [mealId]);

  return (
    <div className={styles.reviewsList}>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p className={styles.reviewsEmptyMessage}>No reviews available for this meal yet.</p>
      ) : (
        reviews.map((review, index) => (
          <div key={index} className={styles.review}>
            <p>Rating: {"⭐".repeat(review.rating)}</p>
            <p>Comment: {review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

ReviewsList.propTypes = {
  mealId: PropTypes.number.isRequired,
};

export default ReviewsList;
