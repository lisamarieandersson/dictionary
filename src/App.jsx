import { useEffect, useRef, useState } from 'react';
import './App.css';
import FavoriteList from './components/FavoriteList';
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

  // Adds a word to favorites (if it's not already favorited), or removes it if it is
  const toggleFavorite = (word) => {
    if (isFavorite(word)) {
      removeFavorite(word);
    } else {
      addFavorite(wordData);
    }
  };

  // Toggle between search and favorites view
  const toggleView = () => {
    if (showFavorites) {
      setError(null); // Clear error when switching back to search view
    }
    setShowFavorites(!showFavorites);
  };

  // Resets error
  const resetError = () => {
    setError(null);
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

  // Handles fetching word data from dictionary API
  const handleSearch = async (NewQuery) => {
    setError(null); // Clear any existing errors before starting a new search
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${NewQuery}`
      );
      if (!response.ok) {
        throw new Error('Word not found. Please try again.'); // This message will be shown to the user
      }
      const data = await response.json();
      setWordData(data[0]); // Storing the first result
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
      <div className="App-line"></div>
      {!showFavorites && (
        <SearchForm
          onSearch={handleSearch}
          query={query}
          setQuery={setQuery}
          resetError={resetError}
        />
      )}
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
        <FavoriteList favorites={favorites} removeFavorite={removeFavorite} />
      )}
    </div>
  );
}

export default App;
