import React from 'react';
import styles from './FavoriteList.module.css';

function FavoriteList({ favorites, removeFavorite }) {
  return (
    <div className={styles['favorite-list-container']}>
      <h2>Favorites</h2>
      {favorites.map((favorite, favIndex) => (
        <div key={favIndex}>
          <div className={styles['favorite-list-word-container']}>
            <h3>{favorite.word}</h3>
            <button
              className={styles['favorite-remove-button']}
              onClick={() => removeFavorite(favorite.word)}
            >
              Remove
            </button>
          </div>
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
                    {definition.synonyms && definition.synonyms.length > 0 && (
                      <p className={styles['favorite-list-synonyms']}>
                        Synonyms: {definition.synonyms.slice(0, 3).join(', ')}
                      </p>
                    )}
                    {definition.antonyms && definition.antonyms.length > 0 && (
                      <p className={styles['favorite-list-antonyms']}>
                        Antonyms: {definition.antonyms.slice(0, 3).join(', ')}
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
      ))}
    </div>
  );
}

export default FavoriteList;
