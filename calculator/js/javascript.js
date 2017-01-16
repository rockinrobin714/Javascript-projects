var currentString = '';
var total = null

$('.num').click(function(){
	currentString += $(this).html().replace(/^\s+|\s+$|\s+(?=\s)/g, "");
	while (currentString[0]==='0' && currentString.length>1){
		currentString=currentString.substr(1);
	}
  $('#current-equation').html(currentString);
})

$('#erase-one').click(function(){
	currentString=currentString.substr(0, currentString.length-1);
	if (currentString===''){
		currentString = '0'
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

