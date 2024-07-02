import Player from "./player-class.js";
import Ground from "./ground-class.js"
import CactiPlacer from "./cacti-placer-class.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAME_SPEED_START = 0.75;
const GAME_SPEED_INCREMENT = 0.00001;

// game element sizes
const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const PLAYER_WIDTH = 88 / 1.5;
const PLAYER_HEIGHT = 94 / 1.5; // width and height should be proportional to the player png
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = GAME_HEIGHT * 0.75;
const GROUND_WIDTH = 2400;
const GROUND_HEIGHT = 24; // dependent on ground png
const GROUND_AND_CACTUS_SPEED = 0.5;

// obstacles array
const CACTI_CONFIG = [
    {width: 48 / 1.5, height: 100 / 1.5, image: "images/cactus_1.png"},
    {width: 98 / 1.5, height: 100 / 1.5, image: "images/cactus_2.png"},
    {width: 68 / 1.5, height: 70 / 1.5, image: "images/cactus_3.png"}
];

// game objects
let player = null;
let ground = null;
let cactiPlacer = null;

let scaleRatio = null;
let previousTime = null;
let gameSpeed = GAME_SPEED_START;

function createSprites() {
    const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
    const playerHeightInGame = PLAYER_HEIGHT * scaleRatio;
    const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;
    const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;

    const groundWidthInGame = GROUND_WIDTH * scaleRatio;
    const groundHeightInGame = GROUND_HEIGHT * scaleRatio;

    player = new Player(
        ctx, 
        playerWidthInGame, 
        playerHeightInGame, 
        maxJumpHeightInGame, 
        minJumpHeightInGame, 
        scaleRatio
    );

    ground = new Ground(
        ctx,
        groundWidthInGame,
        groundHeightInGame,
        GROUND_AND_CACTUS_SPEED,
        scaleRatio
    );

    const cactiImages = CACTI_CONFIG.map(cactus => {
        const image = Object.assign(new Image(), { src: cactus.image });
        return {
            width: cactus.width * scaleRatio,
            height: cactus.height * scaleRatio,
            image: image
        };
    })

    cactiPlacer = new CactiPlacer(ctx, cactiImages, scaleRatio, GROUND_AND_CACTUS_SPEED);
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

    clearScreen();

    // update game objects
    ground.update(gameSpeed, frameTimeDelta);
    cactiPlacer.update(gameSpeed, frameTimeDelta);
    player.update(gameSpeed, frameTimeDelta);

    // draw game objects
    ground.draw();
    cactiPlacer.draw();
    player.draw();


    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);