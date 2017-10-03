/*
 * Implement all your JavaScript in this file!
 */
var stack = [];
var display = '';
var functionMap = {
	"addButton" : (a, b) => a + b,
	"subtractButton" : (a, b) => a - b,
	"multiplyButton" : (a, b) => a * b,
	"divideButton" : (a, b) => a == 0 ? 'Infinity' : a / b
};

$(function() {
    $(".digit").click(function() {
    	display += $(this).val();
    	$("#display").val(display);
    	console.log(display);
 	});

 	$("#clearButton").click(function() {
 		display = '';
 		stack = [];
 		$("#display").val('');
 	});

 	$(".operator").click(function() {
 		stack.push(Number(display));
 		stack.push(this.id);
 		display = ''; 		
 	});

 	$("#equalsButton").click(function() {
 		stack.push(Number(display));
 		console.log(stack);
 		display = evaluate(stack);
 		$("#display").val(display);
 		stack = [];
 	});

 	function evaluate(stack) {
 		return functionMap[stack[1]](stack[0], stack[2]);
 	}


});