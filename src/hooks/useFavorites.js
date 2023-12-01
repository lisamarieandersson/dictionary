import { useEffect, useState } from 'react';

function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = sessionStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    // Save favorites to sessionStorage whenever they change
    sessionStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (wordData) => {
    const isAlreadyFavorite = favorites.some(
      (fav) => fav.word === wordData.word
    );
    if (!isAlreadyFavorite) {
      setFavorites((prevFavorites) => [...prevFavorites, wordData]);
    }
  };

  const removeFavorite = (wordToRemove) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.word !== wordToRemove)
    );
  };

  const isFavorite = (wordToCheck) => {
    return favorites.some((fav) => fav.word === wordToCheck);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
}

export default useFavorites;
