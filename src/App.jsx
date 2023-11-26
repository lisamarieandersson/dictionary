import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';

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
      <Header theme={theme} toggleTheme={toggleTheme} />
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
