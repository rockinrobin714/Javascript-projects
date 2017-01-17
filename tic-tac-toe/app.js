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
var places= ['','1','2','3','4','5','6','7','8','9']

var count = 0;

function printBoard() {
    console.log('\n' +
        ' ' + places[1] + ' | ' + places[2] + ' | ' + places[3] + '\n' +
        ' ---------\n' +
        ' ' + places[4] + ' | ' + places[5] + ' | ' + places[6] + '\n' +
        ' ---------\n' +
        ' ' + places[7] + ' | ' + places[8] + ' | ' + places[9] + '\n');
}

var winCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7],
  [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

var turn = {current: null, letter: null}
var winner = null;


var newTurn = function(){
	if (turn.current === 'Player 1'){
		turn.current = 'Player 2'
	} else {
		turn.current = 'Player 1'
	}
	if (turn.letter === "x"){
		turn.letter = "o";
	} else{
		turn.letter = "x";
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
		for (var i = 0;i<winCombos.length;i++){
			if (places[winCombos[i][0]] === places[winCombos[i][1]] &&
				places[winCombos[i][0]] === places[winCombos[i][2]]) {
				win = places[winCombos[i][0]];
			}
		} 
	} 
	if (win){
		console.log("The winner is ", win,'!!!!')
	} else if (count===9){
		console.log('No one won! :( womp womp');
	} else {
	newTurn();
	playGame();
	}
}

var playGame = function(){
	printBoard();
	ask(`${turn.current}, make your move. Type a number 1 - 9.`, function(answer){
		if (!places.includes(answer.toString())){
			console.log("\nUh... that isn't a valid move. Try again.")
			playGame();
		} else {
			places[answer]=turn.letter;
			console.log('places answer is', places[answer])
			printBoard();
			count++
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
