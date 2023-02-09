# Project 4 - Giphman

Project 4 with General Assembly.
Project 4 is to DECIDE YOUR OWN PROJECT that pushes you OUTSIDE of your comfort zone AND looks visually pleasing.
~ This time....I....present to you ~

## Giphman

- Hangman but....using gifs!!!

The aim now is to create a pure front end app that uses a giphy API.

### TO HIT MVP REQUIREMENTS:

I need to hit Version 2 and achieve a, b, c & d.

1. Make the front-end app call the Giphy API and search for a random thing e.g. "jar of pickles"

2. When the data comes back, the user can see a few images of the secret term.

3. The user then has to guess what the images are, so they are trying to correctly guess the secret term e.g. "jar of pickles"

Version 1 - an input box where the user is typing what their guess is and comparing that to the secret term.

Version 2 - a hangman style game where each letter is represented as an empty box, and the user can click on the empty box and type in there.

Each letter they type, if its correct, will display the letter inside the box, as well as the same letter used in other boxes e.g. the letter "a"

If the letter they type is incorrect, do not write the letter into the box, and also increment the counter of incorrect guesses.

The counter of incorrect guesses is displayed to the user.

Once they finish the entire word, you display a message to congratulate the user that they got it correct with X number of incorrect guesses.

Version 3 - Add their score to a leaderboard.

This is the current plan:
![Screenshot 2023-02-08 at 5 17 48 pm](https://user-images.githubusercontent.com/116997107/217461004-45970af1-f667-4462-99a8-5b8cb9d0d262.png)

## Pseudo Code

Pick a random word (APININJA)
Find hints (GIPHYAPI)

While (the word has not been guessed) {
Show the player their current progress
Get a guess from the player
If (the player wants to quit the game) {
Quit the game
}
Else If (the guess is not a single letter) {
Tell the player to pick a single letter
}
Else If (the guess is in the word) {
Update the player's progress with the guess
}
}
}
Congratulate the player on guessing the word

## APIs Used

_[API Ninjas](https://api-ninjas.com/api/randomword)_

_[Giphy Developers](https://developers.giphy.com/docs/api/#quick-start-guide)_

## Useful Resources

Okay so google.com & youtube.com has been a huge help but exactly what has been useful? If you're looking to make your own hangman - Definitely learn what HTML DOM Events are and experiment with everything you see.

_[W3schools - HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp)_

## Bugs

Some words don't seem to exist in Giphy and others do - Take this word for instance:

- Duplicidentata (No Have)
- Fovea (Actually does)

Some queries don't have enough items to have 3 gifs appear.

- unmalleable (only has 1 item available)

I'm ALWAYS a winner.

Now...I'm losing lives at every guess be it right or wrong.

## Where we came from to where we went...

Originally I was trying to make people guess a letter however the reset button didn't work, the counters didn't work and I just....Thought lets get rid of typing altogether.

![Screenshot 2023-02-09 at 2 18 22 am](https://user-images.githubusercontent.com/116997107/217690944-7500f919-20cb-465c-8dbc-8eae60f1c5bd.png)

As a result - I made a little alphabet board which was really cute but I had issues with letters converting into other letters and the styling got really bad looking.

![Screenshot 2023-02-09 at 3 17 36 am](https://user-images.githubusercontent.com/116997107/217690916-ea574455-7c34-40b1-8b55-fcf7484a412a.png)

Anddddd here I am....

![Screenshot 2023-02-09 at 11 23 34 am](https://user-images.githubusercontent.com/116997107/217690974-6bfe6f6f-7f31-41eb-89c7-9afebff2cfea.png)

Let's just take a moment to acknowledge this cheeky fella - It took me far too long to realise what needed to be fixed but feast your eyes! The always a winner or always a loser has been fixed!

![Screenshot 2023-02-09 at 2 55 13 pm](https://user-images.githubusercontent.com/116997107/217722190-86e86f31-b1da-47bf-ad29-05bcafc87c95.png)

## An RSS newsfeed (Scrapped that)

- Newspaper but....Digital!!!

## MangaLuva (Scrapped that)

- Canva but....Manga creating!!!

## MermaidTail (Scrapped that)

- Flappy Bird but....Underwater with a mermaid!!!

(Under teacher recommendations I changed my ideas).

```

```
