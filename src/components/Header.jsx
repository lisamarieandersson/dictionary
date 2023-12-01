import React from 'react';
import styles from './Header.module.css';
import ThemeToggle from './ThemeToggle';

function Header({ theme, toggleTheme, toggleView, showFavorites }) {
  return (
    <header className={styles['header-container']}>
      <h1>Dictionary</h1>
      <div className={styles['header-button-container']}>
        <button
          className={styles['header-toggle-favorites-back-to-search-button']}
          onClick={toggleView}
        >
          {showFavorites ? 'Back to Search' : 'Favorites'}
        </button>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
}

export default Header;
