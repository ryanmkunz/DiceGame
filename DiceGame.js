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
// "shoveler" can move one space at a time and removes snow by moving to a tile
// no turns, can continuously move until the old lady is reached
// Every time you move (shovel) you have a chance of triggering an event
//
// 4-sided: Weather conditions - start of game - sunny: snow melts as you move, 
// 6-sided: "Whoops! you slipped and fell" -- (re)fill all surrounding tiles with snow
// 8-sided: "Oh no! your shovel broke" -- only after 3rd damage -- Game ends
// 10-sided: "Oops! you damaged your shovel on some ice" -- probability increases after 12-roll
// 12-sided: "Oops! you damaged your shovel on some ice" -- only use 12-side for first damage
// 20-sided: "Ouch! you threw out your back" -- Game ends
//
// Yes, I realize I have my xAxis and yAxis backwards. 
//
// TODO: find a font online, figure out how to use arrow keys for input
//
//-----------------------------------------------
let driveway = create2DArray(8);
for (let i = 0; i < driveway.length; i++)	{

	for (let j = 0; j < driveway.length; j++)	{
		//driveway[i][j] = "";
		driveway[i][j] = `SnowRow${i+1}Col${j+1}`;
		//driveway[i][j] = "SnowRow" + (i+1) + "Col" + (j+1);
	}
}
changeImagePlayer(driveway[7][0]);

let xAxis = 7;
let yAxis = 0;
let shovelCondition = 2;
let playerCondition = 5;
let weather = getWeather();

document.onkeydown = checkKeyPress;

function checkKeyPress(e)	{
	e = e || window.event;
	if (e.keyCode == "38")	{
		// alert("the up arrow was pressed");
		movePlayerUp();
	}
	else if (e.keyCode == "40")	{
		// alert("the down arrow was pressed");
		movePlayerDown();
	}
	else if (e.keyCode == "37")	{
		// alert("the left arrow was pressed");
		movePlayerLeft();
	}
	else if (e.keyCode == "39")	{
		// alert("the right arrow was pressed");
		movePlayerRight();
	}
}

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
	meltSnow(weather);
	}
}
function movePlayerDown ()  {
	if (xAxis != 7)	{
	changeImageAsphalt(driveway[xAxis][yAxis]);
	changeImagePlayer(driveway[xAxis+1][yAxis]);
	chanceCheck();
	xAxis++;
	didIWin();
	meltSnow(weather);
	}
}
function movePlayerLeft ()  {
	if (yAxis != 0)	{
	changeImageAsphalt(driveway[xAxis][yAxis]);
	changeImagePlayer(driveway[xAxis][yAxis-1]);
	chanceCheck();
	yAxis--;
	didIWin();
	meltSnow(weather);
	}
}
function movePlayerRight () {
	if (yAxis != 7)	{
	changeImageAsphalt(driveway[xAxis][yAxis]);
	changeImagePlayer(driveway[xAxis][yAxis+1]);
	chanceCheck();
	yAxis++;
	didIWin();
	meltSnow(weather);
	}
}
function getWeather ()	{
	if (rollDice(4) == 4)	{
		alert("It's sunny today");
		return "sunny";
	}
	else {
		return "";
	}	
}
function meltSnow (weather)	{
	if (weather == "sunny")	{
		let randomXIndex = rollDice(7);
		let randomYIndex = rollDice(7);
		do {
			randomXIndex = rollDice(7);
			randomYIndex = rollDice(7);
		}	while (randomXIndex == xAxis || randomYIndex == yAxis)
		changeImageAsphalt(driveway[randomXIndex][randomYIndex]);
	}
}
function chanceCheck()	{
	if (rollDice(6) == 6 && weather !== "sunny")	{
		playerCondition--;
		if (playerCondition == 0)	{
			endGame(2);
		}
		else	{
			alert("Whoops! You slipped and fell");
		}
	}
	else if (shovelCondition == 2 && weather !== "sunny")	{
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
		endGame(4);
	}
}
function didIWin() {
	if (xAxis == 0 && yAxis == 7)	{
		endGame(3);
	}
}
function endGame (condition)	{
	switch (condition) {
		case 1:
			alert("Game Over: your shovel broke");
			resetGame();
			break;
		case 2:
			alert("Game Over: you fell and broke an arm");
			resetGame();
			break;
		case 3:
			alert("You win!");
			resetGame();
			break;
		case 4:
			alert("Game Over: You broke your back");
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
	playerCondition = 5;
	changeImagePlayer(driveway[7][0]);
	changeImageOldLady(driveway[0][7]);
	weather = getWeather();
}
