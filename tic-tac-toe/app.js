var rl = require('readline');

function ask(question, callback) {
  var r = rl.createInterface({
    input: process.stdin,
    output: process.stdout});
  r.question(question + '\n', function(answer) {
    r.close();
    callback(answer);
  });
}

var board = 
	'1? 2? 3? \n4? 5? 6?\n7? 8? 9?'

var turn = 'player1';

var newTurn = function(){
	if (turn === 'player1'){
		turn = 'player2'
	} else {
		turn = 'player1'
	}
}	

console.log("Let's play!");
ask('Who will go first? Player 1 or player 2?', function(answer){
	if (answer.includes('1')){
		turn = 'player1';
		console.log('Player one is going first!')
	} else if (answer.includes('2')){
		turn = 'player2';
		console.log('Player two is going first!')
	} else {
		turn = 'player1';
		console.log('Sorry, did not catch that. Player 1 can go first')
	}
});
