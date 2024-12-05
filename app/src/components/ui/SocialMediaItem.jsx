import React from 'react';
import styles from './SocialMediaItem.module.css';

const SocialMediaItem = ({ url, icon }) => {
  return (
    <li>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={icon} alt="social media icon" />
      </a>
    </li>
  );
};

export default SocialMediaItem;
