import { useEffect, useState } from 'react';

function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = sessionStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (word) => {
    if (!favorites.includes(word)) {
      setFavorites([...favorites, word]);
    }
  };

  const removeFavorite = (word) => {
    setFavorites(favorites.filter((fav) => fav !== word));
  };

  const isFavorite = (word) => {
    return favorites.includes(word);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
}

export default useFavorites;
