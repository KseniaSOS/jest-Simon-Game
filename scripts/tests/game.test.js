/**
 * @jest-environment jsdom
 */

//And that's a good reminder that  every time you add a new function,  
//you need to export it from game.js  and import it to game.test.js.

const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game");

//we said we wanted to display an alert and  now this is where things get interesting, because we can actually use Jest to  check if an alert has been called.
//To do this, we use something called a spy. 

jest.spyOn(window,"alert").mockImplementation(() => {});

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices contain correct ids", () => {
        expect(game.choices).toEqual(["button1","button2","button3","button4"]);
    });
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true);
    });
});

// use another beforeAll  function, because we want to set  
//up the game state with some fake values to see if the newGame() resets them.

describe("NewGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    test("should set game score to zero", () => {
       expect(game.score).toEqual(0);
    });
    test("should clear the PlayerMoves array", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test("should be one move in the computer's game array", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("expect data-listener to be true", () => {
        newGame();
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
    });
})

// The showTurn() and playerClick should cause the circle to change colour or to light up. 
// whereas beforeAll runs before all of the tests, beforeEach runs before each test is run, so we're going to reset the state each time.

describe("gameplay works correctly", () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain(game.currentGame[0] + "light");
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test("should increment the score if the move(turn) is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });  
    test("should call an alert if the move is wrong", () => {
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong move!");
    });
});