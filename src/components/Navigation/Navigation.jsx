import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to="/">Топи фільмів</Link>
        </li>
        <li>
          <Link to="/movies">Пошук фільмів за назвою</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
