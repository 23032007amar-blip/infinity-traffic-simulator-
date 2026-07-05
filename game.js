// js/game.js

const Game = {
    canvas: null,
    ctx: null,

    width: 400,
    height: 700,

    running: false,
    paused: false,

    score: 0,
    coins: 0,
    level: 1,
    speed: 6,

    init() {

        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.score = 0;
        this.coins = 0;
        this.level = 1;
        this.speed = 6;

        if (typeof Road !== "undefined") Road.init();
        if (typeof Player !== "undefined") Player.init();
        if (typeof Traffic !== "undefined") Traffic.init();
        if (typeof Coins !== "undefined") Coins.init();

        this.running = true;

        requestAnimationFrame(this.loop.bind(this));
    },

    loop() {

        if (!this.running) return;

        if (!this.paused) {

            this.update();
            this.draw();

        }

        requestAnimationFrame(this.loop.bind(this));

    },

    update() {

        this.score += 0.1;

        if (Math.floor(this.score) % 500 === 0 && this.speed < 15) {
            this.speed += 0.01;
        }

        if (typeof Road !== "undefined") Road.update();

        if (typeof Player !== "undefined") Player.update();

        if (typeof Traffic !== "undefined") Traffic.update();

        if (typeof Coins !== "undefined") Coins.update();

        if (typeof Collision !== "undefined") Collision.update();

        if (typeof UI !== "undefined") UI.update();

    },

    draw() {

        this.ctx.clearRect(0, 0, this.width, this.height);

        if (typeof Road !== "undefined") Road.draw(this.ctx);

        if (typeof Coins !== "undefined") Coins.draw(this.ctx);

        if (typeof Traffic !== "undefined") Traffic.draw(this.ctx);

        if (typeof Player !== "undefined") Player.draw(this.ctx);

        if (typeof UI !== "undefined") UI.draw(this.ctx);

    },

    addCoin() {

        this.coins++;

    },

    addScore(points) {

        this.score += points;

    },

    pause() {

        this.paused = true;

    },

    resume() {

        this.paused = false;

    },

    gameOver() {

        this.running = false;

        Leaderboard.addScore(
            "Player",
            Math.floor(this.score),
            this.coins
        );

        alert(
            "GAME OVER\n\n" +
            "Score : " + Math.floor(this.score) +
            "\nCoins : " + this.coins
        );

        location.reload();

    }

};
