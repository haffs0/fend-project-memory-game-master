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

function cardMatch(value) {
    return value.reduce((n,m) => { n === m; });
}
function cardFlipTile() {
   let cardItem = document.querySelectorAll('.card');
   let cardValues = [];
   let cardIds = [];
   for(let card of cardItem) {
      card.addEventListener('click', function(e) {
          if ( !card.classList.contains('open') &&
               !card.classList.contains('show') &&
               !card.classList.contains('match')) {
                  card.classList.add('open', 'show');
                  if (cardValues.length === 0) {
                     cardValues.push(card);
                     cardIds.push(card.id);
                  }
                  else if (cardValues.length === 1) {
                     cardValues.push(card);
                     cardIds.push(card.id);
                     if(cardMatch(...cardValues)) {
                         cardValues[0].classList.add("match");

                         cardValues[1].classList.add("open");
                         cardValues[1].classList.add("show");
                         cardValues[1].classList.add("match");

                         cardMoves += 2;
                         //Clear both arrays
                         cardValues = [];
                         cardIds = [];
                         //Checkedn to see if the while board is cleared
                         if(cardMoves === cardFiles.length) {
                             alert("Congratulation! you won with `${cardMoves}` and Stars Wooooooo!");
                             cardList.innerHTML = " ";
                             newGenerateCard();
                         }
                     }
              }
          }
          else {
              function flipCard() {
                      //flip the 2 card back over
                      let card0 = document.getElementById(cardIds[0]);
                      let card1 = document.getElementById(cardIds[1]);
                      card0.classList.add('red');
                      card0.innerHTML = " ";
                      card1.classList.add('red');
                      card1.innerHTML = " ";
                      //Clear both arrays
                      cardValues = [];
                      cardIds = [];
                 
              }
              setTimeOut(flipCard, 2000);
          }
   });              
   }
}

newGenerateCard();
cardFlipTile();
 
