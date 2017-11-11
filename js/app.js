// Take html elements from the dom
const cardElements = document.getElementsByClassName('card');

// get moves element to store moves
const movesElement = document.getElementById('moves');

// get modal
const modal = document.getElementById('modal');

// get modal move result
const movesResult = document.getElementById('moves-result');

// get modal stars result
const starsRemain = document.getElementById('stars-remain');

// get modal restart button
const restart = document.getElementById('restart');

// Take html elements from the dom
const resetButton = document.getElementById('restartButton');

// get start elements
const stars = document.getElementById( 'stars' ).children;

// get minutes element under deck
const timerMinutes = document.getElementById( 'timer-minutes' );

// get seconds element under deck
const timerSeconds = document.getElementById( 'timer-seconds' );

// get minutes element in modal
const timerMinutesModal = document.getElementById( 'timer-minutes-modal' );

// get seconds element in modal
const timerSecondsModal = document.getElementById( 'timer-seconds-modal' );

// Variable to store count of moves
let moves = 0;

// Varible for timer numbers
let min = 0;
let sec = 0;

// Variable to store stars ranking
// initial value of 3 stars
let ranking;

// Array variable to store flipped cards
let cardsFlipped = [];

// Array variable to check if all cards are matched
let match = [];

// Variable to check if the game is playing or stop
let progressSeconds;
let progressMinutes;

let clicksCount = 0;

/*
 * Create a list that holds all of your cards
 */
