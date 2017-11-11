# Memory Game Project

## How to play this application

* Clone or download the [repository](https://github.com/joshisadesigner/fend-project-memory-game.git)
* Open `index.html` on your default browser.

## Instructions

When you open the application a game will be automatically started

* Turn over any two cards.
* If the two cards dont match they will return to the original position.
* Keep Turning card pairs.
* Remember whats on each card.
* The game is over when all the cards have been matched.

## Dependencies

### [Font Awesome](http://fontawesome.io)
Font Awesome is an icon font and css tool kit.

### [Animate.css](https://github.com/daneden/animate.css)
Animate.css is a collection of css animations.

### [Google Fonts](https://github.com/daneden/animate.css)
Google Fonts is a catalog of open source web fonts

## Technologies
* HTML
* CSS
* JavaScript


## Development

`app.js`  gets the different html elements and creates its variables to be 
used on the different objects and methos. 

### Global Variables

Take elements of the DOM

    cardElements, movesElement, modal, movesResult, starsRemain, restart, resetButton, stars, timeMinutes, 
    timerSeconds, timerMinutesModal, timerSecondsModal.

Integer variables

    moves, ranking, min, sec

Array variables

    cardsFlipped, match, symbolClasses

Time interval
    
    progressSeconds, progressMinutes

### Object and Functions

#### Cards Object
set of methods for the different acctions applied to the cards html elements.

#### placeCards()
This method is called on the global scope of the document and the `restartTheGame` function. In this method the Timer is started with `Timer.starStopTime`, the `cardsFlipped` array is emptied, `moves` variable is set to 0, Modal is hidden, resets the ranking and epmties `match` array. 

Shuffles symbols with `shuffle` function, places the card symbols in each of the html cards elements and activates the card events with `Cards.cardEvent` method.

#### CardEvent()

Iterate on the existing card and add clicking resonso to each of the card html elements, Calls 'flipCard' method to when the card doesn't have the `match` css class.

#### flipCard()

Checks if there are previously flipped cards and add css clases when the `cardFlipped` lenght is less than or equal to 1 and if the card doesn't have the classes `card open show` which in that case it means the card is already flipped. 

Adds each flipped card to the `cardsFlipped` array, and increments the `moves` variable whenever there are 2 cards flipped on the deck. Also checks that the icon on the card are the same or different.

#### cardMatch()

Adds `match` css class when the flipped cards are the same. And sets `cardsFlipped` array to 0 to continue the game if ther are unmatched cards on the deck.

#### cardMismatch()

Add `mismatch` css class when the flipped cards are different and flips back each flipped card after the defined time.

#### incrementMoves()

Increment `moves` variable, changes the moves counter and calls for `reduceRanking` to change the stars appearance.

#### reduceRanking()

Checks if the number of moves on the `moves` variable correspond to some number of mvoes to change the stars appearance.

#### gameWon()

When the `match` array lenght is equal to the `cardsElement` lenght clears the minutes on the modal if minutes is 0, reveals de modal changing css display property adds `moves` and `ranking` variable to the modal and stops the timer.

#### restartTheGame()

Function for restart buttons on the deck and the modal, it add a click event that stops the timer, calls for `Cards.placeCards` to reset everything on the deck and clears the timer text.

#### Timer Object

set of methods for the time intervals.

#### secondsManager() and minutesManager()

Check if the game is running or is stopped if it's running sets interval o 1000ms for seconds and 60000ms for minutes, increment the `min` or `sec` variable and resets each variable to 0 when it reach 60 minutes or seconds, if minutes or seconds is less than 10 outputs the minutes or seconds with leading 0.

For secons if it's not 1 writes the `sec` value on the modal plural otherwise singular. For minutes only if `min` value is greater than 0 writes the `min` valuo on the modal.

If the the game is stopped clears the interval.

#### starStopTime()

Takes a boolean parameter to check if the game is running or stopped and calls for each of the seconds or minutes manager method.

#### timerRestart()

Restart the text for the seconds and minutes html elements and sets `sec` and `min` variables back to 0.

#### shuffle()

Takes an array and shuffles its index to create a new array.



