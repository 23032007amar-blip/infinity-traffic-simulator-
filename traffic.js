// js/traffic.js

const Traffic = {

    cars: [],
    images: [],

    spawnTimer: 0,
    spawnDelay: 80,

    lanes: [70, 170, 270],

    init() {

        const files = [
            "assets/cars/sedan.png",
            "assets/cars/suv.png",
            "assets/cars/taxi.png",
            "assets/cars/truck.png",
            "assets/cars/bus.png",
            "assets/cars/police.png",
            "assets/cars/sports.png"
        ];

        files.forEach(file => {
            const img = new Image();
            img.src = file;
            this.images.push(img);
        });

        this.cars = [];

    },

    update() {

        this.spawnTimer++;

        if (this.spawnTimer >= this.spawnDelay) {
            this.spawnCar();
            this.spawnTimer = 0;
        }

        for (let i = this.cars.length - 1; i >= 0; i--) {

            const car = this.cars[i];

            // Move downward
            car.y += Game.speed + car.speed;

            // Remove if off screen
            if (car.y > Game.height + 120) {
                this.cars.splice(i, 1);
                continue;
            }

            // Collision
            if (
                Player.x < car.x + car.width &&
                Player.x + Player.width > car.x &&
                Player.y < car.y + car.height &&
                Player.y + Player.height > car.y
            ) {

                Player.crash();
                this.cars.splice(i, 1);

            }

        }

    },

    draw(ctx) {

        this.cars.forEach(car => {

            if (car.image.complete) {

                ctx.drawImage(
                    car.image,
                    car.x,
                    car.y,
                    car.width,
                    car.height
                );

            } else {

                ctx.fillStyle = "#0066ff";

                ctx.fillRect(
                    car.x,
                    car.y,
                    car.width,
                    car.height
                );

            }

        });

    },

    spawnCar() {

        const lane =
            this.lanes[Math.floor(Math.random() * this.lanes.length)];

        const image =
            this.images[Math.floor(Math.random() * this.images.length)];

        this.cars.push({

            x: lane,
            y: -120,

            width: 60,
            height: 100,

            speed: Math.random() * 3 + 2,

            image: image

        });

    },

    reset() {

        this.cars = [];
        this.spawnTimer = 0;

    }

};
