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
let driveway = create2DArray(8);
for (let i = 0; i < driveway.length; i++)	{

	for (let j = 0; j < driveway.length; j++)	{
		driveway[i][j] = "";
	}
}
driveway[0][0] = "SnowRow1Col1";
driveway[0][1] = "SnowRow1Col2";
driveway[0][2] = "SnowRow1Col3";
driveway[0][3] = "SnowRow1Col4";
driveway[0][4] = "SnowRow1Col5";
driveway[0][5] = "SnowRow1Col6";
driveway[0][6] = "SnowRow1Col7";
driveway[0][7] = "SnowRow1Col8"; //endGame
driveway[1][0] = "SnowRow2Col1";
driveway[1][1] = "SnowRow2Col2";
driveway[1][2] = "SnowRow2Col3";
driveway[1][3] = "SnowRow2Col4";
driveway[1][4] = "SnowRow2Col5";
driveway[1][5] = "SnowRow2Col6";
driveway[1][6] = "SnowRow2Col7";
driveway[1][7] = "SnowRow2Col8";
driveway[2][0] = "SnowRow3Col1";
driveway[2][1] = "SnowRow3Col2";
driveway[2][2] = "SnowRow3Col3";
driveway[2][3] = "SnowRow3Col4";
driveway[2][4] = "SnowRow3Col5";
driveway[2][5] = "SnowRow3Col6";
driveway[2][6] = "SnowRow3Col7";
driveway[2][7] = "SnowRow3Col8";
driveway[3][0] = "SnowRow4Col1";
driveway[3][1] = "SnowRow4Col2";
driveway[3][2] = "SnowRow4Col3";
driveway[3][3] = "SnowRow4Col4";
driveway[3][4] = "SnowRow4Col5";
driveway[3][5] = "SnowRow4Col6";
driveway[3][6] = "SnowRow4Col7";
driveway[3][7] = "SnowRow4Col8";
driveway[4][0] = "SnowRow5Col1";
driveway[4][1] = "SnowRow5Col2";
driveway[4][2] = "SnowRow5Col3";
driveway[4][3] = "SnowRow5Col4";
driveway[4][4] = "SnowRow5Col5";
driveway[4][5] = "SnowRow5Col6";
driveway[4][6] = "SnowRow5Col7";
driveway[4][7] = "SnowRow5Col8";
driveway[5][0] = "SnowRow6Col1";
driveway[5][1] = "SnowRow6Col2";
driveway[5][2] = "SnowRow6Col3";
driveway[5][3] = "SnowRow6Col4";
driveway[5][4] = "SnowRow6Col5";
driveway[5][5] = "SnowRow6Col6";
driveway[5][6] = "SnowRow6Col7";
driveway[5][7] = "SnowRow6Col8";
driveway[6][0] = "SnowRow7Col1";
driveway[6][1] = "SnowRow7Col2";
driveway[6][2] = "SnowRow7Col3";
driveway[6][3] = "SnowRow7Col4";
driveway[6][4] = "SnowRow7Col5";
driveway[6][5] = "SnowRow7Col6";
driveway[6][6] = "SnowRow7Col7";
driveway[6][7] = "SnowRow7Col8";
driveway[7][0] = "SnowRow8Col1";
driveway[7][1] = "SnowRow8Col2";
driveway[7][2] = "SnowRow8Col3";
driveway[7][3] = "SnowRow8Col4";
driveway[7][4] = "SnowRow8Col5";
driveway[7][5] = "SnowRow8Col6";
driveway[7][6] = "SnowRow8Col7";
driveway[7][7] = "SnowRow8Col8";

changeImagePlayer(driveway[7][0]);

let xAxis = 7;
let yAxis = 0;
let shovelCondition = 2;
let playerCondition = 10;

