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

// Variable to store count of moves
let moves = 0;

// Variable to store stars ranking
// initial value of 3 stars
let ranking = 3;

// Array variable to store flipped cards
let cardsFlipped = [];

// Array variable to check if all cards are matched
let match = [];

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
    placeCards: function() {
        //hide modal for game won
        modal.style.display = "none";

        // reset moves
        movesElement.innerText = 0;

        // reset stars
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

    cardEvent: function() {

        // Iterate the existing cards
        for (let card of cardElements) {

            // Add Event Listener to clicked card
            card.addEventListener('click', function() {

                // if card element contains class match it is already flipped
                if (card.classList.contains('match')) {
                    return;
                } else {
                    Cards.flipCard(card);
                }
            });

        }

    },

    flipCard: function(card) {

        // Check if there are previous clicked cards
        if (cardsFlipped.length <= 1 && card.className !== 'card open show') {
            
            incrementMoves();

            // Add open show classe to card icon
            card.className += ' open show';

            // Add classes to reveal symbols
            cardsFlipped.push(card);

            // if there are two card flipped check if they match or mismatch
            if (cardsFlipped.length === 2) {

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

    cardMatch: function() {
        // add match class to each flipped card and pushes the card to match array
        for (let card of cardsFlipped) {
            card.className += ' match';
            match.push(card);
        }
        //function to fire up modal
        gameWon();
        // reset array of flipped card to continue playing
        cardsFlipped.length = 0;
    },

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

function incrementMoves() {
    moves += 1;
    movesElement.innerText = moves;
    reduceRanking();
}
// Reduce ranking function
function reduceRanking() {
    if ( moves === 32 ){
        stars[ 2 ].childNodes[ 0 ].className += '-o';
        ranking -= 1;
        console.log( ranking );
    }
    
    if ( moves === 52 ){
        stars[ 1 ].childNodes[ 0 ].className += '-o';
        ranking -= 1;
        console.log( ranking );
    }
    
    if ( moves === 82 ){
        stars[ 0 ].childNodes[ 0 ].className += '-o';
        ranking -= 1;
        console.log( ranking );
    }
}

function gameWon() {
    // When all cards are matched and flipped
    if (match.length === cardElements.length) {
        // reveal the modal window
        modal.style.display = 'block';
        // change result text to moves varible
        movesResult.innerText = moves;
        // change stars text to starsRemain variable
        starsRemain.innerText = ranking;
    }
}

function restartTheGame( e ){
    e.addEventListener('click', function() {
        // flip cards to original position
        // reset star ranking
        // reset moves
        Cards.placeCards();
    });
}

const timerMinutes = document.getElementById( 'timer-minutes' );
const timerSeconds = document.getElementById( 'timer-seconds' );

const Timer = {

    time: function( interval, element ){
        let sec = 0;
        setInterval( function(){
            sec++;
            if( sec > 59 ){ sec = 0 }

            if( sec < 10 ){
                element.innerText = `0${sec}`;
            } else {
                element.innerText = sec;
            }
        }, interval );
    },
    
    minutesAndSeconds: function( elementMinutes, elementSecons){
        this.time( 60000, elementMinutes );
        this.time( 1000, elementSecons );
    },

    clearTimer: function(){
        // clearInterval( setInterval );
    },
}

// call the timer
Timer.minutesAndSeconds( timerMinutes, timerSeconds );



// restar the game with the modal button
restartTheGame( restart );

// restar the game with deck button
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