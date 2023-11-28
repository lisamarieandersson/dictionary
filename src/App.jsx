import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import SearchForm from './components/SearchForm';

function App() {
  const [theme, setTheme] = useState('light');
  const [wordData, setWordData] = useState(null);

  // Light and dark theme
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Handle search for word
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
    <div className="App" data-testid="app-root" data-theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <SearchForm onSearch={handleSearch} />
      {wordData && (
        <div>
          <h2>{wordData.word}</h2>
          <ul>
            {wordData.phonetics.map((phonetic, index) => (
              <li key={index}>
                {phonetic.text && <p>Phonetic: {phonetic.text}</p>}
                {phonetic.audio && (
                  <audio controls src={phonetic.audio}></audio>
                )}
              </li>
            ))}
          </ul>
          {wordData.meanings.map((meaning, index) => (
            <div key={index}>
              <h3>{meaning.partOfSpeech}</h3>
              <ul>
                {meaning.definitions.map((definition, idx) => (
                  <li key={idx}>{definition.definition}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
