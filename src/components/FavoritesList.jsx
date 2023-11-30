import React from 'react';
import styles from './FavoritesList.module.css';

function FavoritesList({ favorites, removeFavorite }) {
  return (
    <div className={styles['favorite-list-container']}>
      <h3>Favorites</h3>
      <ul>
        {favorites.map((word) => (
          <li className={styles['favorite-list-item']} key={word}>
            {word}
            <button
              className={styles['favorite-remove-button']}
              onClick={() => removeFavorite(word)}
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
