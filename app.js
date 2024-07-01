import Player from "./player-class.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// game element sizes
const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const PLAYER_WIDTH = 58;
const PLAYER_HEIGHT = 62; // width and height should be proportional to the player image
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = GAME_HEIGHT * 0.75;

// game objects
let player = null;

let scaleRatio = null;
let previousTime = null;

function createSprites() {
    const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
    const playerHeightInGame = PLAYER_HEIGHT * scaleRatio;
    const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;
    const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;

    player = new Player(
        ctx, 
        playerWidthInGame, 
        playerHeightInGame, 
        maxJumpHeightInGame, 
        minJumpHeightInGame, 
        scaleRatio
    );

}

// set up basic game screen
function setScreen(){
    // scaling to screen window size
    scaleRatio = getScaleRatio();
    canvas.width = GAME_WIDTH * scaleRatio;
    canvas.height = GAME_HEIGHT * scaleRatio;

    // set elements in place
    createSprites();
}

setScreen();

// setTimeout for Safari mobile rotation
window.addEventListener("resize", () => setTimeout(setScreen, 500));

// for other browser mobile rotation
if (screen.orientation) {
    screen.orientation.addEventListener("change", setScreen);
}

function getScaleRatio(){
    const screenHeight = Math.min(
        window.innerHeight,
        document.documentElement.clientHeight
    );

    const screenWidth = Math.min(
        window.innerWidth,
        document.documentElement.clientWidth
    );

    // if window is wider than game width
    if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT) {
        return screenWidth / GAME_WIDTH;
    }
    else {
        return screenHeight / GAME_HEIGHT;
    }
}

// clear screen
function clearScreen() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// implement infinite game loop with recursion
function gameLoop(currentTime) {

    // standardize game speed over different frame rates
    if (previousTime == null) {
        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;
    }

    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;
    console.log(frameTimeDelta);

    clearScreen();

    // update game objects

    // draw game objects
    player.draw();


    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);