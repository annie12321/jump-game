import Cactus from "./cactus-class.js";

export default class CactiPlacer {
    CACTUS_INTERVAL_MIN = 500;
    CACTUS_INTERVAL_MAX = 2000;

    nextCactusInverval = null;
    cacti = [];

    constructor(ctx, cactiImages, scaleRatio, speed) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.cactiImages = cactiImages;
        this.scaleRatio = scaleRatio;
        this.speed = speed;

        this.setNextCactusTime();
    }

    setNextCactusTime() {
        const randNum = this.getRandomNumber(
            this.CACTUS_INTERVAL_MIN, 
            this.CACTUS_INTERVAL_MAX
        );

        this.nextCactusInverval = randNum;
    }

    // generate random number in interval
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    createCactus() {
        const index = this.getRandomNumber(0, this.cactiImages.length - 1);
        const cactusImage = this.cactiImages[index];
        const x = this.canvas.width * 1.25;
        const y = this.canvas.height - cactusImage.height;
        const cactus = new Cactus(
            this.ctx, 
            x, 
            y, 
            cactusImage.width, 
            cactusImage.height, 
            cactusImage.image
        );

        this.cacti.push(cactus);
    }

    update(gameSpeed, frameTimeDelta) { 
        if(this.nextCactusInverval <= 0) {
            this.createCactus();
            this.setNextCactusTime();
        }
        this.nextCactusInverval -= frameTimeDelta;

        this.cacti.forEach((cactus) => {
            cactus.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
        });

        this.cacti = this.cacti.filter((cactus) => cactus.x > -cactus.width);

        console.log(this.cacti.length);
    }

    draw() {
        this.cacti.forEach((cactus) => cactus.draw());
    }

    collideWith(sprite) {
        return this.cacti.some((cactus) => cactus.collideWith(sprite));
    }

    reset() {
        this.cacti = [];
    }
}