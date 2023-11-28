// SearchForm.js
import React, { useState } from 'react';
import './SearchForm.module.css';

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSearch(query); // Call the onSearch prop with the query
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="word-search"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a word"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
