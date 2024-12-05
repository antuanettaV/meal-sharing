import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./MealDetail.module.css";

const MealDetail = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [formData, setFormData] = useState({
    contact_name: "",
    contact_email: "",
    contact_phonenumber: "",
    number_of_guests: 1,
  });
  const [reviewData, setReviewData] = useState({
    title: "",
    description: "",
    meal_id: parseInt(id, 10),
    stars: 5,
  });
  const [error, setError] = useState(null);
  const [reservationSuccessMessage, setReservationSuccessMessage] = useState(null);
  const [reviewSuccessMessage, setReviewSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/meals/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch meal data");
        }
        const data = await response.json();
        setMeal(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMeal();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleReservation = async (e) => {
    e.preventDefault();
    setError(null);
    setReservationSuccessMessage(null);
    try {
      const response = await fetch(`http://localhost:3001/api/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meal_id: parseInt(id),
          ...formData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to make a reservation");
      }

      setReservationSuccessMessage("Reservation successful!");
      setFormData({
        contact_name: "",
        contact_email: "",
        contact_phonenumber: "",
        number_of_guests: 1,
      });

            setMeal((prevMeal) => ({
        ...prevMeal,
        max_reservations: prevMeal.max_reservations - formData.number_of_guests,
      }));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setReviewSuccessMessage(null);
    try {
      const response = await fetch("http://localhost:3001/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...reviewData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit review");
      }

      setReviewSuccessMessage("Review submitted successfully!");
      setReviewData({
        title: "",
        description: "",
        meal_id: parseInt(id, 10),
        stars: 5,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <p className={styles.errorMessage}>Error: {error}</p>;
  }

  if (!meal) {
    return <p>Loading meal details...</p>;
  }

  return (
    <div className={styles.mealDetail}>
      <h1>{meal.title}</h1>
      <img src={meal.image_url || "/images/default.jpg"} alt={meal.title} />
      <p>{meal.description}</p>
      <p>Price: ${meal.price}</p>
      <p>Location: {meal.location}</p>
      <p>Available Reservations: {meal.max_reservations}</p>

      {meal.max_reservations > 0 ? (
        <form className={styles.reservationForm} onSubmit={handleReservation}>
          <h3>Make a Reservation</h3>
          <input
            type="text"
            name="contact_name"
            placeholder="Name"
            value={formData.contact_name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="contact_email"
            placeholder="Email"
            value={formData.contact_email}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="contact_phonenumber"
            placeholder="Phone Number"
            value={formData.contact_phonenumber}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="number_of_guests"
            placeholder="Number of Guests"
            value={formData.number_of_guests}
            onChange={handleInputChange}
            min="1"
            required
          />
          <button type="submit">Book Seat</button>
        </form>
      ) : (
        <p>No available reservations for this meal.</p>
      )}

      {reservationSuccessMessage && (
        <p className={styles.successMessage}>{reservationSuccessMessage}</p>
      )}

      <form className={styles.reviewForm} onSubmit={handleReviewSubmit}>
        <h3>Leave a Review</h3>
        <input
          type="text"
          name="title"
          placeholder="Review Title"
          value={reviewData.title}
          onChange={handleReviewInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Your Review"
          value={reviewData.description}
          onChange={handleReviewInputChange}
          required
        />
        <select
          name="stars"
          value={reviewData.stars}
          onChange={handleReviewInputChange}
        >
          <option value={5}>5 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={2}>2 Stars</option>
          <option value={1}>1 Star</option>
        </select>
        <button type="submit">Submit Review</button>
      </form>

      {reviewSuccessMessage && (
        <p className={styles.successMessage}>{reviewSuccessMessage}</p>
      )}
    </div>
  );
};

export default MealDetail;
