//---| API: |---

const searchInput = document.getElementById("search-input");
const guessInput = document.getElementById("guessedletter");
const resultsElement = document.getElementById("results");
const wordElement = document.getElementById("wordElement");

let q = "";
let reloadCount = 0;
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
      imgSearchOfRandWord(data.word);
      splitWords(data.word);
      fillBlanks();
    });
}
let theHiddenWord = `${q}`;

//---| Quotes Random Generator - If I get time I will do this |---
// let category = 'happiness'
// $.ajax({
//     method: 'GET',
//     url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
//     headers: { 'X-Api-Key': 'YOUR_API_KEY'},
//     contentType: 'application/json',
//     success: function(result) {
//         console.log(result);
//     },
//     error: function ajaxError(jqXHR) {
//         console.error('Error: ', jqXHR.responseText);
//     }
// });

/**
 * Split word : We get random word, split it into an array then save the length of the word
 * @param {string} word the random word that was generated
 */
function splitWords(word) {
  splitWord = [];
  wordLength = word.length;
  for (let i = 0; i < wordLength; i++) {
    splitWord[i] = word.charAt(i).toLowerCase();
  }
  console.log(splitWord);
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

// Fill Blanks for word

function fillBlanks() {
  while (wordElement.firstChild) {
    wordElement.removeChild(wordElement.lastChild);
  }
  for (let i = 0; i < wordLength; i++) {
    let x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    x.setAttribute("id", "letter-" + i);
    x.setAttribute("minlength", 1);
    x.setAttribute("maxlength", 1);
    x.setAttribute("size", 1);
    wordElement.appendChild(x);
    document.getElementById("letter-" + i).readOnly = true;
  }
}

//---| Game Play: |---

const unknownWord = document.querySelector("#unknownWord");
const letters = document.querySelector("#letters");
const remainingLives = document.querySelector("#remainingLives");
const remainingLives_count = document.querySelector(
  "span#remainingLives_count"
);
const messageBox = document.querySelector("#messageBox");

const letters_string = "abcdefghijklmnopqrstuvwxyz";

console.log(letters_string.split(""));

let lives = 7;
let gameOver = false;
let guessProgress = 0;

const hidden_word = theHiddenWord;

const total_letters = hidden_word
  .split(" ")
  .map((word) => word.length)
  .reduce((acc, curr) => acc + curr);

remainingLives_count.innerText = lives;

//---| Eventlisteners |---

playGame.addEventListener("submit", function (event) {
  event.preventDefault();
  generateRandWord();
  resultsElement.innerHTML = "";
  // lives = 7;
  remainingLives_count.innerText = lives;
  document.getElementById("guessLetterButton").disabled = false;
  messageBox.innerText = "";
  // guessProgress = 0;
});

guessLetterButton.addEventListener("click", function (event) {
  event.preventDefault();
  let theLetter = guessInput.value;

  if (theLetter === "") {
    messageBox.innerText = "Please enter a letter";
  } else {
    console.log("The letter entered was: " + theLetter);

    let indexesOfGuessedLetter_correct = [];
    let allGuessesMade_display = document.querySelector(
      "#allGuessesMade_display"
    );

    let guesses = document.createElement("p");
    let textnode = document.createTextNode(`${theLetter}`);
    guesses.appendChild(textnode);
    allGuessesMade_display.appendChild(guesses);

    for (let i = 0; i < wordLength; i++) {
      if (splitWord[i] === theLetter) {
        indexesOfGuessedLetter_correct.push(i);
        // allGuessesMade_display.push(i);
      }
    }

    console.log(indexesOfGuessedLetter_correct);
    console.log(allGuessesMade_display + "Meow");

    if (indexesOfGuessedLetter_correct.length !== 0) {
      // The player got one right! Update the wordLetters boxes
      guessProgress = guessProgress + indexesOfGuessedLetter_correct.length;

      for (let i = 0; i < indexesOfGuessedLetter_correct.length; i++) {
        let id = "letter-" + indexesOfGuessedLetter_correct[i];
        document.getElementById(id).value = theLetter;
      }
    } else {
      //Player guessed wrong - subtract lives
      lives = lives - 1;
    }

    // if (guessProgress === wordLength) {
    //   messageBox.innerText = `You WON with ${wrongGuesses_count} wrong guesses`;
    //   gameOver = true;
    //   document.getElementById("guessLetterButton").disabled = true;
    // }

    // if (lives === 0) {
    //   messageBox.innerText = `You LOST with ${wrongGuesses_count} guesses...Obviously`;
    //   gameOver = true;
    // }
  }
  remainingLives_count.innerText = lives;
});
