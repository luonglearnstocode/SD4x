/*
 * Implement all your JavaScript in this file!
 */

var functionMap = {
	"addButton" : (a, b) => a + b,
	"subtractButton" : (a, b) => a - b,
	"multiplyButton" : (a, b) => a * b,
	"divideButton" : (a, b) => a == 0 ? 'Infinity' : a / b
};

function evaluate(stack) {
 	return functionMap[stack[1]](stack[0], stack[2]);
};

var stack = [];
var display = '';
var current;


$(function() {
    $(".digit").click(function() {
    	if (stack.length == 1) { // new operation 
    		display = '';
    		stack = [];
    	} 

    	display += $(this).val();
    	$("#display").val(display);
    	current = Number(display);
 	});

 	$("#clearButton").click(function() { // restore to initial state
 		display = '';
 		stack = [];
 		$("#display").val(display);
 	});

 	$(".operator").click(function() {
 		current = NaN;

 		if (stack.length == 3) { // just perform operation
 			stack = [];
 			stack.push(Number(display));
 			stack.push(this.id);
 		} else if (stack.length == 2) { // in middle of operation
 			stack.push(Number(display));
 			display = evaluate(stack);
 			$("#display").val(display);
 			stack = [];
 		} else if (stack.length == 1) {
 			stack.push(this.id);
 		} else {
 			stack.push(Number(display));
 			stack.push(this.id);
 			display = ''; 
 		}
 		console.log(stack);
 		// stack = [];
 		// stack.push(Number(display));
 		// stack.push(this.id);
 		display = ''; 		
 	});

 	$("#equalsButton").click(function() {
 		console.log(stack); 		

 		if (stack.length == 0) { // reset state
 			if (current) { // user have inputed some numbers
 				stack = [current];
 			}
 			display = '';
 		} else if (stack.length == 2) {
 			if (!isNaN(current)) {
 				stack.push(Number(display));
 				console.log(stack);
 				display = evaluate(stack);
 				$("#display").val(display);
 				
 			}		
 		} else if (stack.length == 3) {
 			stack[0] = display;
 			display = evaluate(stack);
 			$("#display").val(display);
 		} 		
 	});

 	

});