const searchInput = document.getElementById("search-input");
const guessInput = document.getElementById("guessedletter");
const resultsElement = document.getElementById("results");
const wordElement = document.getElementById("wordElement");
let incorrectLettersGuessed = 0;
let q = "";
let splitWord = []; // Stores the individual letters from the random word in an array. This will be used later to check if user has guessed a right letter
let wordLength = 0; // Length of the random word
document.getElementById("guessLetterButton").disabled = true;

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
      data.word = "test";
      console.log(data.word);
      imgSearchOfRandWord(data.word);
      splitWords(data.word);
      fillBlanks();
    });
}
let theHiddenWord = `${q}`;

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

// Generate blank boxes for word based on word length and show it on the webpage

function fillBlanks() {
  while (wordElement.firstChild) {
    wordElement.removeChild(wordElement.lastChild);
  }
  for (let i = 0; i < wordLength; i++) {
    let x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    x.setAttribute("id", "letter-" + i); // making sure each blank box has a unique id so we can populate it later
    x.setAttribute("minlength", 1);
    x.setAttribute("maxlength", 1);
    x.setAttribute("size", 1);
    wordElement.appendChild(x);
    // document.getElementById("letter-" + i).readOnly = true; // To make sure user cannot edit these
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
let livesWrong = 0;
let lives = 5;
let gameOver = false;
let guessProgress = 0;
let guessStall = 0;

const hidden_word = theHiddenWord;

const total_letters = hidden_word
  .split(" ")
  .map((word) => word.length)
  .reduce((acc, curr) => acc + curr);

remainingLives_count.innerText = lives;

//---| Eventlisteners |---

playGame.addEventListener("submit", function (event) {
  while (allGuessesMade_display.firstChild) {
    allGuessesMade_display.removeChild(allGuessesMade_display.lastChild);
  }
  event.preventDefault();
  generateRandWord();
  resultsElement.innerHTML = "";
  lives = 5; // resets the lives counter after game is played
  remainingLives_count.innerText = lives;
  document.getElementById("guessLetterButton").disabled = false;
  messageBox.innerText = "";
  // guessProgress = 0;
});

guessLetterButton.addEventListener("click", function (event) {
  event.preventDefault();
  let guessedWord = [];
  let guessedWordString = "";

  for (let i = 0; i < splitWord.length; i++) {
    let id = "letter-" + i;
    guessedWord[i] = document.getElementById(id).value;
    guessedWordString = guessedWordString + guessedWord[i];
  }
  console.log("guessedword " + guessedWord);

  let totalGuesses = 0;
  if (guessedWord.length === "") {
    messageBox.innerText = "Please enter a word";
  } else {
    //console.log("The word entered was: " + theLetter);
    //display all guesses on the screen
    let indexesOfGuessedLetter_correct = [];
    let allGuessesMade_display = document.querySelector(
      "#allGuessesMade_display"
    );

    // create <p> to print out the guessed words
    let guesses = document.createElement("p");
    let textnode = document.createTextNode(`${guessedWordString}`);
    let blankNode = document.createTextNode(" ");
    console.log(" guessed word ", guessedWordString);
    guesses.appendChild(textnode);
    allGuessesMade_display.appendChild(guesses);
    allGuessesMade_display.appendChild(blankNode);

    for (let i = 0; i < wordLength; i++) {
      if (splitWord[i] === guessedWord[i]) {
        indexesOfGuessedLetter_correct.push(i);
      }
    }

    console.log(indexesOfGuessedLetter_correct);
    //console.log(allGuessesMade_display + "Meow");

    if (indexesOfGuessedLetter_correct.length !== 0) {
      // The player got one right! Update the wordElements boxes
      guessProgress = guessProgress + indexesOfGuessedLetter_correct.length;

      for (let i = 0; i < indexesOfGuessedLetter_correct.length; i++) {
        let id = "letter-" + indexesOfGuessedLetter_correct[i];
        //document.getElementById(id).value = splitWord[i];
        document.getElementById(id).readOnly = true;
        document.getElementById(id).style.backgroundColor = "green";
      }
    } else {
      //Player guessed wrong - subtract lives
      lives = lives - 1;
    }

    if (lives > 0 && guessProgress === wordLength) {
      let totalGuesses = guessProgress + incorrectLettersGuessed;
      // Win state
      messageBox.innerText = `You WON with a total of ${totalGuesses} guess(es). You got ${incorrectLettersGuessed} letter(s) that were wrong. The game is over now - Thanks for playing`;
      gameOver = true;
      allGuessesMade_display.removeChild(allGuessesMade_display.lastChild);
      document.getElementById("guessLetterButton").disabled = true;
    } else if (lives === 0 && guessProgress < wordLength) {
      // Lose state
      messageBox.innerText = `You LOST with a total of ${totalGuesses} guess(es). You got ${incorrectLettersGuessed} letter(s) that were wrong. The game is over now - Thanks for playing`;
      gameOver = true;
      allGuessesMade_display.removeChild(allGuessesMade_display.lastChild);
      document.getElementById("guessLetterButton").disabled = true;
    }
  }
  remainingLives_count.innerText = lives; //Update the display to show how many lives are left
  incorrectLettersGuessed = 5 - lives;

  for (let i = 0; i < splitWord.length; i++) {
    let id = "letter-" + i;
    if (document.getElementById(id).readOnly == false) {
      document.getElementById(id).value = "";
    }
  }
  // guessInput.value = "";
});

let leaderBoardScore = 11 + " points";
if (playerScore > leaderBoardScore) {
  console.log(
    "Your score beat the leaderboard's score! Your score will now be the new challenge to beat!"
  );
  leaderBoardScore = playerScore;
} else if (playerScore < leaderBoardScore) {
  console.log(
    "Unfortunately you did not beat the leaderboard's score this time"
  );
} else {
  console.log(
    "Getting the same points as the leaderboard is equal to a draw. That means it doesn't count as a win against the leaderboard this time"
  );
}
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
