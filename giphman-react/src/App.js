import { useState, useEffect } from "react";
import WORD_BANK from "../src/wordBank.js";
import "./App.css";
// Constants of screen state
const SCREEN_START = 0;
const SCREEN_PLAY = 1;
const SCREEN_WIN = 2;
const SCREEN_LOSE = 3;

const GUESS_AMOUNT = 7;
const START_GUESSES = [" ", "-", "'", "!", "?", ","];

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

function App() {
  // left: read-only, right: you gotta write (also its a function)
  const [screen, setScreen] = useState(SCREEN_START);
  const [word, setWord] = useState("test");
  const [images, setImages] = useState([]);
  const [guessHistory, setGuessHistory] = useState(START_GUESSES);
  const [remainingGuesses, setRemainingGuesses] = useState(GUESS_AMOUNT);
  const [wordIndex, setWordIndex] = useState(0);
  const [leaderBoard, setLeaderBoard] = useState([{ name: "Nano", score: 10 }]);
  const [levelCount, setLevelCount] = useState(0);
  const [savedToLeaderBoard, setSavedToLeaderBoard] = useState(false);
  const [playerName, setPlayerName] = useState("");

  function goToPlay() {
    setScreen(SCREEN_PLAY);
    setWordIndex(0);
    setRemainingGuesses(GUESS_AMOUNT);
    setLevelCount(0);
    setSavedToLeaderBoard(false);
  }

  function goToNextLevel() {
    const newWordIndex = (wordIndex + 1) % WORD_BANK.length;
    setWordIndex(newWordIndex);
    setScreen(SCREEN_PLAY);
    setLevelCount(levelCount + 1);
    setRemainingGuesses(GUESS_AMOUNT);
  }

  function goToStart() {
    setScreen(SCREEN_START);
  }

  function saveScore() {
    setSavedToLeaderBoard(true);
    const newLeaderBoard = [
      ...leaderBoard,
      { name: playerName, score: levelCount },
    ];
    setLeaderBoard(newLeaderBoard);
  }

  useEffect(() => {
    setWord(WORD_BANK[wordIndex].toUpperCase());
  }, [wordIndex]);

  useEffect(() => {
    if (screen !== SCREEN_PLAY) return;
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
        <div>
          <button className="play-game-btn" onClick={goToPlay}>
            PLAY GAME
          </button>
          <div className="startScreenContent">
            <div className="textStart">
              To play: You get 7 lives, each round you will be given a word or
              phrase to guess the only hint you get is 3 related images. Each
              time you correctly guess a word you get to continue (by your
              choice) to the next round. However if you choose to quit with
              lives still available you will lose your progress and your score
              will NOT be recorded in the leaderboard! This is survival of the
              wordiest giphman around!
            </div>
          </div>
        </div>
      )}
      {screen === SCREEN_PLAY && (
        <div>
          {images.map((imageUrl) => (
            <img
              alt="imageFromGiphyApi"
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
            className="counters"
            style={{
              fontSize: 2 + "em",
              margin: 1 + "rem",
            }}
          >
            {/* Counters for guessing */}
            <div> Remaining Guesses: {remainingGuesses}</div>

            <div> Incorrect Guesses: {7 - remainingGuesses}</div>

            {/* Styling of key legend (So players know what the colours mean) */}
            <div>
              <div className="keyEntry">
                <div
                  style={{ color: "black", background: "white" }}
                  className="letter"
                >
                  A
                </div>
                <div className="caption">Available Guess</div>
              </div>
              <div className="keyEntry">
                <div
                  style={{ color: "white", background: "green" }}
                  className="letter"
                >
                  B
                </div>
                <div className="caption">Correct Guess!</div>
              </div>
              <div className="keyEntry">
                <div
                  style={{ color: "white", background: "red" }}
                  className="letter"
                >
                  C
                </div>
                <div className="caption">Wrong Guess!</div>
              </div>
              <div>
                Click on one letter at a time to guess if it is in the word or
                phrase.
              </div>
            </div>
          </div>
        </div>
      )}
      {screen === SCREEN_WIN && (
        <div>
          That secret word or phrase: {word}
          <div>
            YOU WON 😄 You have guessed it correctly with{" "}
            {guessHistory.length - 6} total guesses. Out of those guesses you
            got {7 - remainingGuesses} wrong.
          </div>
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
          <div className="score">You got {levelCount} ! </div>
          <div className="leaderBoard">
            {leaderBoard.map((entry) => (
              <div>
                {entry.name} {entry.score}
              </div>
            ))}
          </div>
          {savedToLeaderBoard === false && (
            <div>
              <input
                value={playerName}
                onChange={(event) => setPlayerName(event.target.value)}
              ></input>
              <button onClick={saveScore} disabled={playerName === ""}>
                save
              </button>
            </div>
          )}
          <div>
            <div>That secret word or phrase was: {word}</div>
            YOU LOST 😭 You have guessed it wrong after{" "}
            {guessHistory.length - 6} incorrect guesses
          </div>
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
