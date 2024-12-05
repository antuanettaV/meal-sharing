import React from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";

const navbarItems = [
  { title: "Home", link: "/home" },
  { title: "About Us", link: "/about-us" },
  { title: "Meals", link: "/meals" },
  ];

const Navbar = () => {
  const location = useLocation();

  return (
    <header className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      <nav>
        <ul className={styles.navbarList}>
          {navbarItems.map((item, index) => (
            <li
              key={index}
              className={classNames(styles.navbarLinks, {
                [styles.isLinkActive]: item.link === location.pathname,
              })}
            >
              <Link className={styles.textLink} to={item.link}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
