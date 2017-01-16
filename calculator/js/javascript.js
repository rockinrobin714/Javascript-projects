var currentString = '';
var previousString = '';
var total = null;

$('.num').click(function(){
	currentString += $(this).html().replace(/^\s+|\s+$|\s+(?=\s)/g, "");
	//check to make sure first digit isn't 0
	while (currentString[0]==='0' && currentString.length>1 && currentString[1]!== '.'){
		currentString=currentString.substr(1);
	}
	//only show the last 11 numbers on the screen
  $('#current-equation').html(currentString.slice(-11));
})

$('#erase-one').click(function(){
	//remove the last number from the string
	//check if the last button was an operator and delete the space around if so
	var operators = ['x', '+', '÷', '-']
	if (operators.indexOf(currentString[currentString.length-2])>-1){
		currentString = currentString.substr(0, currentString.length-3)
	}else {
		currentString = currentString.substr(0, currentString.length-1);
	}
	//if there is nothing left, set the string to 0
	if (currentString===''){
		currentString = '0';
	}
	//only show the last 11 numbers on the screen
  $('#current-equation').html(currentString.slice(-11));
})

$('.operator').click(function(){
	currentString += ' ' + $(this).html().replace(/^\s+|\s+$|\s+(?=\s)/g, "")+ ' ';
	//only show the last 11 numbers on the screen
  $('#current-equation').html(currentString.slice(-11));
})

$('#erase-all').click(function(){
	currentString = '';
	previousString = '';
	$('#current-equation').html('0');
	$('#past-equation').html('0');
})

$('.decimal').click(function(){
	// if decimal is clicked first, make it 0.
	if (currentString === ''){
		currentString = '0.'
	}
	var arr = currentString.split(" ");
	if (arr[arr.length-1].indexOf('.')===-1){
		currentString+= '.';
	}
	$('#current-equation').html(currentString.slice(-11));
})
$('#equals').click(function(){
	//computer can not evaluate x and ÷, change them for the calculation
	currentString = currentString.replace("x", "*");
	currentString = currentString.replace("÷", "/");
	total = eval(currentString);
	$('#current-equation').html(total);
	var digits = total.toString().length;
	previousString = currentString + ' = ' + total;
	//change back the characters for readability purposes
	previousString = previousString.replace('/', '÷');
	previousString = previousString.replace('*', 'x');
	$('#past-equation').html(previousString.slice(-20));
	currentString = total.toString();
})
