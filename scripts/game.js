let game = {
    currentGame: [],
    playerMoves: [],
    choices: ["button1","button2","button3","button4"],
    score: 0
};

function newGame() {
    game.score = 0;
    game.playerMoves = [];
    game.currentGame = [];
    showScore();
    addTurn();
};
// - push onto the computer game sequence, we're going to go to our game.choices key, which of course contains our four values,
// the IDs of our buttons. And then we're going to use the math.random library to generate a random number between zero and three.
// We're going to use that as the index of our choices array and then the resulting choice is pushed onto the current game array.

function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);

};

function showScore () {
    document.getElementById("score").innerText = game.score;  
};


module.exports = { game, newGame, showScore, addTurn };


// addTurn()
// Should:
// - clear the playerMoves Array
// - randomly add a button ID to the currentGame aaray
// - call showTurns() function


//newGame()
//Schould:
//-Reset the score to zero
//-Clear the PlayerMoves array
//-Clear the currentGame array
//-Call showScore() function (Now the showScore() will reset the score to zero on the DOM  )
//-Call addTurn() function (addTurn()will add a turn to our currently empty sequence.)