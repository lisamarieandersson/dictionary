import React, { useState } from 'react';
import styles from './FavoriteList.module.css';

// Renders and mananages the list of favorite words, with and word data
// Each favorite word can be expanded or collapsed to show or hide its details

function FavoriteList({ favorites, removeFavorite }) {
  // State object to track the expanded status of each item
  const [expandedStates, setExpandedStates] = useState({});

  // Function to toggle the expanded state for a specific word
  const toggleExpand = (word) => {
    setExpandedStates((prevStates) => ({
      ...prevStates,
      [word]: !prevStates[word],
    }));
  };

  return (
    <div className={styles['favorite-list-container']}>
      <h2>Favorites</h2>
      {favorites.map((favorite, favIndex) => {
        const isExpanded = expandedStates[favorite.word];
        return (
          <div key={favIndex}>
            <ul className={styles['favorite-list']}>
              <li className={styles['favorite-list-item']}>
                {favorite.word}
                <button
                  className={styles['favorite-list-remove-button']}
                  onClick={() => removeFavorite(favorite.word)}
                >
                  Remove
                </button>
                <button
                  onClick={() => toggleExpand(favorite.word)}
                  className={styles['favorite-list-expand-button']}
                >
                  {isExpanded ? 'See Less' : 'See More'}
                </button>
              </li>
            </ul>
            {isExpanded && (
              <div className={styles['favorite-details']}>
                <ul>
                  {favorite.phonetics.map((phonetic, index) => (
                    <li key={index}>
                      {phonetic.text && <p>Phonetic: {phonetic.text}</p>}
                      {phonetic.audio && (
                        <audio
                          aria-label="word pronunciation"
                          controls
                          src={phonetic.audio}
                        ></audio>
                      )}
                    </li>
                  ))}
                </ul>
                {favorite.meanings.map((meaning, index) => (
                  <div key={index}>
                    <h4>{meaning.partOfSpeech}</h4>
                    <ul>
                      {meaning.definitions.map((definition, idx) => (
                        <li key={idx}>
                          {definition.definition}
                          {definition.synonyms &&
                            definition.synonyms.length > 0 && (
                              <p className={styles['favorite-list-synonyms']}>
                                Synonyms:{' '}
                                {definition.synonyms.slice(0, 3).join(', ')}
                              </p>
                            )}
                          {definition.antonyms &&
                            definition.antonyms.length > 0 && (
                              <p className={styles['favorite-list-antonyms']}>
                                Antonyms:{' '}
                                {definition.antonyms.slice(0, 3).join(', ')}
                              </p>
                            )}
                          {definition.example && (
                            <p className={styles['favorite-list-example']}>
                              Example: {definition.example}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default FavoriteList;
