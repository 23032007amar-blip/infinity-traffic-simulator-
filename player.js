// js/player.js

const Player = {

    x: 170,
    y: 560,

    width: 60,
    height: 100,

    speed: 7,
    moveSpeed: 7,

    fuel: 100,
    lives: 3,

    moveLeft: false,
    moveRight: false,

    nitro: false,
    nitroPower: 100,

    image: new Image(),

    init() {

        this.image.src = "assets/cars/player.png";

        this.controls();

    },

    controls() {

        document.addEventListener("keydown", (e) => {

            switch (e.key) {

                case "ArrowLeft":
                case "a":
                case "A":
                    this.moveLeft = true;
                    break;

                case "ArrowRight":
                case "d":
                case "D":
                    this.moveRight = true;
                    break;

                case "Shift":
                    this.nitro = true;
                    break;

            }

        });

        document.addEventListener("keyup", (e) => {

            switch (e.key) {

                case "ArrowLeft":
                case "a":
                case "A":
                    this.moveLeft = false;
                    break;

                case "ArrowRight":
                case "d":
                case "D":
                    this.moveRight = false;
                    break;

                case "Shift":
                    this.nitro = false;
                    break;

            }

        });

    },

    update() {

        let speed = this.moveSpeed;

        if (this.nitro && this.nitroPower > 0) {

            speed = 12;

            this.nitroPower -= 0.5;

        } else {

            if (this.nitroPower < 100) {

                this.nitroPower += 0.2;

            }

        }

        if (this.moveLeft)
            this.x -= speed;

        if (this.moveRight)
            this.x += speed;

        // Road limits
        if (this.x < 55)
            this.x = 55;

        if (this.x > 285)
            this.x = 285;

        // Fuel
        this.fuel -= 0.01;

        if (this.fuel <= 0) {

            this.fuel = 0;

            Game.gameOver();

        }

    },

    draw(ctx) {

        if (this.image.complete) {

            ctx.drawImage(
                this.image,
                this.x,
                this.y,
                this.width,
                this.height
            );

        } else {

            ctx.fillStyle = "red";

            ctx.fillRect(
                this.x,
                this.y,
                this.width,
                this.height
            );

        }

    },

    crash() {

        this.lives--;

        if (this.lives <= 0) {

            Game.gameOver();

        }

    },

    addFuel(value) {

        this.fuel += value;

        if (this.fuel > 100)
            this.fuel = 100;

    },

    reset() {

        this.x = 170;
        this.y = 560;

        this.fuel = 100;
        this.lives = 3;

        this.nitroPower = 100;

        this.moveLeft = false;
        this.moveRight = false;

    }

};
