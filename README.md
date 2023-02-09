# Project 4 - Giphman

Project 4 with General Assembly.
Project 4 is to DECIDE YOUR OWN PROJECT that pushes you OUTSIDE of your comfort zone AND looks visually pleasing.

~ This time....I....present to you...my learning journey.

This is for educational purposes so that I can learn how to code. If you happen to learn anything useful or have any advice for me to improve my skills please do tell :heart:

## Giphman

- Hangman but....using gifs!!!

The aim now is to create a pure front end app that uses a giphy API.

![Screenshot 2023-02-10 at 3 56 46 am](https://user-images.githubusercontent.com/116997107/217898053-9563e260-c920-4242-8081-6d868fa2eb78.png)

### TO HIT MVP REQUIREMENTS:

My teacher said that I just need to hit Version 2 and achieve a, b, c & d.

Below is screenshot proof of hitting that :heart:

1. Make the front-end app call the Giphy API and search for a random thing e.g. "bow"

![Screenshot 2023-02-10 at 1 57 02 am](https://user-images.githubusercontent.com/116997107/217872021-e82b377b-d927-4f6c-9f41-4f50011ef210.png)

![Screenshot 2023-02-10 at 2 01 09 am](https://user-images.githubusercontent.com/116997107/217872174-a40bacec-2e9d-4e19-9b2e-e40e5f3e98b1.png)

2. When the data comes back, the user can see a few images of the secret term.

![Screenshot 2023-02-10 at 2 02 36 am](https://user-images.githubusercontent.com/116997107/217872290-a7df82e0-f073-4831-8c04-ee9ff18ef35b.png)

3. The user then has to guess what the images are, so they are trying to correctly guess the secret thing e.g. "bow"

Version 1 - an input box where the user is typing what their guess is and comparing that to the secret thing.
![Screenshot 2023-02-10 at 2 05 24 am](https://user-images.githubusercontent.com/116997107/217872468-68378471-9c99-4cc6-8711-27a9ae272cab.png)

Version 2 - a hangman style game where each letter is represented as an empty box, and the user can click on the empty box and type in there. This is an empty box. That can be typed into.
![Screenshot 2023-02-10 at 2 06 38 am](https://user-images.githubusercontent.com/116997107/217873048-4e19f802-3f3e-4154-b2f2-53f028b162cc.png)

Each letter they type, if its correct, will display the letter inside the box, as well as the same letter used in other boxes e.g. the letter "e"
![Screenshot 2023-02-10 at 2 07 58 am](https://user-images.githubusercontent.com/116997107/217872854-5e9099e7-5b8a-4f7d-aa31-dd9ce5e4bcea.png)

If the letter they type is incorrect, do not write the letter into the box, and also increment the counter of incorrect guesses.

![Screenshot 2023-02-10 at 2 08 30 am](https://user-images.githubusercontent.com/116997107/217874010-7ea3b4cb-1ec5-45da-9713-b6d6b68eb560.png)

The counter of incorrect guesses is displayed to the user. Doesn't specifically say when or for how long.

![Screenshot 2023-02-10 at 2 11 10 am](https://user-images.githubusercontent.com/116997107/217874532-26a0e3b2-f773-4779-956c-2bca2d8c53cf.png)

Once they finish the entire word, you display a message to congratulate the user that they got it correct with X number of incorrect guesses.

![Screenshot 2023-02-10 at 2 16 25 am](https://user-images.githubusercontent.com/116997107/217875226-b30a180f-ffbe-421b-a99b-ce887fb6c1f4.png)

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

![Screenshot 2023-02-10 at 2 38 38 am](https://user-images.githubusercontent.com/116997107/217879407-6a58f27b-0b65-495b-b571-b7e919f0bccf.png)

## Toolkit

Due to time and skill limitations I kept it as simple as possible.....Now to figure out how to deploy...Or should I attempt doing a leaderboard?

HTML, JavaScript, CSS, DOM

## APIs Used

_[API Ninjas](https://api-ninjas.com/api/randomword)_

_[Giphy Developers](https://developers.giphy.com/docs/api/#quick-start-guide)_

## Useful Resources

Okay so google.com & youtube.com has been a huge help but exactly what has been useful? If you're looking to make your own hangman - Definitely learn what HTML DOM Events are and experiment with everything you see.

_[W3schools - HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp)_

_[W3schools - CSS Gradients](https://www.w3schools.com/css/css3_gradients.asp)_

## Bugs

Some words don't seem to exist in Giphy and others do - Take this word for instance:

- Duplicidentata (No Have)
- Fovea (Actually does)

Some queries don't have enough items to have 3 gifs appear.

- unmalleable (only has 1 item available)

I'm ALWAYS a winner.[fixed]

Now...I'm losing lives at every guess be it right or wrong.[fixed]

Counters were not counting. [fixed]

Win/lose condition was not allowing anyone to win OR lose.[fixed]

Couldn't get the already used letters to print on the display[fixed]

Specific conditions need to be met to create problems.......This is for future, more skillful Inano to come through and fix...

![Screenshot 2023-02-09 at 9 36 09 pm](https://user-images.githubusercontent.com/116997107/217881200-bfb90515-9982-471d-97e4-d06364ab87d5.png)

![Screenshot 2023-02-08 at 7 14 59 pm](https://user-images.githubusercontent.com/116997107/217881470-6d641ce0-bc01-42bb-a5e4-1aedfe7d63d4.png) [fixed]

## Where we came from to where we went...

Originally I was trying to make people guess a letter however the reset button didn't work, the counters didn't work and I just....Thought lets get rid of typing altogether.

![Screenshot 2023-02-09 at 2 18 22 am](https://user-images.githubusercontent.com/116997107/217690944-7500f919-20cb-465c-8dbc-8eae60f1c5bd.png)

As a result - I made a little alphabet board which was really cute but I had issues with letters converting into other letters and the styling got really bad looking.

![Screenshot 2023-02-09 at 3 17 36 am](https://user-images.githubusercontent.com/116997107/217690916-ea574455-7c34-40b1-8b55-fcf7484a412a.png)

Anddddd here I am....

![Screenshot 2023-02-09 at 11 23 34 am](https://user-images.githubusercontent.com/116997107/217690974-6bfe6f6f-7f31-41eb-89c7-9afebff2cfea.png)

Let's just take a moment to acknowledge this cheeky fella - It took me far too long to realise what needed to be fixed but feast your eyes! The always a winner or always a loser has been fixed!

![Screenshot 2023-02-09 at 2 55 13 pm](https://user-images.githubusercontent.com/116997107/217722190-86e86f31-b1da-47bf-ad29-05bcafc87c95.png)

## Challenges...

Oh so many - at this point in time, as I learn how to code... I am slow in figuring out things for myself.

Ideas - Changing ideas.

Perception on what others say or request.

Grabbing DOM objects and then making them bend to my will was a huge hurdle.

A lot of the things I used to solve this was adaptions from my in class exercises, homework and there were times I binged watched youtube whilst reading articles on what DOM elements were and googling cultural differences between what I grew up understanding hangman was verses what I was being asked to make. Often I am shocked by how different they are.

Time, Knowledge and Patience was all against me. I learned a lot about my weaknesses.

TBH - Someone like me...here? Right now doing SOFTWARE ENGINEERING? HAHAHA Yeah Past me would have thought you were joking.

Take a seat kiddo ~ This is who we grew up to be, someone who loves challenges, enjoys learning and ever so passionately looks forward to the next emotional rollercoasters of debugging and building apps from scratch....in plain - vanilla javascript.

## Future Features

Ooooh If I had time this week!

Refresh the screen - Seriously...how did I only think of that NOW.

Leader board - Highest score in that level

Survivor board - Continue on a streak until your first unguessable word.

Actually add a hangman drawing in CSS to the right hand side (for now theres just a gap there for that)