const symbolClasses = [
    'fa-anchor', 'fa-bicycle', 'fa-bolt', 'fa-bomb', 'fa-cube', 'fa-diamond', 'fa-leaf', 'fa-paper-plane-o',
    'fa-anchor', 'fa-bicycle', 'fa-bolt', 'fa-bomb', 'fa-cube', 'fa-diamond', 'fa-leaf', 'fa-paper-plane-o'
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


const Cards = {
    
    /**
     * @description starts of resets the game
     *      1- Empties `cardsFlipped` array.
     *      2- Clears the `moves` variable to beging from 0
     *      3- Reset `clicksCount` back to 0
     *      4- Hides modal by setting its css display property with value "none";
     *      5- Sets text of moves deck element back to 0
     *      6- Resets `ranking` back to 3 which is the number of stars
     *      7- Resets the stars on the deck to 'fa fa-star' classes
     *      8- Empties `match` array
     *      9- Shuffles `symbolClasses` array which represents the icon in each card of the deck
     *     10- Creates each card html element on the deck
     *     11- Calls `Cards.cardEvent()`
    */
    placeCards: function() {

        // Clear any flipped card
        cardsFlipped = []

        //clear moves
        moves = 0;
        
        //clear clicks
        clicksCount = 0;
        
        //hide modal for game won
        modal.style.display = "none";

        // reset moves
        movesElement.innerText = 0;

        // reset stars
        ranking = 3;
        for( let i = 0; i < stars.length; i++ ){
            stars[ i ].childNodes[ 0 ].className = 'fa fa-star';
        }

        // clear array of matched cards
        match = [];

        //shuffle card symbols
        let symbols = shuffle(symbolClasses);

        // Create the cards
        for (let i = 0; i < cardElements.length; i++) {

            // clear card open show and match classes
            cardElements[i].className = 'card';

            // Creates the innerHTML to place inside html element with class 'card'
            let theHtml = `<i class="card-icon fa ${symbols[ i ]}"></i>`;

            // Add element inner html with created html
            cardElements[i].innerHTML = theHtml;
        }

        // Call function on to activate card events
        Cards.cardEvent();
    },

    /*
     * set up the event listener for a card. If a card is clicked:
     *  - display the card's symbol (put this functionality in another function that you call from this one)
     *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
     *  - if the list already has another card, check to see if the two cards match
     *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
     *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
     *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
     *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
     */


    /** 
     * @description Represent the click event for the cards
    */
    cardEvent: function() {

        // Iterate the existing cards
        for (let card of cardElements) {

            // Add Event Listener to clicked card
            card.addEventListener('click', function() {
                // if card element contains class match it is already flipped
                if (card.classList.contains('match')) {
                    return;
                } else {
                    this.flipCard(card);
                }
                // increments the number of clicks
                clicksCount++;
                // start the timer if number of clicks is 1
                if( clicksCount === 1 ){
                    Timer.starStopTime( true );
                }
            }.bind(this) );
        }

    },

    /**
     * @description Flips the cards on the deck and calls the animations for match or mismatch
     * @param { html element } card
     */

    flipCard: function(card) {

        // Check if there are previous clicked cards
        if (cardsFlipped.length <= 1 && card.className !== 'card open show') {

            // Add open show classe to card icon
            card.className += ' open show';

            // Add classes to reveal symbols
            cardsFlipped.push(card);

            // if there are two card flipped check if they match or mismatch
            if (cardsFlipped.length === 2) {
                
                // increment moves
                incrementMoves();

                // Create variable that holds the class name of the childen of card elements
                let cardOpenOne = cardsFlipped[0].childNodes[0].className;
                let cardOpenTwo = cardsFlipped[1].childNodes[0].className;

                if (cardOpenOne === cardOpenTwo) {
                    Cards.cardMatch(cardsFlipped);
                } else {
                    Cards.cardMismatch(cardsFlipped);
                }
            }
        }
    },

    /**
     * @description Add match class to each flipped card and pushes the card to match array
     */

    cardMatch: function() {

        for (let card of cardsFlipped) {
            card.className += ' match';
            match.push(card);
        }
        //function to fire up modal
        gameWon();
        // reset array of flipped card to continue playing
        cardsFlipped.length = 0;
    },
    
    /**
     * @description Add mismatch class to each flipped card and pushes the card to match array
     */

    cardMismatch: function(arrayOfCards) {
        // add mismatch class to each flipped card
        for (let card of cardsFlipped) {
            card.className += ' mismatch';
        }

        // set waiting time of 1s to remove open show classes to each flipped card
        setTimeout(function() {
            for (let card of cardsFlipped) {
                card.classList = 'card';
            }
            // reset array of flipped card to continue playing
            cardsFlipped.length = 0;
        }, 1000);
    },
};

/**
 * @description Increments `moves` variable and writes its value to the html element on the deck
 *              calls for the `reduceRanking()` function
 */
function incrementMoves() {
        // increment moves variable by one
        moves += 1;
        // changes moves text on html
        movesElement.innerText = moves;
        // changes ranking
        reduceRanking();
}

/**
 * @description Change the appearance of the stars representing the ranking on the deck.
 */
function reduceRanking() {
    // depending on how many moves the player has done change star appearing
    if ( moves === 12 ){
        stars[ 2 ].childNodes[ 0 ].className += '-o';
        ranking -= 1;
        console.log( stars[ 2 ].childNodes[ 0 ].className );
    }

    if ( moves === 18 ){
        stars[ 1 ].childNodes[ 0 ].className += '-o';
        ranking -= 1;
        console.log( stars[ 1 ].childNodes[ 0 ].className );
    }

    if ( moves === 24 ){
        stars[ 0 ].childNodes[ 0 ].className += '-o';
        ranking -= 1;
        console.log( stars[ 0 ].childNodes[ 0 ].className );
    }
}

/**
 * @description Checks if the number of matched cards is equal to the number of existing cards
 *              and clear the innerText of the modal minutes span if the minutes didn't change
 */
function gameWon() {
    // When all cards are matched and flipped
    if (match.length === cardElements.length) {
        // clear minutes in modal
        if( timerMinutesModal.innerText === '00') {
            timerMinutesModal.innerText = ``;
        }
        // reveal the modal window
        modal.style.display = 'block';
        // change result text to moves varible
        movesResult.innerText = moves;
        // change stars text to starsRemain variable
        starsRemain.innerText = ranking;
        // stop timer
        Timer.starStopTime( false );
    }
}

/**
 * @description add click event to reset buttons on the deck and modal
 * @param { htmk element } e 
 */
function restartTheGame( e ){
    e.addEventListener('click', function() {
        // flip cards to original position
        // reset star ranking
        // reset moves
        Cards.placeCards();
        // revert time to 0
        Timer.resetTimerText();
        // stop timer
        Timer.starStopTime( false );
    });
}

const Timer = {

    /**
     * @description Starts of Stops seconds
     * @param { boolean } secondsFlag
     */
    secondsManager: function( secondsFlag ){
        if( secondsFlag ){
            progressSeconds = setInterval( function(){ 
                sec++; 
                console.log( sec );
                // if one seconds have passed reset the num counter
                if( sec === 60 ){ sec = 0 }
                
                //add leading 0 when the number is unit
                if( sec < 10 ){
                    timerSeconds.innerText = `0${sec}`;
                } else {
                    // display the generated number without leading 0
                    timerSeconds.innerText = sec;
                }
        
                if( sec != 1 ){
                    timerSecondsModal.innerText = `${sec} seconds`;
                } else {
                    timerSecondsModal.innerText = `${sec} second`;
                }
            }, 1000 );
        } else {
            clearInterval( progressSeconds );
            // returns secons variables to 0
            sec = 0;
        }
    },
    
    /**
     * @description Starts of Stops minutes
     * @param { boolean } minutesFlag
     */
    minutesManager: function( minutesFlag ){
        if( minutesFlag ){
            progressMinutes = setInterval( function(){ 
                min++; 
                // if one seconds have passed reset the num counter
                if( min === 60 ){ min = 0 }
                
                //add leading 0 when the number is unit
                if( min < 10 ){
                    timerMinutes.innerText = `0${min}`;
                } else {
                    // display the generated number without leading 0
                    timerMinutes.innerText = min;
                }

                if( min > 0 ){
                    //add leading 0 when the number is unit
                    if( min === 1 ){
                        timerMinutesModal.innerText = ` ${min} minute`;
                    } else if ( min > 1 ) {
                        // display the generated number without leading 0
                        timerMinutesModal.innerText = ` ${min} minutes`;
                    }
                } 
            }, 60000);
        } else {
            clearInterval( progressMinutes );
            // returns minutes variables to 0
            min = 0;
        }
    },
    
    /**
     * @description Triggers `secondsManager` and `minutesManager` sending the parameter to each of them
     * @param { boolean } isPlaying
     */
    starStopTime: function( isPlaying ) {
        Timer.secondsManager( isPlaying );
        Timer.minutesManager( isPlaying );
    },

    /**
     * @description Creates an array of the timer html elements and writes '00' to them
     */
    resetTimerText: function(){
        // take arguments corresponding to the html element for minutes and seconds
        let textArray = [ timerSeconds, timerSecondsModal, timerMinutes, timerMinutesModal  ];

        // changes html text of elements on the array
        for( let text of textArray ){
            text.innerText = '00'
        }
    },
}

/**
 * @description Restar the game with the modal button
 */
restartTheGame( restart );

/**
 * @description Restar the game with deck button
 */
restartTheGame( resetButton );

// Shuffle cards everytime the page is reload
Cards.placeCards();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
