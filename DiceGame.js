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
// or shovel breaks
// Every time you move (shovel) you have a chance of triggering an event
//
// 4-sided: Weather conditions - start of game - sunny: snow melts as you move, 
// cloudy: nothing special, snowing: snow refills, blizzard: snow refills faster
// snow will refill after a certain number of moves, less moves in blizzard
// 6-sided: "Whoops! you slipped and fell" -- (re)fill all surrounding tiles with snow
// 8-sided: "Oh no! your shovel broke" -- only after 3rd damage -- Game ends
// 10-sided: "Oops! you damaged your shovel on some ice" -- probability increases after 12-roll
// 12-sided: "Oops! you damaged your shovel on some ice" -- only use 12-side for first damage
// 20-sided: "Ouch! you threw out your back" -- Game ends
//
//-----------------------------------------------
function rollDice(sides)	{
	let result = Math.floor(Math.random()*sides)+1;
	return result;
}
function testFunction()	{
	if (prompt("Would you like to play a game?") == "yes" || "Yes" || 1 || y)	{
		let driveway = create2DArray(8);
		for (let i = 0; i < driveway.length; i++)	{
	
			for (let j = 0; j < driveway.length; j++)	{
				driveway[i][j] = "| * |";
			}
		}
		generateConsoleInterface(driveway);
	}
	else	{
		console.log("Well fine then!");
	}
}
testFunction();

function movePlayer () {
	//TODO write a function that interprets user input as movement 
}
function snowFall (weather)	{
	//TODO write a function that makes snow appear after a certain number of moves
}
function meltSnow (weather)	{
	//TODO write a function that makes snow melt if it is sunny after a certain number of moves
}
function dropSnow ()	{
	//TODO write a function that makes snow appear all around player when they slip
}
function endGame (condition)		{
	//TODO write a function that displays a "game over" message
}
function create2DArray (rows)	{
	let arr = [];
	for (let i = 0; i < rows; i++)	{
		arr [i] = [];
	}
	return arr;
}
function generateConsoleInterface (array)		{
	//TODO write a function that clears all snow, redraws the snow, and redraws the player

		console.log(array.join('\n'));

}