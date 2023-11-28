// Header.js
import React from 'react';
import './Header.module.css';
import ThemeToggle from './ThemeToggle';

function Header({ theme, toggleTheme }) {
  return (
    <header>
      <h1>Dictionary</h1>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </header>
  );
}

export default Header;
