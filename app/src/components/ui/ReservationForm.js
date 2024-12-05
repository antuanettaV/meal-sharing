import React, { useState } from "react";
import styles from "./ReservationForm.module.css";

const ReservationForm = ({ mealId, onClose }) => {
  const [formData, setFormData] = useState({
    number_of_guests: "",
    contact_name: "",
    contact_email: "",
    contact_phonenumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, meal_id: mealId }),
      });

      if (response.ok) {
        alert("Reservation created successfully!");
        onClose(); 
      } else {
        alert("Failed to create reservation.");
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.formContainer}>
        <h2>Reserve a Meal</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Number of Guests:
            <input
              type="number"
              name="number_of_guests"
              value={formData.number_of_guests}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Your Name:
            <input
              type="text"
              name="contact_name"
              value={formData.contact_name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Your Email:
            <input
              type="email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              name="contact_phonenumber"
              value={formData.contact_phonenumber}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Submit Reservation</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;
