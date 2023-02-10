import { useState } from "react";
import "./App.css";
// Constant of screen state hi
const SCREEN_START = 0;
const SCREEN_PLAY = 1;
const SCREEN_WIN = 2;
const SCREEN_LOSE = 3;

function App() {
  const [screen, setScreen] = useState(SCREEN_START);
  const [word, setWord] = useState("glass");
  const [images, setImages] = useState([]);

  function goToPlay() {
    setScreen(SCREEN_PLAY);
    getImages();
  }

  function getImages() {
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
  }

  return (
    <div className="App">
      <h1>GIPHMAN</h1>
      <div>{screen}</div>
      {screen === SCREEN_START && (
        <button className="play-game-btn" onClick={goToPlay}>
          PLAY GAME
        </button>
      )}
      {screen === SCREEN_PLAY &&
        images.map((image) => (
          <img class="screenPlayImage" src={image} width="100" height="100" />
        ))}
    </div>
  );
}

export default App;
