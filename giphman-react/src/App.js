import { useState, useEffect } from "react";
import "./App.css";
// Constants of screen state
const SCREEN_START = 0;
const SCREEN_PLAY = 1;
const SCREEN_WIN = 2;
const SCREEN_LOSE = 3;

const GUESS_AMOUNT = 7;
const START_GUESSES = [" ", "-"];

const ALPHABET = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const WORD_BANK = [
  "JAR OF PICKLES",
  "CHOCOLATE",
  "STORY",
  "SPRITELY",
  "PINE-O-CLEEN",
  "PORTFOLIO",
  "HOW DID EVERYONE GO WITH THEIR WARM UPS TODAY",
  "GONE FISHING",
];

function App() {
  // left: read-only, right: you gotta write (also its a function)
  const [screen, setScreen] = useState(SCREEN_START);
  const [word, setWord] = useState("test");
  const [images, setImages] = useState([]);
  const [guessHistory, setGuessHistory] = useState(START_GUESSES);
  const [remainingGuesses, setRemainingGuesses] = useState(GUESS_AMOUNT);
  const [wordIndex, setWordIndex] = useState(0);

  function goToPlay() {
    setScreen(SCREEN_PLAY);
    setWordIndex(0);
    setRemainingGuesses(GUESS_AMOUNT);
  }

  function goToNextLevel() {
    const newWordIndex = (wordIndex + 1) % WORD_BANK.length;
    setWordIndex(newWordIndex);
    setScreen(SCREEN_PLAY);
  }

  function goToStart() {}

  useEffect(() => {
    setWord(WORD_BANK[wordIndex]);
  }, [wordIndex]);

  useEffect(() => {
    if (screen != SCREEN_PLAY) return;
    setGuessHistory(START_GUESSES);
    let path = `https://api.giphy.com/v1/gifs/search?api_key=5axeqUNKjjSDpnrZGYF4EGNKBKkxh9sY&q=${word}&limit=3&&rating=g&lang=en`;

    fetch(path)
      .then((res) => res.json())
      .then((json) => {
        const arrayOfUrls = json.data.map(
          (object) => object.images.fixed_width.url
        );
        setImages(arrayOfUrls);
      })
      .catch((err) => console.log(err.message));
  }, [word, screen]);

  function guessLetter(letter) {
    const correctLetter = word.toUpperCase().includes(letter);
    const usedLetter = guessHistory.includes(letter);
    if (usedLetter) return;
    const newGuessHistory = [...guessHistory, letter];
    const containsWord = word
      .toUpperCase()
      .split("")
      .every((letter) => newGuessHistory.includes(letter));
    setGuessHistory(newGuessHistory);
    if (!correctLetter) {
      const newRemainingGuesses = remainingGuesses - 1;
      setRemainingGuesses(newRemainingGuesses);
      if (newRemainingGuesses === 0) {
        setScreen(SCREEN_LOSE);
      }
    } else if (containsWord) {
      setScreen(SCREEN_WIN);
    }
  }

  function letterBackground(letter) {
    const correctLetter = word.toUpperCase().includes(letter);
    const usedLetter = guessHistory.includes(letter);
    if (!usedLetter) return "white";
    return correctLetter ? "green" : "red";
  }

  function letterColor(letter) {
    const usedLetter = guessHistory.includes(letter);
    return usedLetter ? "white" : "black";
  }

  return (
    <div className="App">
      <h1>GIPHMAN</h1>
      {screen === SCREEN_START && (
        <button className="play-game-btn" onClick={goToPlay}>
          PLAY GAME
        </button>
      )}
      {screen === SCREEN_PLAY && (
        <div>
          {images.map((imageUrl) => (
            <img
              key={imageUrl}
              className="screenPlayImage"
              src={imageUrl}
              style={{ margin: 1 + "rem" }}
              width="200"
              height="200"
            />
          ))}
          <div
            style={{
              margin: 1 + "rem",
            }}
          >
            {word
              .toUpperCase()
              .split("")
              .map((letter) => (guessHistory.includes(letter) ? letter : "_"))
              .map((letter, index) => (
                <span
                  key={index}
                  style={{
                    fontSize: 4 + "em",
                    margin: 1 + "rem",
                  }}
                >
                  {letter}
                </span>
              ))}
          </div>
          <div>
            {ALPHABET.map((letter) => (
              <button
                style={{
                  fontSize: 2 + "em",
                  fontWeight: "bold",
                  background: letterBackground(letter),
                  color: letterColor(letter),
                }}
                key={letter}
                disabled={guessHistory.includes(letter)}
                onClick={() => guessLetter(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
          <div
            style={{
              fontSize: 4 + "em",
              margin: 1 + "rem",
            }}
          >
            {remainingGuesses}
          </div>
        </div>
      )}
      {screen === SCREEN_WIN && (
        <div>
          <button className="play-game-btn" onClick={goToNextLevel}>
            PLAY NEXT LEVEL
          </button>
          <button className="play-game-btn" onClick={goToStart}>
            QUIT GAME
          </button>
        </div>
      )}
      {screen === SCREEN_LOSE && (
        <div>
          <button className="play-game-btn" onClick={goToPlay}>
            PLAY AGAIN ?
          </button>
          <button className="play-game-btn" onClick={goToStart}>
            QUIT GAME
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
