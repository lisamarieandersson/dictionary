import { useEffect, useRef, useState } from 'react';
import './App.css';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import WordList from './components/WordList';

function App() {
  const [theme, setTheme] = useState('light');
  const [wordData, setWordData] = useState(null);
  const [error, setError] = useState(null);
  const appRef = useRef(null);

  // Update the theme on the App component
  useEffect(() => {
    if (appRef.current) {
      appRef.current.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
      );
      if (!response.ok) {
        throw new Error('Word not found'); // This message will be shown to the user
      }
      const data = await response.json();
      setWordData(data[0]); // Storing the first result
      setError(null); // Clear any existing errors on successful fetch
    } catch (error) {
      console.error('Error fetching data:', error);
      setWordData(null); // Resetting the state in case of an error
      setError(error.message); // Set the error message
    }
  };

  return (
    <div className="App" ref={appRef} data-testid="app-root" data-theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <SearchForm onSearch={handleSearch} />
      {error && <div className="error-message">{error}</div>}{' '}
      {/* Display error message */}
      {wordData && <WordList wordData={wordData} />}
    </div>
  );
}

export default App;
