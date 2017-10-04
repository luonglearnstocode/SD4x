/*
 * Implement all your JavaScript in this file!
 */

// map operator buttons id with their function
var functionMap = {
	"addButton" : (a, b) => a + b,
	"subtractButton" : (a, b) => a - b,
	"multiplyButton" : (a, b) => a * b,
	"divideButton" : (a, b) => a / b
};

// give an array, values at index 0 and 2, operator at index 1
// calculate the operation
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
 		if (stack.length == 3) { // just perform an operation and continue another
 			stack = [];
 			stack.push(Number(display));
 			stack.push(this.id);
 		} else if (stack.length == 2) { // in middle of operation
 			if (isNaN(current)) { // operator after operator 
 				stack[1] = this.id; // replace with the recent
 			} else { // user have inputed the right hand side of the operation
 				stack.push(Number(display));
 				display = evaluate(stack);
 				$("#display").val(display);
 				stack = [display, this.id]; // ready for the next operation
 			}
 		} else if (stack.length == 1) { // user have inputed the left hand side of the operation and pressed the equals button
 			stack.push(this.id);
 		} else { // user have inputed the left hand side
 			stack.push(Number(display));
 			stack.push(this.id);
 			display = ''; 
 		}
 		current = NaN;
 		// console.log(stack);
 		display = ''; 		
 	});

 	$("#equalsButton").click(function() {
 		// console.log(stack); 		
 		if (stack.length == 0) { // reset state
 			if (current) { // user have inputed some numbers
 				stack = [current];
 			}
 		} else if (stack.length == 2) {  
 			if (!isNaN(current)) { // basic use case
 				stack.push(Number(display));
 				console.log(stack);
 				display = evaluate(stack);
 				$("#display").val(display);				
 			} // else ignore		
 		} else if (stack.length == 3) { // the previous operation should be repeated using the result of the operation and the most recently entered operand
 			stack[0] = display;
 			display = evaluate(stack);
 			$("#display").val(display);
 		} 		
 	});
});