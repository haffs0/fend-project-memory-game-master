   /*
 * Create a list that holds all of your cards
 */
const cardsFiles = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];
let cardMoves = 0;
const cardList = document.querySelector('.deck');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function newGenerateCard() {
   let output = shuffle(cardsFiles).map(function(card){
      return `<li class="card" id="card${card}"><i class=" fa ${card}"></i></li>`;
  });
    cardList.innerHTML = output.join('');
}


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

function cardFlipTile() {
   let cardItem = document.querySelectorAll('.card');
   let cardValues = [];
   let cardIds = [];
   for(let card of cardItem) {
      card.addEventListener('click', function(e) {
          if ( !card.classList.contains('open') &&
               !card.classList.contains('show') &&
               !card.classList.contains('match')) {
                  cardValues.push(card);
                  card.classList.add('open', 'show');
                  if (cardValues.length === 2) {
                     cardMoves += 2;
                     if(cardValues[0].dataset.card === cardValues[1].dataset.card) {
                         cardValues[0].classList.add("open");
                         cardValues[0].classList.add("show");
                         cardValues[0].classList.add("match");

                         cardValues[1].classList.add("open");
                         cardValues[1].classList.add("show");
                         cardValues[1].classList.add("match");
                         //Clear both arrays
                         cardValues = [];
                         //Checked to see if the whole board is cleared
                         winGame();
                     }
              }
          }
          else {
               //If cards do not match, flip cards back over
             setTimeout(function() {
               cardValues.forEach(function(card) {
                  card.classList.add('red');
                  card.classList.remove('open', 'show');
                  card.classList.remove('red');
            });
            cardValues = [];
          }, 2000);
         }
   });              
   }
}

// restart/play again buttons
let timer = document.querySelector('.timer');
var timing; 
let second = 0; 

function startTimer() {
    timing = window.setInterval(function () {
          timer.innerHTML = second + " secs";
            second++;
        }, 2000);
}
  
function resetTimer() {
  clearInterval(timing);
}

document.querySelector('.restart').addEventListener('click', resetTimer); 

//Move counter
let moves = 0;
let moveCounter = document.querySelector('.moves');
let stars = document.querySelector('.stars');
let one = document.querySelector('.one');
let two = document.querySelector('.two');
  
function moveCount() {
  moves++;
  moveCounter.innerHTML = moves;
//Begin removing stars based on move count  
  if (moves > 16 && moves < 18) {
    one.style.visibility = 'hidden';
  }
  else if (moves > 20) {
    two.style.visibility = 'hidden';
  } 
}

let allMatchCards = document.getElementsByClassName('match');
let winDispalyMessage = document.querySelector('.winning_display');
let finalTime = document.querySelector('.finalTime');
let finalRating = document.querySelector('.finalRating');
let finalMoves = document.querySelector('.finalMoves');

function winGame() {  
  if (allMatchCards.length === 16) {
    winDisplayMessage.style.display = "block";
    finalRating.innerHTML = stars.innerHTML;
    finalMoves.innerHTML = moveCounter.innerHTML;
    finalTime.innerHTML = timer.innerHTML;
  }
}

newGenerateCard();
cardFlipTile();
 
