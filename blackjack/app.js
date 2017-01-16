var blackjack = function(){
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

  }
  this.deck = [];
  this.hand = [];
}
blackjack.prototype.reveal = funciton(){

}
blackjack.prototype.hit = function() {	this.hand.push(this.deck[Math.round(this.deck.length*Math.random)]
}

blackjack.prototype.stay = function(){

}