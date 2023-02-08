//---| API: |---

const searchInput = document.getElementById("search-input");
const resultsElement = document.getElementById("results");
let q = "";
let reloadCount = 0;

//---| Generates a random word for the game |---

function generateRandWord() {
  let path = `https://api.api-ninjas.com/v1/randomword`;
  let response = fetch(path, {
    method: "GET",
    headers: {
      "X-Api-Key": "OqcnOPvLxscEV0tpcsHLgg==xW7msnrdB9dVDtDN",
    },
  });
  response
    .then((response) => response.json())
    .then((data) => {
      console.log(data.word);
      lettersLeftToGuess = data.word.length;
      imgSearchOfRandWord(data.word);
    });
}
let theHiddenWord = `${q}`;

// //---| This function takes the random word generated and finds images related |---

function imgSearchOfRandWord(q) {
  let path = `https://api.giphy.com/v1/gifs/search?api_key=5axeqUNKjjSDpnrZGYF4EGNKBKkxh9sY&q=${q}&limit=3&&rating=g&lang=en`;
  // console.log("New Gifs reloaded " + reloadCount + " times");
  let fetchPromise = fetch(path);
  let resultsHTML = "";
  fetchPromise
    .then(function (res) {
      return res.json();
    })
    .then(function (json) {
      json.data.forEach(function (object) {
        // console.log(object.images.fixed_width.url);
        const url = object.images.fixed_width.url;
        const width = object.images.fixed_width;
        const height = object.images.fixed_width.height;
        resultsHTML += `
                <img
                class="gifItem"
                src="${url}"
                width="${width}"
                height="${height}"
                >`;
      });
      resultsElement.innerHTML = resultsHTML;
    })
    .catch(function (err) {
      console.log(err.message);
    });
}

//---| Game Play: |---

const unknownWord = document.querySelector("#unknownWord");
const letters = document.querySelector("#letters");
const rLives = document.querySelector("#rLives");
const rLives_count = document.querySelector("#rLives_count");
const messageBox = document.querySelector("#messageBox");

const letters_string = "abcdefghijklmnopqrstuvwxyz";

console.log(letters_string.split(""));

let lives = 7;
let gameOver = false;
let filled = 0;

const hidden_word = theHiddenWord;

const total_letters = hidden_word
  .split(" ")
  .map((word) => word.length)
  .reduce((acc, curr) => acc + curr);

rLives_count.textContent = lives;

letters_string.split("").forEach((letter) => {
  letters.innerHTML += `
        <div class="letter-box">
            ${letter}
        </div>
    `;
});

//---| Eventlisteners |---

playGame.addEventListener("submit", function (event) {
  event.preventDefault();
  generateRandWord();
  resultsElement.innerHTML = "";
});

letters.addEventListener("click", ({ target }) => {
  const clicked_letter = target.textContent.trim();
  const empty_boxes = unknownWord.querySelectorAll(".empty-letter-box");

  if (
    !target.classList.contains("clicked") &&
    !target.classList.contains("letters") &&
    !gameOver
  ) {
    target.classList.add("clicked");

    hidden_word.toLowerCase().includes(clicked_letter)
      ? hidden_word.split("").forEach((letter, index) => {
          if (letter.toLowerCase() == clicked_letter) {
            empty_boxes[index].textContent = letter;
            filled += 1;
          }
        })
      : (lives -= 1);

    rLives_count.textContent = lives;

    if (filled == total_letters) {
      messageBox.textContent = "Lame...You won you egg";
      gameOver = true;
    }

    if (lives == 0) {
      messageBox.textContent = "HAHAHAHA YOU GOT YO BUTT HANDED TO YOU";
      gameOver = true;
    }

    if (gameOver) {
      letters.style.display = rLives.style.display = "none";
      hidden_word.split("").forEach((letter, index) => {
        empty_boxes[index].textContent = letter;
      });
    }
  }
});
