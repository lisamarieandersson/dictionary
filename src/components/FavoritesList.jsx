import React from 'react';
import styles from './FavoritesList.module.css';

function FavoritesList({ favorites, removeFavorite }) {
  return (
    <div className={styles['favorite-list-container']}>
      <h3>Favorites</h3>
      <ul>
        {favorites.map((favorite) => (
          <li className={styles['favorite-list-item']} key={favorite.word}>
            <strong>{favorite.word}</strong>
            {/* Display the phonetics if available */}
            {favorite.phonetics && favorite.phonetics.length > 0 && (
              <p>Phonetic: {favorite.phonetics[0].text}</p>
            )}
            {/* Display meanings, only showing the first definition for simplicity */}
            {favorite.meanings &&
              favorite.meanings.map((meaning, idx) => (
                <div key={idx}>
                  <h5>{meaning.partOfSpeech}</h5>
                  {meaning.definitions && meaning.definitions.length > 0 && (
                    <p>Definition: {meaning.definitions[0].definition}</p>
                  )}
                </div>
              ))}
            <button
              className={styles['favorite-remove-button']}
              onClick={() => removeFavorite(favorite.word)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesList;
