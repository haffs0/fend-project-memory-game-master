   /*
 * Create a list that holds all of your cards
 */
const playCards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];
const deck = document.querySelector('.deck');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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


function initGame() {
  countTime();
  let cardHTML = shuffle(playCards).map(function(card) {
    //return generateCard(card);
   return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
  });
 
  deck.innerHTML = cardHTML.join('');
  
  let allCards = document.querySelectorAll('.card');
  let cardsValues = [];  
  
allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {
    
    if (
      document.querySelector(".card").getElementsByTagName('i')[0].innerHTML == "" && cardsValues.length < 2) {
      cardsValues.push(card);
      card.classList.add('open', 'show');
      
      if (cardsValues.length == 2) {
        countMoves();
        //If the cards matches leave it
        if (cardsValues[0].dataset.card == cardsValues[1].dataset.card) {
          cardsValues[0].classList.add('match');
          cardsValues[0].classList.add('open');
          cardsValues[0].classList.add('show');
          
          cardsValues[1].classList.add('match');
          cardsValues[1].classList.add('open');
          cardsValues[1].classList.add('show');
          
          cardsValues = [];
          
          winGame();
        } else {
          //If cards do not match, flip cards back over
          setTimeout(function() {
            cardsValues.forEach(function(card) {
              card.classList.remove('open', 'show');
            });
            cardsValues = [];
          }, 1000);
        } 
      }
    }
  });
});
   
//Moves counter
let moves = 0;
let movesCounter = document.querySelector('.moves');
let stars = document.querySelector('.stars');
let firstStar = document.querySelector('.first_stars');
let secondStar = document.querySelector('.second_stars');
  
function countMoves() {
  moves++;
  movesCounter.innerHTML = moves;
//stars reduction  
  if (moves > 8 && moves < 10) {
    firstStar.style.visibility = 'hidden';
  }
  else if (moves > 16) {
    secondStar.style.visibility = 'hidden';
  } 
}
  
   
//Timer that resets with restart/play again buttons
let stopwatch = document.querySelector('.stopwatch');
var timing; 
let second = 0; 

function countTime() {
    timing = window.setInterval(function () {
          stopwatch.innerHTML = second + " secs";
            second++;
        }, 1000);
}
  
function resetTimer() {
  clearInterval(timing);
}

document.querySelector('.restart').addEventListener('click', resetTimer);  
//Modal- tutorial from https://www.w3schools.com/howto/howto_css_modals.asp
 //win messages section  
let allMatchedCards = document.getElementsByClassName('match');
let modal = document.querySelector('.modal');
let finalTime = document.querySelector('.finalTime');
let finalRating = document.querySelector('.finalRating');
let finalMoves = document.querySelector('.finalMoves');

function winGame() {  
  if (allMatchedCards.length === 16) {
    modal.style.display = "block";
    finalRating.innerHTML = stars.innerHTML;
    finalMoves.innerHTML = movesCounter.innerHTML;
    finalTime.innerHTML = stopwatch.innerHTML;
  }
}
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
//Play again button will clear modal and reset timer
document.querySelector('.button').addEventListener('click', playAgain);
document.querySelector('.button').addEventListener('click', resetTimer);
document.querySelector('.restart').addEventListener('click', playAgain);

function playAgain() {
  modal.style.display = "none";
  movesCounter.innerHTML = 0;
  firstStar.style.visibility = 'visible';
  secondStar.style.visibility = 'visible';
}
}

initGame();
