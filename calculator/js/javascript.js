var currentString = '';
var arr = [];
var total = null;
var operators = ['x','-','+','÷'];

$('.num').click(function(){
	currentString += $(this).html().replace(/^\s+|\s+$|\s+(?=\s)/g, "");
	//check to make sure first digit isn't 0
	while (currentString[0]==='0' && currentString.length>1){
		currentString=currentString.substr(1);
	}
  $('#current-equation').html(currentString);
})

$('#erase-one').click(function(){
	//remove the last number from the string
	//check if the last button was an operator
	if (operators.indexOf(currentString[currentString.length-1])>-1){

	}else {
		currentString = currentString.substr(0, currentString.length-1);
	}
	//if there is nothing left, set the string to 0
	if (currentString===''){
		currentString = '0';
	}
	$('#current-equation').html(currentString);
})

$('.operator').click(function(){
	currentString += $(this).html().replace(/^\s+|\s+$|\s+(?=\s)/g, "");
})

//check phone to see how this works
$('#erase-all').click(function(){
	
})


var getAnswer = function(){
	adjustNumbersForDecimal();
	if (operator==="+"){
		finalNumber=firstNumber + secondNumber;
	}
	else if (operator==="-"){
		finalNumber=firstNumber - secondNumber;
	}
	else if (operator==="x"){
		finalNumber=firstNumber * secondNumber;
	}
	else if (operator==="÷"){
		finalNumber=firstNumber / secondNumber;
	}
}

