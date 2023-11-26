// ThemeToggle.js

function ThemeToggle({ theme, toggleTheme }) {
  // Use defaultChecked for testing purposes
  //   const isDarkMode = theme === 'dark';

  return (
    <div className="theme-toggle-container">
      <div className="toggle-switch">
        <input
          id="theme-switch"
          type="checkbox"
          className="toggle-switch-checkbox"
          onChange={toggleTheme}
          checked={theme === 'dark'}
          //   defaultChecked={isDarkMode}
          aria-label={
            theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
          }
        />
        <label className="toggle-switch-label" htmlFor="theme-switch">
          <span className="toggle-switch-inner" />
          <span className="toggle-switch-switch" />
        </label>
      </div>
      <span className="theme-toggle-text">
        {theme === 'dark' ? 'Dark' : 'Light'} Mode
      </span>
    </div>
  );
}

export default ThemeToggle;
