var currentString = '';
var arr = [];
var total = null;
var operators = ['x','-','+','÷'];

$('.num').click(function(){
	currentString += $(this).html().replace(/^\s+|\s+$|\s+(?=\s)/g, "");
	while (currentString[0]==='0' && currentString.length>1){
		currentString=currentString.substr(1);
	}
  $('#current-equation').html(currentString);
})

$('#erase-one').click(function(){
	//remove the last number from the string
	currentString=currentString.substr(0, currentString.length-1);
	//don't erase the last digit if it's 0
	if (currentString===''){
		currentString = '0';
	}
	$('#current-equation').html(currentString);
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

