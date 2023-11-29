function WordCard({ wordData }) {
  return (
    <div>
      <h2>{wordData.word}</h2>
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
              <li key={idx}>{definition.definition}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default WordCard;
