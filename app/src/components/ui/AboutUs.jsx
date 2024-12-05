import React from 'react';
import styles from './AboutUs.module.css'; 

const AboutUs = () => {
  return (
    <div className={styles.aboutUsPage}>
      <div className={styles.aboutUsBanner}>
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/046/785/118/small_2x/cozy-kitchen-scene-with-two-people-actively-cooking-and-preparing-food-photo.jpg"
          alt="Meal Sharing Banner"
          className={styles.bannerImage}
        />
      </div>
      <div className={styles.aboutUsContent}>
        <h1>About Us</h1>
        <p>
          Welcome to Meal Sharing! We are passionate about bringing people together
          over delicious homemade meals. Whether you're looking to share your favorite
          dish or try something new, Meal Sharing connects you with a community of food
          lovers who are eager to exchange great food and experiences.
        </p>
        <p>
          Our mission is to make meal-sharing easy and enjoyable for everyone. Join us today
          and start exploring the joy of sharing meals with others!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
