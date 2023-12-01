import { useEffect, useRef, useState } from 'react';
import './App.css';
import FavoritesList from './components/FavoritesList';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import WordList from './components/WordList';
import useFavorites from './hooks/useFavorites';

function App() {
  const [theme, setTheme] = useState('light');
  const [wordData, setWordData] = useState(null);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [showFavorites, setShowFavorites] = useState(false);
  const appRef = useRef(null);

  const toggleFavorite = (word) => {
    if (isFavorite(word)) {
      removeFavorite(word);
    } else {
      addFavorite(word);
    }
  };

  // Toggle between search and favorites view
  const toggleView = () => {
    if (showFavorites) {
      setError(null); // Clear error when switching back to search view
    }
    setShowFavorites(!showFavorites);
  };

  // Update the theme on the App component
  useEffect(() => {
    if (appRef.current) {
      appRef.current.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleSearch = async (NewQuery) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${NewQuery}`
      );
      if (!response.ok) {
        throw new Error('Word not found. Please try again.'); // This message will be shown to the user
      }
      const data = await response.json();
      setWordData(data[0]); // Storing the first result
      setError(null); // Clear any existing errors on successful fetch
    } catch (error) {
      console.error('Error fetching data:', error);
      setWordData(null); // Resetting the state in case of an error
      setError(error.message); // Set the error message
    }
    setQuery(''); // Clear the query after the search
  };

  return (
    <div className="App" ref={appRef} data-testid="app-root" data-theme={theme}>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        toggleView={toggleView}
        showFavorites={showFavorites}
      />
      <div className={`App-line ${theme}`}></div>{' '}
      {!showFavorites && (
        <SearchForm onSearch={handleSearch} query={query} setQuery={setQuery} />
      )}
      {/* Render error message only when not showing favorites and there is an error */}
      {!showFavorites && error && (
        <div className="App-error-message">{error}</div>
      )}
      {!showFavorites && wordData && (
        <WordList
          wordData={wordData}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      )}
      {showFavorites && (
        <FavoritesList favorites={favorites} removeFavorite={removeFavorite} />
      )}
    </div>
  );
}

export default App;
