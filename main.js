//---| API: |---

const searchInput = document.getElementById("search-input");
const resultsElement = document.getElementById("results");
let q = "";
let reloadCount = 0;
let guessInput = "";
let splitWord = [];
let wordLength = 0;
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

function fillBlanks() {
  let wordsHTML = "";
  for (var i = 0; i < wordLength; i++) {
    wordsHTML += `
                <input type="text" id="letter-${i}}" name="guessedletter" required
       minlength="1" maxlength="1" size="1" readonly>`;
  }
  wordElement.innerHTML = wordsHTML;
}

//---| Game Play: |---

const unknownWord = document.querySelector("div#unknownWord");
const letters = document.querySelector("div#letters.letters");
const remainingLives = document.querySelector("#remainingLives");
const remainingLives_count = document.querySelector(
  "span#remainingLives_count"
);
const messageBox = document.querySelector("div#messageBox.message-box");

const letters_string = "abcdefghijklmnopqrstuvwxyz";

console.log(letters_string.split(""));

let lives = 7;
let gameOver = false;
let guessedLetter = 0;
let theHiddenWord = `${q}`;
const hidden_word = theHiddenWord;
function splitWords(word) {
  wordLength = word.length;
  for (var i = 0; i < wordLength; i++) {
    splitWord[i] = word.charAt(i);
  }
  console.log(splitWord);
}
const total_letters = hidden_word
  .split(" ")
  .map((word) => word.length)
  .reduce((acc, curr) => acc + curr);

remainingLives_count.innerText = lives;

letters_string.split("").forEach((letter) => {
  letters.innerHTML += `
        <div class="letter-box">
            ${letter}
        </div>
    `;
});

//---| Eventlisteners |---
// Buttons/forms/seperate them

playGame.addEventListener("submit", function (event) {
  event.preventDefault();
  generateRandWord();
  resultsElement.innerHTML = "";
});

letters.addEventListener("click", ({ target }) => {
  const clicked_letter = target.innerText.trim();
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
            empty_boxes[index].innerText = letter;
            guessedLetter += 1;
          }
        })
      : (lives -= 1);
    console.log(guessedLetter);
    remainingLives_count.innerText = lives;

    guessLetter.addEventListener("click", function (event) {
      event.preventDefault();
      let theLetter = guessInput.value;

      if (theLetter === "") {
        messageBox.innerText = "Please enter a letter";
      } else {
        console.log("The letter entered was: " + theLetter);

        let letterPos = [];

        for (i = 0; i < wordLength; i++) {
          if (splitWord[i] === theLetter) {
            letterPos.push(i);
          }
        }
        console.log(letterPos);

        if (letterPos.length !== 0) {
          guessedLetter = guessedLetter + letterPos.length;
          for (i = 0; i < letterPos.length; i++) {
            var id = "letter-" + letterPos[i];
            document.getElementById(id).value = theLetter;
          }
        }
        if (guessedLetter === wordLength) {
          messageBox.innerText = "Winner";
          gameOver = true;
        }
        if (lives === 0) {
          messageBox.innerText = "Loser";
          gameOver = true;
        }
      }
      // ------------|Message Box|------------
      // if (guessedLetter === total_letters) {
      //   messageBox.innerText = `WINNER!`;
      //   gameOver = true;
      // }
      // if (lives === 0) {
      //   messageBox.innerText = `LOSER!`;
      //   gameOver = true;
      // }
      // if (gameOver) {
      //   letters.style.display = remainingLives.style.display = "none";
      //   hidden_word.split("").forEach((letter, index) => {
      //     empty_boxes[index].innerText = letter;
      //   });
      // }
    });
  }
});
