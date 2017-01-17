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
var places= {1:1,
2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9}
var board = 
	` |${places[1]}|${places[2]}|${places[3]}|\n_________\n| ${places[4]}|${places[5]}|${places[6]}|\n_________\n |${places[7]}|${places[8]}|${places[9]}|`

var count = 0;

var turn = {current: null, letter: null}
var winner = null;
var newTurn = function(){
	if (turn.current === 'Player 1'){
		turn.current = 'Player 2'
	} else {
		turn.current = 'Player 1'
	}
	if (turn.letter === "X"){
		turn.letter = "O";
	} else{
		turn.letter = "X";
	}
}	
var choose = function(){
	ask(`${turn.current}, do you want 'X' or 'O'?`,function(answer){
		if (answer === 'X' || answer === 'x'){
			console.log("You are X!")
			turn.letter = 'x';
		} else if (answer ==='O' || answer === 'o'){
			console.log("You are O!")
			turn.letter = 'o';
		} else {
			console.log("Not sure what you were typing there. I will just make you X.")
			turn.letter = 'x';
		}
		playGame();
	})
}
var checkForWins = function(){
	var win = false;
	
	//check horizontal
	if (count>4){
		var newBoard = board.replace(/[^a-z0-9]/gi,'');
	} else {
	newTurn();
	playGame();
	}
}

var playGame = function(){
	ask(`${board}\n ${turn.current}, make your move. Type a number 1 - 9.`, function(answer){
		if (parseInt(answer)!=answer)	{
			console.log("\nThat was not a number. Try again.")
			playGame();
		} else if (!board.includes(answer)){
			console.log("\nUh... that isn't a valid move. Try again.")
			playGame();
		} else {
			places[answer]=turn.letter;
			console.log('places answer is', places[answer])
			checkForWins();
		}
	})
}
console.log("Let's start!");
ask('Who will go first? Player 1 or player 2?', function(answer){
	if (answer.includes('1')){
		turn.current = 'Player 1';
		console.log('Player one is going first!')
	} else if (answer.includes('2')){
		turn.current = 'Player 2';
		console.log('Player two is going first!')
	} else {
		turn.current = 'Player 1';
		console.log('Sorry, did not catch that. Player 1 can go first');
	}
	choose();
});
