import React, { useState } from "react";

const ReviewForm = ({ mealId }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stars: 5,
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meal_id: mealId,
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      setSuccessMessage("Review submitted successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h3>Leave a Review</h3>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        ></textarea>
        <select
          name="stars"
          value={formData.stars}
          onChange={handleInputChange}
          required
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star} Star{star > 1 ? "s" : ""}
            </option>
          ))}
        </select>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
