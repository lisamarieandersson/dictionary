import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      {/* <button onClick={toggleTheme}>Toggle Theme</button> */}
      <div className="toggle-switch">
        <input
          id="theme-switch"
          type="checkbox"
          className="toggle-switch-checkbox"
          onChange={toggleTheme}
          checked={theme === 'dark'}
        />
        <label className="toggle-switch-label" htmlFor="theme-switch">
          <span className="toggle-switch-inner" />
          <span className="toggle-switch-switch" />
        </label>
      </div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
