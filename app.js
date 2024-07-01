const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;

// scaling to screen window size
let scaleRatio = null;

function setScreen(){
    scaleRatio = getScaleRatio();
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
}

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
    if (screenWidth / screenHeight < GAME_HEIGHT / GAME_WIDTH) {
        return screenWidth / GAME_WIDTH;
    }
    else {
        return screenHeight / GAME_HEIGHT;
    }
}