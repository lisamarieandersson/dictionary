import styles from './WordList.module.css';

function WordList({ wordData, onToggleFavorite, isFavorite }) {
  return (
    <div className={styles['word-list-container']}>
      <div className={styles['word-list-headline-container']}>
        <h2>{wordData.word}</h2>
        <button
          className={styles['word-list-favorite-button']}
          onClick={() => onToggleFavorite(wordData.word)}
        >
          {isFavorite(wordData.word) ? 'Unfavorite' : 'Favorite'}
        </button>
      </div>
      <ul>
        {wordData.phonetics.map((phonetic, index) => (
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
      {wordData.meanings.map((meaning, index) => (
        <div key={index}>
          <h3>{meaning.partOfSpeech}</h3>
          <ul>
            {meaning.definitions.map((definition, idx) => (
              <li key={idx}>
                {definition.definition}
                {definition.synonyms && definition.synonyms.length > 0 && (
                  <p className={styles['synonyms']}>
                    Synonyms: {definition.synonyms.slice(0, 3).join(', ')}
                  </p>
                )}
                {definition.antonyms && definition.antonyms.length > 0 && (
                  <p className={styles['antonyms']}>
                    Antonyms: {definition.antonyms.slice(0, 3).join(', ')}
                  </p>
                )}
                {definition.example && (
                  <p className={styles['example']}>
                    Example: {definition.example}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default WordList;
