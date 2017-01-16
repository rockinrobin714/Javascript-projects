var Blackjack = function(){
  this.cardValues = {
    A:[1,11],
    2: 2,
    3:3,
    4:4,
    5:5,
    6:6,
    7:7,
    8:8,
    9:9,
    10:10,
    J:10,
    Q: 10,
    K: 10
    }

  this.deck = this.shuffleDeck(this.createDeck());
  this.hand = this.dealTwo();
}
Blackjack.prototype.createDeck = function(){
  var deck = []
  for (var key in this.cardValues){
    for (let i = 0;i<4;i++){
    //not worrying about suits, just pushing into a deck
    deck.push(key)
    }
  }
  return deck;
}
Blackjack.prototype.reveal = function(){
  let total = 0;
  for (var i = 0;i<this.hand.length;i++){
    if (this.hand[i]!=='A'){
    //count total
    } else {
    //make a total with A = 1 and another total with A = 11
    }
  }
}
Blackjack.prototype.hit = function() {  
  this.hand.push(this.deck[Math.round(this.deck.length*Math.random)])
}

Blackjack.prototype.stay = function(){
  //do nothing
}
Blackjack.prototype.shuffleDeck = function(){
  let deckCopy = deck.slice();
  let currentIndex = deckCopy.length-1;
  while (currentIndex>=0){
    let randomIndex = Math.floor(Math.random() * currentIndex);
    let temp = deckCopy[randomIndex];
    deckCopy[randomIndex]=deckCopy[currentIndex];
    deckCopy[currentIndex]=temp;
    currentIndex--
  }
 return deckCopy;
}

Blackjack.prototype.dealTwo = function(){
  var hand = []
  hand.push(this.hit());
  hand.push(this.hit());
  return hand;
}
