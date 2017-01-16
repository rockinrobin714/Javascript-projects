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
  this.playerHand = [];
  this.dealerHand = [];
}
Blackjack.prototype.createDeck = function(){
  var deck = []
  for (var key in this.cardValues){
    deck.push({number: key, suit: 'hearts'});
    deck.push({number: key, suit: 'diamonds'});
    deck.push({number: key, suit: 'clubs'});
    deck.push({number: key, suit: 'clubs'});
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
Blackjack.prototype.dealOneToPlayer = function() {  
  this.playerHand.push(this.deck.shift())
}

Blackjack.prototype.dealOneToDealer = function() {  
  this.dealerHand.push(this.deck.shift())
}

Blackjack.prototype.stay = function(){
  //do nothing
}
Blackjack.prototype.shuffleDeck = function(deck){
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

Blackjack.prototype.firstDeal = function(){
  this.dealOneToPlayer();
  this.dealOneToDealer();
  this.dealOneToPlayer();
  this.dealOneToDealer();
  console.log(this.playerHand);
  console.log(this.deck);
}

$('#deal').click(function(){
  var blackjack = new Blackjack();
  blackjack.firstDeal();
})
