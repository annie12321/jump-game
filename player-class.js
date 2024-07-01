export default class Player {
    constructor(ctx, width, height, maxJumpHeight, minJumpHeight, scaleRatio) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.maxJumpHeight = maxJumpHeight;
        this.minJumpHeight = minJumpHeight;
        this.scaleRatio = scaleRatio;

        // position of player image
        this.x = 10 * scaleRatio;
        this.y = this.canvas.height - this.height - 1.5 * scaleRatio;

        // this.standingStillImage = new Image();
        // this.standingStillImage.src = "images/standing_still.png";
        // this.image = this.standingStillImage;

        this.image = this.standingStillImage = Object.assign(new Image(), { src: "images/standing_still.png" });

    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}