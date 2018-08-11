   /*
 * Create a list that holds all of your cards
 */
const cardsFiles = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb" ];
let cardValues = [];
let cardIds = [];
let cardMoves = 0;
const cardList = document.querySelector('.deck');
const cardItem = document.querySelectorAll('.card')
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function cardMatch(value) {
    return value.reduce((n,m) => { n === m; });
}

function newGenerateCard() {
   let output = ' ';
   cardsFiles.shuffles();
   cardsFiles.map(function(cad) {
      return output += '<li class="card" id="card${cad}"><i class="${cad}"></i></li>';
  });
    cardList.innerHTML = output;
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
/*function cardFlipTile(cardd, val ) {
    if (cardd.innerHTML === "" && cardValues.length < 2) {
        cardd.classList.toggle("open");
        cardd.classList.toggle("show");
        let insideItem = '<i class=`${val}></i>';
        cardd.appendChild(insideItem);
        if (cardValues.length === 0) {
            cardValues.push(val);
            cardIds.push(cardd.id);
        }
        else if (cardValues === 1) {
            cardValues.push(val);
            cardIds.push(cardd.id);
            if(cardMatch(...cardValues)) {
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
            if(!(cardMatch(...cardValues))) {
                card1.classList.toggle('red');
                card1.innerHTML = " ";
                card2.classList.toggle('red');
                card2.innerHTML = " ";
                //Clear both arrays
                cardValues = [];
                cardIds = [];
            }
        }
        setTimeOut(flipCard, 2000);
    }
}

cardItem.addEventListener(click, function() {
    cardFlipTile(this, cardFiles[shuffles()] );
});*/

newGenerateCard();

 
