import React from "react";
import PropTypes from "prop-types";
import styles from "./Banner.module.css";

const Banner = ({ imageUrl, altText }) => {
  return (
    <div className={styles.bannerContainer}>
      <img
        src={imageUrl}
        alt={altText}
        className={styles.bannerImage}
      />
      <div className={styles.bannerText}>
        </div>
    </div>
  );
};

Banner.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};

export default Banner;
