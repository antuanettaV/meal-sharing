import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ rating }) => {
  const maxStars = 5;
  const filledStars = Math.round(rating);
  const emptyStars = maxStars - filledStars;

  return (
    <div>
      {Array(filledStars).fill('★').join('')}
      {Array(emptyStars).fill('☆').join('')}
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Rating;
