import React from 'react';
import SocialMediaItem from './SocialMediaItem';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
  <div className={styles['footer-text']}>
    <p>&copy; 2024 Meal-Sharing. All rights reserved.</p>
  </div>
  <div className={styles['footer-icons']}>
    <ul className={styles.footerList}>
      <li>
        <SocialMediaItem url="https://facebook.com" title="Facebook" icon="/SocialMedia/facebook.png" />
      </li>
      <li>
        <SocialMediaItem url="https://instagram.com" title="Instagram" icon="/SocialMedia/instagram.jfif" />
      </li>
      <li>
        <SocialMediaItem url="https://tiktok.com" title="Tiktok" icon="/SocialMedia/tiktok.png" />
      </li>
      <li>
        <SocialMediaItem url="https://linkedin.com" title="LinkedIn" icon="/SocialMedia/Linkedin.png" />
      </li>
    </ul>
  </div>
</footer>
  );
};

export default Footer;
