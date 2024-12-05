import React from "react";
import Banner from "./Banner";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const dishes = [
    {
      title: "Borscht",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX_qnIW3n5Cu3jMRmRH4rzosLMLmU4p86ahw&s",
      price: 40.0,
      discount: 10.0,
    },
    {
      title: "Fig Pizza with Goat Cheese",
      image: "https://www.eatbanza.com/cdn/shop/articles/JCEUmNIQ_1200x1200.jpg?v=1611776117",
      price: 29.99,
      discount: 10.0,
    },
    {
      title: "Mango Cheesecake",
      image: "https://sinfullyspicy.com/wp-content/uploads/2023/07/4.jpg",
      price: 29.99,
      discount: 10.0,
    },
    {
      title: "Spaghetti Carbonara",
      image: "https://moribyan.com/wp-content/uploads/2024/08/IMG_0934.jpg",
      price: 30.0,
      discount: 10.0,
    },
  ];

    const calculateDiscountedPrice = (price, discount) => {
    return (price - (price * discount) / 100).toFixed(2);
  };

  return (
    <div>
      <Banner
        imageUrl="https://www.heartandstroke.ca/-/media/images/articles/feb_getty_1159179644_1920x1080.webp?rev=5f6f616120f943d1a92b4540c14aec0f"
        altText="Home Page Banner"
      />
      <div className={styles.homeContent}>
        <h2>Explore Our Latest Offers</h2>
        <p>Check out our latest deals and promotions...</p>

        <div className={styles.dishesContainer}>
          {dishes.map((dish, index) => (
            <div key={index} className={styles.card}>
              <img
                src={dish.image}
                alt={dish.title}
                className={styles.cardImage}
              />
              <div className={styles.cardContent}>
                <h4>{dish.title}</h4>
                <p className={styles.price}>
                  Original: ${dish.price.toFixed(2)}{" "}
                  <span className={styles.discountPrice}>
                    Discounted: ${calculateDiscountedPrice(dish.price, dish.discount)}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
