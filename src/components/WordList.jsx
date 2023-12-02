import styles from './WordList.module.css';

// Renders detailed information about a word, including its phonetics,
// meanings, definitions, synonyms, antonyms, and examples.

function WordList({ wordData, onToggleFavorite, isFavorite }) {
  return (
    <div className={styles['word-list-container']}>
      <div className={styles['word-list-headline-container']}>
        <h2>{wordData.word}</h2>
        <button
          className={styles['word-list-favorite-button']}
          onClick={() => onToggleFavorite(wordData.word)}
        >
          {isFavorite(wordData.word) ? 'Unfavorite' : 'Add To Favorites'}
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
                  <p className={styles['word-list-synonyms']}>
                    Synonyms: {definition.synonyms.slice(0, 3).join(', ')}
                  </p>
                )}
                {definition.antonyms && definition.antonyms.length > 0 && (
                  <p className={styles['word-list-antonyms']}>
                    Antonyms: {definition.antonyms.slice(0, 3).join(', ')}
                  </p>
                )}
                {definition.example && (
                  <p className={styles['word-list-example']}>
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
