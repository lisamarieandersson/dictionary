import React, { useState } from 'react';
import styles from './SearchForm.module.css';

function SearchForm({ onSearch, query, setQuery }) {
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setError('');
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
