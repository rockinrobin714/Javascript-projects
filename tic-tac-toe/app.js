var board = 
	'? ? ? \n? ? ?\n? ? ?'

var turn = 'player1';

var newTurn = function(){
	if (turn === 'player1'){
		turn = 'player2'
	} else {
		turn = 'player1'
	}
}	

console.log("Let's play!");
