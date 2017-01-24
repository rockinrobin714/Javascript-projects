var Blackjack = function(){
  this.cardValues = {
    //A:[1,11],
    A: 11,
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
  this.totalMoney = 100;
  this.deck = this.shuffleDeck(this.createDeck());
  this.playerHand = [];
  this.dealerHand = [];
  this.state = "play";
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

Blackjack.prototype.dealOneToPlayer = function() {  
  var card = this.deck.shift();
  this.playerHand.push(card);
  $('.player').append(`<div class='card suit${card.suit}'><p>${card.number}</p></div>`);
}

Blackjack.prototype.dealOneToDealer = function() {  
  var card = this.deck.shift();
  this.dealerHand.push(card);
  if (this.dealerHand.length===1){
    $('.dealer').append("<div class='card cardback'></div>");
  } else {
    $('.dealer').append(`<div class='card suit${card.suit}'><p>${card.number}</p></div>`);
  }
}

Blackjack.prototype.calculatePlayer = function() {  
  var total = 0;
  for (var i = 0; i< this.playerHand.length;i++){
    total += this.cardValues[this.playerHand[i].number]
  }
  if (total>21){
    this.state = "lose";
    $('#player-score').html(total + " BUST!!");
    this.endGame();
  } else{
    $('#player-score').html(total);
  }  
}

Blackjack.prototype.calculateDealerBefore = function() {  
  var total = 0;
  for (var i = 1; i< this.dealerHand.length;i++){
    total += this.cardValues[this.dealerHand[i].number]
  }
  $('#dealer-score').html(total)
}

Blackjack.prototype.calculateDealerAfter = function() {  
  var total = 0;
  for (var i = 0; i< this.dealerHand.length;i++){
    total += this.cardValues[this.dealerHand[i].number]
  }
  $('#dealer-score').html(total)
}

Blackjack.prototype.stay = function(){
  $('.dealer').html('');
  for (var i = 0; i< this.dealerHand.length;i++){
    $('.dealer').append(`<div class='card suit${this.dealerHand[i].suit}'><p>${this.dealerHand[i].number}</p></div>`);
  }
  this.calculateDealerAfter();
  var dealerTotal = $('#dealer-score').html();
  while (dealerTotal<17){
    this.dealOneToDealer();
    this.calculateDealerAfter();
    dealerTotal = $('#dealer-score').html();
  }
  playerTotal = $('#player-score').html();
  console.log("player total is", playerTotal, "dealer total is", dealerTotal)
  if (dealerTotal>21){
    $('#dealer-score').html(dealerTotal + " BUST!!!");
    this.state="win";
    this.endGame();
  } else if (dealerTotal>playerTotal){
    this.state = "lose";
    this.endGame()
  } else {
    this.state = "win";
    this.endGame();
  }
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

Blackjack.prototype.endGame = function(){
  $('#win-lose').show();
  if (this.state==="lose"){
    $('#win-lose').html('Sorry, you lose! Try again!');
  } else {
    $('#win-lose').html('You won!!');
  }
  $('#hit').hide();
  $('#stay').hide();
  $('#deal').show();
  this.deck = this.shuffleDeck(this.createDeck());
  this.playerHand = [];
  this.dealerHand = [];
}

Blackjack.prototype.firstDeal = function(){
  $('#dealer-score').html('?');
  $('#player-score').html('?');
  setTimeout(this.dealOneToPlayer.bind(this),500);
  setTimeout(this.calculatePlayer.bind(this),500);
  setTimeout(this.dealOneToDealer.bind(this),1000);
  setTimeout(this.dealOneToPlayer.bind(this),1500);
  setTimeout(this.calculatePlayer.bind(this),1500);
  setTimeout(this.dealOneToDealer.bind(this),2000);
  setTimeout(this.calculatePlayer.bind(this),1500);
  setTimeout(this.calculateDealerBefore.bind(this),2000);
}
var blackjack = new Blackjack();

$('#deal').click(function(){
  $('.player').html('');
  $('.dealer').html('');
  blackjack.firstDeal();
  $('#win-lose').hide();
  $('#hit').show();
  $('#stay').show();
  $('#deal').hide();

  })
$('#hit').click(function(){
    blackjack.dealOneToPlayer();
    blackjack.calculatePlayer();
  })

  $('#stay').click(function(){
    blackjack.stay();
  })

