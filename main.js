const searchInput = document.getElementById("search-input");
const resultsElement = document.getElementById("results");
let q = "";
let reloadCount = 0;
let genWord = [];
let lettersGuessed = [];
let lettersLeftToGuess = 0;

//---| This is the Yes Button "Wanna Play?" Listens for the click to trigger the game |---
yesPlay.addEventListener("submit", function (event) {
  event.preventDefault();
  resultsElement.innerHTML = "";
  generateRandWord();
});
// Ideally the question and button will hide until the page is refreshed or win or lose condition is met.

//---| This function takes the random word generated and finds images related to that |---
function search(q) {
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
      search(data.word);
    });
}

//---| Makes the generated random word turn into an array |---
function genWordToArray(s) {
  genWord = s.split();
  console.log(genWord);
}

//--|Quotes - If time allows the game can be made harder with this guess quotes instead of one word|---
// var category = 'happiness'
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
