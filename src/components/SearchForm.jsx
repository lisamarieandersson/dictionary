import React, { useState } from 'react';
import styles from './SearchForm.module.css';

// Renders a form with text input field and button where users can type their search query
// Includes input validation and error handling
// The input's value is controlled by the query state, which is passed as a prop and
// updated via the setQuery function.

function SearchForm({ onSearch, query, setQuery, resetError }) {
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setError('');
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetError(); // Reset error state in App component
    if (!query.trim()) {
      setError('Please enter a word to search.'); // Sets error if input is empty
    } else {
      onSearch(query);
    }
  };

  return (
    <form className={styles['search-form']} onSubmit={handleSubmit}>
      <div className={styles['search-bar']}>
        <input
          className={styles['search-input']}
          id="word-search"
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a word"
        />
        {error && (
          <span className={styles['search-error-message']}>{error}</span>
        )}{' '}
        {/* Displays error message */}
      </div>
      <button className={styles['search-button']} type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
