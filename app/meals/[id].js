import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReservationForm from './ReservationForm';

const MealDetails = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); 

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await fetch(`/api/meals/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch meal details');
        }
        const data = await response.json();
        setMeal(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching meal details:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!meal) return <p>Meal not found.</p>;

  return (
    <div>
      <h1>{meal.title}</h1>
      <p>{meal.description}</p>
      <p>Price: ${meal.price}</p>
      <p>Available Seats: {meal.availableSeats}</p>
      
      {meal.availableSeats > 0 ? (
        <>
          {!showForm ? (
            <button onClick={() => setShowForm(true)}>Reserve</button>
          ) : (
            <ReservationForm mealId={id} />
          )}
        </>
      ) : (
        <p>No seats available for this meal.</p>
      )}
    </div>
  );
};

export default MealDetails;
