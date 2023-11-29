import { useEffect, useRef, useState } from 'react';
import './App.css';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import WordCard from './components/WordCard';

function App() {
  const [theme, setTheme] = useState('light');
  const [wordData, setWordData] = useState(null);
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
        throw new Error('Word not found');
      }
      const data = await response.json();
      setWordData(data[0]); // Storing the first result
    } catch (error) {
      console.error('Error fetching data:', error);
      setWordData(null); // Resetting the state in case of an error
    }
  };

  return (
    <div className="App" ref={appRef} data-testid="app-root" data-theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <SearchForm onSearch={handleSearch} />
      {wordData && <WordCard wordData={wordData} />}
    </div>
  );
}

export default App;
