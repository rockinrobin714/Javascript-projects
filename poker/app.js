var Poker = function(){
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
    J:11,
    Q: 12,
    K: 13
    }
    this.betsAndRankings = [
    {royalFlush:{name: "Royal flush", 1:250, 2:500, 3:750, 4:1000, 5:4000}},
    {straightFlugh: {name: "Straight flush", 1:50, 2:100, 3:150, 4: 200, 5:125}},
    {fourOfAKind: {name: "Four of a kind", 1:25, 2:50, 3:75, 4:100, 5:125}},
    {fullHouse:{name: "Full house", 1:9, 2:18, 3:27, 4:36, 5:45}},
    {flush:{name: "Flush", 1:6, 2:12, 3:18, 4:24, 5: 30}},
    {straight:{name: "Straight", 1:4, 2:8, 3:12, 4: 16, 5: 20}},
    {threeOfAKind:{name: "Three of a kind",1:3,2:6,3:9,4:12,5:15}},
    {twoPair:{name: "Two pair",1:2,2:4,3:6,4:8,5:10}},
    {jacksOrBetter: {name:"Jacks or better", 1:1,2:2,3:3,4:4,5:5}}
    ]
  this.rankings = ["royalFlush","straightFlush"]

  this.deck = this.shuffleDeck(this.createDeck());
  this.playerHand = [];


}
Poker.prototype.createDeck = function(){
  var deck = []
  for (var key in this.cardValues){
    deck.push({number: key, suit: 'hearts'});
    deck.push({number: key, suit: 'diamonds'});
    deck.push({number: key, suit: 'clubs'});
    deck.push({number: key, suit: 'clubs'});
  }
  return deck;
}


Poker.prototype.shuffleDeck = function(deck){
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


var poker = new Poker();
