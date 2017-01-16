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
	' |1|2|3|\n_________\n |4|5|6|\n_________\n |7|8|9|'

var turn = {current: null, letter: null}
var player1;
var player2;

var newTurn = function(){
	if (turn === 'Player 1'){
		turn = 'Player 2'
	} else {
		turn = 'Player 1'
	}
}	
var choose = function(){
	ask(`${turn.current}, do you want 'X' or 'O'?`,function(answer){
		if (answer === 'X' || answer === 'x')
		}
	})
}
var play = function(){
	
}
var playGame = function(){
	ask(`${board}\n ${turn.current}, make your move. Type a number 1 - 9 `, function(answer){
		if (parseInt(answer)!=answer)	{
			console.log("That was not a number. Try again.")
			playGame();
		}
	})
}
console.log("Let's start!");
ask('Who will go first? Player 1 or player 2?', function(answer){
	if (answer.includes('1')){
		turn.current = 'Player 1';
		console.log('Player one is going first!')
		playGame();
	} else if (answer.includes('2')){
		turn.current = 'Player 2';
		console.log('Player two is going first!')
		playGame();
	} else {
		turn = 'Player 1';
		console.log('Sorry, did not catch that. Player 1 can go first');
		playGame();
	}
});
