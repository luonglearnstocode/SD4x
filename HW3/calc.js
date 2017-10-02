/*
 * Implement all your JavaScript in this file!
 */
 var stack = '';

$(function() {
    $(".digit").click(function() {
    	stack += $(this).text();
    	console.log($(this).text());
    	console.log(stack);
 	});
});