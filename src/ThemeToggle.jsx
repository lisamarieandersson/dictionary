// ThemeToggle.js

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <div className="toggle-switch">
      <input
        id="theme-switch"
        type="checkbox"
        className="toggle-switch-checkbox"
        onChange={toggleTheme}
        checked={theme === 'dark'}
        aria-label={
          theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        }
      />
      <label className="toggle-switch-label" htmlFor="theme-switch">
        <span className="toggle-switch-inner" />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  );
}

export default ThemeToggle;