function rollDice(sides)	{
	let result = Math.floor(Math.random()*sides)+1;
	return result;
}
function changeImagePlayer (elementId)	{
	document.getElementById(elementId).src = "shoveler.jpg";
}
function changeImageAsphalt (elementId)	{
	document.getElementById(elementId).src = "asphaltTexture.jpg";
}
function changeImageSnow (elementId)	{
	document.getElementById(elementId).src = "snowPileCropped.jpg";
}
function changeImageOldLady (elementId)	{
	document.getElementById(elementId).src = "oldLady.jpg";
}
function movePlayerUp ()    {
	if (xAxis != 0)	{
	changeImageAsphalt(driveway[xAxis][yAxis]);
	changeImagePlayer(driveway[xAxis-1][yAxis]);
	chanceCheck();
	xAxis--;
	didIWin();
	}
}
function movePlayerDown ()  {
	if (xAxis != 7)	{
	changeImageAsphalt(driveway[xAxis][yAxis]);
	changeImagePlayer(driveway[xAxis+1][yAxis]);
	chanceCheck();
	xAxis++;
	didIWin();
	}
}
function movePlayerLeft ()  {
	if (yAxis != 0)	{
	changeImageAsphalt(driveway[xAxis][yAxis]);
	changeImagePlayer(driveway[xAxis][yAxis-1]);
	chanceCheck();
	yAxis--;
	didIWin();
	}
}
function movePlayerRight () {
	if (yAxis != 7)	{
	changeImageAsphalt(driveway[xAxis][yAxis]);
	changeImagePlayer(driveway[xAxis][yAxis+1]);
	chanceCheck();
	yAxis++;
	didIWin();
	}
}
function snowFall (weather)	{
	//TODO write a function that makes snow appear after a certain number of moves
	//Make sure player is not replaced with snow
	//Could use a dice roll here too
}
function meltSnow (weather)	{
	//TODO write a function that makes snow melt if it is sunny after a certain number of moves
	//Make sure player is not melted
	//Could use a dice roll here too
}
// function dropSnow ()	{
// 	// TODO write a function that makes snow appear all around player when they slip
// 	// document.getElementById(toString(driveway[xAxis+1][yAxis+1])).src = "snowPileCropped.jpg";
// 	changeImageSnow(driveway[xAxis+1][yAxis+1]);
// 	changeImageSnow(driveway[xAxis-1][yAxis-1]);
// 	changeImageSnow(driveway[xAxis-1][yAxis+1]);
// 	changeImageSnow(driveway[xAxis+1][yAxis-1]);
// 	changeImageSnow(driveway[xAxis+1][yAxis]);
// 	changeImageSnow(driveway[xAxis-1][yAxis]);
// 	changeImageSnow(driveway[xAxis][yAxis+1]);
// 	changeImageSnow(driveway[xAxis][yAxis-1]);
// 	changeImagePlayer(driveway[xAxis][yAxis]);
// }
function chanceCheck()	{
	if (rollDice(6) == 6)	{
		// dropSnow();
		playerCondition--;
		alert("Whoops! You slipped and fell")
	}
	else if (shovelCondition == 2)	{
		if (rollDice(12) == 12)	{
			shovelCondition--;
			alert("Whoops! You damaged your shovel on some ice");
		}
	}
	else if (shovelCondition == 1)	{
		if (rollDice(10) == 10) {
			shovelCondition--;
			alert("Whoops! You damaged your shovel on some ice");
		}
	}
	else if (shovelCondition == 0)	{
		if (rollDice(8) == 8)	{
			endGame(1);
		}
	}
	else if (rollDice(20) == 20)	{
		endGame(2);
	}
}
function didIWin() {
	if (xAxis == 0 && yAxis == 7)	{
		endGame(3);
	}
}
function endGame (condition)	{
	//TODO write a function that displays a "game over" message
	//Switch case maybe?
	switch (condition) {
		case 1:
			alert("Game Over: your shovel broke");
			resetGame();
			break;
		case 2:
			alert("Game Over: you broke your back");
			resetGame();
			break;
		case 3:
			alert("You win!");
			resetGame();
			break;
		default:
			alert("Game Over?");
			resetGame();
			break;
	}
}
function create2DArray (rows)	{
	let arr = [];
	for (let i = 0; i < rows; i++)	{
		arr [i] = [];
	}
	return arr;
}
function resetGame() {
	for (let i = 0; i < driveway.length; i++)	{

		for (let j = 0; j < driveway.length; j++)	{
		changeImageSnow(driveway[i][j]);
		}
	}
	xAxis = 7;
	yAxis = 0;
	shovelCondition = 2;
	playerCondition = 10;
	changeImagePlayer(driveway[7][0]);
	changeImageOldLady(driveway[0][7]);
}

