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
  this.bet = 0;
  this.deck = this.shuffleDeck(this.createDeck());
  this.playerHand = [];
  this.dealerHand = [];
  this.playerScore;
  this.dealerScore;
  this.state = "play";
}
Blackjack.prototype.createDeck = function(){
  var deck = []
  for (var key in this.cardValues){
    deck.push({number: key, suit: 'hearts'});
    deck.push({number: key, suit: 'diamonds'});
    deck.push({number: key, suit: 'clubs'});
    deck.push({number: key, suit: 'spades'});
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
  var total = [0];
  for (var i = 0; i< this.playerHand.length;i++){
    if (this.playerHand[i].number==="A"){
      total[1]=total[0]+11;
      total[0]+=1;
    } else {
      total[0] += this.cardValues[this.playerHand[i].number];
      if (total[1]){
        total[1] += this.cardValues[this.playerHand[i].number];
      }
    }
  }
  if (total[1]>21){
        total = total.slice(0,1);
      }
  if (total[0]>21){
    this.state = "lose";
    $('#player-score').html(total[0] + " BUST!!");
    this.endGame();
  } else{
    this.playerScore = total;
    if (total[1]){
      $('#player-score').html(total[0] + ' or ' + total[1]);
    } else {
      $('#player-score').html(total);
    }
  }  
}

Blackjack.prototype.calculateDealerBefore = function() {  
  if (this.dealerHand[1].number==="A"){
    $('#dealer-score').html('1 or 11')
  } else {
    $('#dealer-score').html(this.cardValues[this.dealerHand[1].number]);
  }
}

Blackjack.prototype.calculateDealerAfter = function() {  
  var total = [0];
  for (var i = 0; i< this.dealerHand.length;i++){
    if (this.dealerHand[i].number==="A"){
      total[1]=total[0]+11;
      total[0]+=1;
    } else {
      total[0] += this.cardValues[this.dealerHand[i].number];
      if (total[1]){
        total[1] += this.cardValues[this.dealerHand[i].number];
      }
    }
  }
  if (total[1]>21){
        total = total.slice(0,1);
    }
  this.dealerScore = total;
  if (total[1]){
    $('#dealer-score').html(total[0] + ' or ' + total[1]);
  } else {
    $('#dealer-score').html(total);
  } 
}


//TODO: fix the scoring for this if Aces
Blackjack.prototype.stay = function(){
  $('.dealer').html('');
  for (var i = 0; i< this.dealerHand.length;i++){
    $('.dealer').append(`<div class='card suit${this.dealerHand[i].suit}'><p>${this.dealerHand[i].number}</p></div>`);
  }
  this.calculateDealerAfter();
  while (this.dealerScore[0]<17){
    this.dealOneToDealer();
    this.calculateDealerAfter();
  }
  this.dealerScore.sort();
  this.playerScore.sort();
  if (this.dealerScore[0]>21){
    $('#dealer-score').html(this.dealerScore + " BUST!!!");
    this.state="win";
  } else if (this.dealerScore[0]>this.playerScore[0]){
    this.state = "lose";
  } else if (this.dealerScore[0]===this.playerScore[0]){
    this.state='tie';
  } else {
    this.state = "win";
  }
  this.endGame()
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
    $('#win-lose').html(`Sorry, you lost ${blackjack.bet}! Try again! `);
  } else if (this.state==='win'){
    $('#win-lose').html(`You won ${blackjack.bet}!!  `);
    this.totalMoney += this.bet*2;
    $('#total-money').html('Current amount of money: '+this.totalMoney);
  } else {
    this.totalMoney += this.bet
    $('#win-lose').html(`You tied, so we will refund you ${blackjack.bet}.  `);
  }
  $('#bet').html("<div id='bet'>Insert bet<input/></div>");
  $('#hit').hide();
  $('#stay').hide();
  $('#deal').show();
  this.deck = this.shuffleDeck(this.createDeck());
  this.playerHand = [];
  this.dealerHand = [];
}
Blackjack.prototype.subtractBet = function(){
  this.totalMoney = this.totalMoney - this.bet;
  $('#total-money').html('Current amount of money: '+this.totalMoney);
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
  blackjack.bet = parseInt($('input').val())
  if(blackjack.bet>0 && blackjack.bet<=blackjack.totalMoney){
    blackjack.subtractBet();
    $('#bet').html('Current bet: ' + blackjack.bet)
    $('.player').html('');
    $('.dealer').html('');
    blackjack.firstDeal();
    $('#win-lose').hide();
    $('#hit').show();
    $('#stay').show();
    $('#deal').hide();
  } else {
     alert('Please insert a valid bet');
  }
})

$('#hit').click(function(){
    blackjack.dealOneToPlayer();
    blackjack.calculatePlayer();
  })

  $('#stay').click(function(){
    blackjack.stay();
  })

