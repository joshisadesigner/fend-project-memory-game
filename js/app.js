// Take html elements from the dom
const cardElements = document.getElementsByClassName('card');

// Variable to store flipped cards
let cardsFlipped = [];

// Variable to check if cards matched
let match = false;

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
        let symbols = shuffle(symbolClasses);
        for (let i = 0; i < cardElements.length; i++) {

            // Creates the innerHTML to place inside html element with class 'card'
            let theHtml = `<i class="card-icon fa ${symbols[ i ]}"></i>`;

            // Add element inner html with created html
            cardElements[i].innerHTML = theHtml;
        }
        Cards.turnOver();
    },

    cardMatch: function() {
        let match = true;
        for ( let cards of cardsFlipped ) {
            cards.className += ' match';
        }
    },

    cardMismatch: function() {
        let match = false;
        for ( let cards of cardsFlipped ) {
            cards.className += ' mismatch';
        }
    },

    turnOverTimer: function( arrayOfCards ) {
        setTimeout( function() {
            let cards = arrayOfCards;
            for( let card of cards ) {
                card.classList = 'card';
            }
            cards.length = 0;
        }, 1000 );
    },

    turnOver: function( ) {

        // Iterate the existing cards
        for ( let card of cardElements ) {

            // Add Event Listener to clicked card
            card.addEventListener('click', function() {

                // console.log( card.childNodes[ 0 ].classList );

                // Check if there are previous clicked cards
                if ( cardsFlipped.length <= 1 )  {
                    card.className += ' open show';

                    // Add classes to reveal symbols
                    cardsFlipped.push(card);

                    if ( cardsFlipped.length === 2 ) {

                        if ( cardsFlipped[ 0 ].childNodes[ 0 ].classList === cardsFlipped[ 1 ].childNodes[ 0 ].classList ) {
                            Cards.cardMatch();
                            cardsFlipped.length = 0;
                        } else {
                            Cards.cardMismatch();
                            Cards.turnOverTimer( cardsFlipped );
                        }
                    }
                }
            });

        }

    },
};

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
