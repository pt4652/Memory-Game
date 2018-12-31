/* Intro to Programming Nano Degree Final Project
 * Phillip Teeling
 * December 31st 2018
 * 
 *   Base code from Udacity starter code
 *   multiple items gleaned from w3schools.com
 *   Additional features from various web pages including
 *   https://gomakethings.com/
 *   https://raventools.com/
 *   http://marciavillalba.com/foobar
 *   
 */
   
var openCards = [];    
var matchedCards = 0;
var gameMoves = 0;
var sec = 0;
var numberOfStars = 3;
 
   
/*
 * Create a list that holds all of your cards
 * Select all the 'card' elements and place them into an array 
*/

var cardDeck = document.querySelectorAll(".card");
var cardsArray = Array.from(cardDeck); 


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    
    var currentIndex = array.length, temporaryValue, randomIndex;

// While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// Start game when page is loaded.
document.body.onload = newGame();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function newGame() {
    gameMoves = 0;
    matchedCards = 0;
    openCards = [];
    sec = 0;
    numberOfStars = 3;
    cardsArray = shuffle(cardsArray);
    var item = document.getElementById("deckId");
//    item.innerHTML = "";
    for (x = 0; x < cardsArray.length; x ++) {
        item.replaceChild(cardsArray[x], item.childNodes[x]);
        console.log(item.childNodes[x]);
//        item.appendChild(cardsArray[x], item.childNodes[x]);
    }
    startTimer();
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


// Display end of game message
function overlay() {
	var overLay = document.getElementById("overlay");
	overLay.style.visibility = (overLay.style.visibility == "visible") ? "hidden" : "visible";
}

// Check if all cards are matched, write Moves counter and Timer on Display
 function CheckGameProgress() {
    if (matchedCards == cardsArray.length){
        document.getElementById("totalMoves").innerHTML = gameMoves;
        document.getElementById("totalSeconds").innerHTML = sec;
        document.getElementById("totalStars").innerHTML = numberOfStars;
        overlay();
    }
    return;
 }

// Update Move counter after each move
function IncrementMoveCounter() {
    gameMoves += 1;
    document.querySelector(".moves").innerHTML = gameMoves;
}

// Start timer at the begining of the game and write to main page
// Based on time reduce visible number of stars
function startTimer(){
    var interval = setInterval(function(){
        document.querySelector(".timer").innerHTML = sec + " secs";
        sec++;
        var stars = document.querySelectorAll(".fa-star");
        if (sec == 40){
            stars[2].style.visibility = "hidden";
            numberOfStars = numberOfStars - 1;
        }
        if (sec == 60){
            stars[1].style.visibility = "hidden";
            numberOfStars = numberOfStars - 1;
        }
    },1000);
}

// Check is the two cards turned over match
var doMatchCards = function() {
    if (openCards[0].id == openCards[1].id) {
        return true;
    }
    else {
        return false;
    }

}

// If not turn the cards back over
function unFlipCards() {
    openCards[0].classList.remove("open","show");
    openCards[1].classList.remove("open","show");  
    openCards = [];
}


/* Create a function to add the classes to each card */
function turnCard() {
    if (openCards.length < 2) {
        this.classList.add("open","show");
        openCards.push(this);
    }
    if (openCards.length == 2) {
        //check is match
        if (doMatchCards() == true) {
            //lock cards open
            openCards[0].classList.add("match");
            openCards[0].removeEventListener("click", turnCard);
            openCards[1].classList.add("match");
            openCards[1].removeEventListener("click", turnCard);
            matchedCards = matchedCards + 2;
            openCards = [];
        }
        else {
            // turn cards back over
            setTimeout(unFlipCards, 1200);
        }
    IncrementMoveCounter();
    CheckGameProgress();
    }
}


/* Loop through the array adding the event listener */
for (x = 0; x < cardDeck.length; x ++) {
    cardsArray[x].addEventListener("click", turnCard);
    }; 



//    Restart game from panel not working
function restartGame() {
    window.location.reload(true);
}
