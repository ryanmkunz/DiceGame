//-----------------------------------------------
//
// Build a functional, web-based dice game utilizing HTML, CSS, and JavaScript best practices
//
// As a developer, I want to utilize six different dice within my game. 
// (Recommended dice are 4-sided, 6-sided, 8-sided, 10-sided, 12-sided, and 20-sided.
// Different dice may be substituted. No 2-sided die.)
//
// Idea: snow shoveling game with a basic gui
// make a chess-like board with a "shoveler" and "snow" covering the entire board
// "shoveler" can move like the King in chess and removes snow by moving to a tile
// no turns, can continuously move until snow is cleared or a shoveler throws out back
// Every time you move (shovel) you have a chance of triggering an event
//
// 4-sided
// 6-sided
// 8-sided
// 10-sided
// 12-sided
// 20-sided: "Ouch! you threw out your back -- Game Over"
//
//-----------------------------------------------
function rollDice(sides)	{
	let result = Math.floor(Math.random()*sides)+1;
	return result;
}
function testFunction()	{
	// let sides = prompt("Enter number of sides");
	// console.log(rollDice(sides));
	if (prompt("Would you like to play a game?") == "yes" || "Yes" || 1 || y)	{
		console.log("test1");
	}
}
testFunction();