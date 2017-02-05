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
  this.currentTurn = 'first' 
  this.rankings = ["royalFlush","straightFlush"]
  this.bet = 0;
  this.deck = this.shuffleDeck(this.createDeck());
  this.hand = [];
  this.credits = 100;
  this.held = [];

}
Poker.prototype.createDeck = function(){
  var deck = []
  for (var key in this.cardValues){
    deck.push({number: key, suit: 'hearts'});
    deck.push({number: key, suit: 'diamonds'});
    deck.push({number: key, suit: 'clubs'});
    deck.push({number: key, suit: 'spades'});
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
var betsAndRankings = [
    {id: "royalFlush", name: "Royal flush", 1:250, 2:500, 3:750, 4:1000, 5:4000},
    {id: "straightFlugh", name: "Straight flush", 1:50, 2:100, 3:150, 4: 200, 5:125},
    {id: "fourOfAKind", name: "Four of a kind", 1:25, 2:50, 3:75, 4:100, 5:125},
    {id: "fullHouse", name: "Full house", 1:9, 2:18, 3:27, 4:36, 5:45},
    {id: "flush", name: "Flush", 1:6, 2:12, 3:18, 4:24, 5: 30},
    {id: "straight", name: "Straight", 1:4, 2:8, 3:12, 4: 16, 5: 20},
    {id: "threeOfAKind", name: "Three of a kind",1:3,2:6,3:9,4:12,5:15},
    {id: "twoPair", name: "Two pair",1:2,2:4,3:6,4:8,5:10},
    {id: "jacksOrBetter", name:"Jacks or better", 1:1,2:2,3:3,4:4,5:5}
    ]
for (var i=0;i<betsAndRankings.length;i++){
  $('#table').append(`<tr>
      <td class='title'>${betsAndRankings[i].name.toUpperCase()}</td>
      <td>${betsAndRankings[i][1]}</td>
      <td>${betsAndRankings[i][2]}</td>
      <td>${betsAndRankings[i][3]}</td>
      <td>${betsAndRankings[i][4]}</td>
      <td>${betsAndRankings[i][5]}</td>
    </tr>`)
}
var poker = new Poker();

$('.card').click(function(){
  $(this).toggleClass('held');
  $(this).toggleClass('unheld');
  $(':nth-child(2)', this).toggleClass('hold');
  if($(this).hasClass('held')){
     $(':nth-child(2)', this).text('Hold');
     var index = $(this).attr("id")
     poker.held.push(index)
     //do stuff
  } else {
   $(':nth-child(2)', this).text('');
   var index = $(this).attr("id");
   var heldIndex = poker.held.indexOf(index)
   poker.held.splice(heldIndex,1)
  }
})

function updateBetAndCredits(){
  $('#bet').text(poker.bet)
  $('#credits').text(poker.credits)
}

$('.bet-one').click(function(){
  if(poker.bet<5 && poker.currentTurn==='first'){
    poker.bet ++;
    poker.credits --;
    updateBetAndCredits()
  }
})
$('.bet-max').click(function(){
  if(poker.bet!=5 && poker.currentTurn==='first'){
    let difference = 5 - poker.bet
    poker.bet = 5;
    poker.credits -= difference;
    updateBetAndCredits()
  }
})
$('.deal').click(function(){
  if(poker.bet === 0){
    alert("Please make a bet higher than 0")
    //deal first time
  } else if (poker.currentTurn === 'first'){
    for (var i =0;i<5;i++){
      poker.hand.push(poker.deck.shift())
    }
    poker.currentTurn = 'second'
    let index = 0;
    revealCard = function(){
      if (index<5){
        $(`div.hand div:nth-child(${index+1})`).toggleClass('cardback');
        $(`div.hand div:nth-child(${index+1})`).toggleClass('cardfront');
        $(`div.hand div:nth-child(${index+1})`).html(`
        <div class='held suit${poker.hand[index].suit}'>
        <p>${poker.hand[index].number}</p><p></p></div>`)
        index++
        setTimeout(revealCard,500)
      }
    }
    setTimeout(revealCard,500)
    //deal second time
  } else {
    var newHand = [];
    for (var i=0;i<5;i++){
      if (!poker.held.includes(i.toString())){
        $(`div.hand div:nth-child(${i+1})`).toggleClass('cardback');
        $(`div.hand div:nth-child(${i+1})`).html('');
        $(`div.hand div:nth-child(${i+1})`).toggleClass('cardfront');
      }
    }

  }
})

