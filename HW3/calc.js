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
    	if (stack.length == 1 || stack.length == 3) { // new operation 
    		display = '';
    		stack = [];
    	} 

    	display += $(this).val();
    	$("#display").val(Number(display));
    	current = Number(display);
 	});

 	$("#clearButton").click(function() { // restore to initial state
 		display = '';
 		stack = [];
 		current = NaN;
 		$("#display").val(display);
 	});

 	$(".operator").click(function() {
 		if (stack.length == 3) { // just perform operation
 			stack = [];
 			stack.push(Number(display));
 			stack.push(this.id);
 		} else if (stack.length == 2) { // in middle of operation
 			if (isNaN(current)) { // operator after operator
 				stack[1] = this.id;
 			} else {
 				stack.push(Number(display));
 				display = evaluate(stack);
 				$("#display").val(display);
 				stack = [];
 			}
 		} else if (stack.length == 1) {
 			stack.push(this.id);
 		} else {
 			stack.push(Number(display));
 			stack.push(this.id);
 			display = ''; 
 		}
 		current = NaN;
 		console.log(stack);
 		display = ''; 		
 	});

 	$("#equalsButton").click(function() {
 		console.log(stack); 		

 		if (stack.length == 0) { // reset state
 			if (current) { // user have inputed some numbers
 				stack = [current];
 			}
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