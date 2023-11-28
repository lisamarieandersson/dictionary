// Header.js
import React from 'react';
import styles from './Header.module.css';
import ThemeToggle from './ThemeToggle';

function Header({ theme, toggleTheme }) {
  return (
    <header className={styles['header']}>
      <h1>Dictionary</h1>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </header>
  );
}

export default Header;
