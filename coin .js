// js/coins.js

const Coins = {

    list: [],
    image: new Image(),

    spawnTimer: 0,
    spawnDelay: 100,

    lanes: [70, 170, 270],

    init() {

        this.image.src = "assets/items/coin.png";
        this.list = [];

    },

    update() {

        this.spawnTimer++;

        if (this.spawnTimer >= this.spawnDelay) {

            this.spawnCoin();
            this.spawnTimer = 0;

        }

        for (let i = this.list.length - 1; i >= 0; i--) {

            let coin = this.list[i];

            // Move coin downward
            coin.y += Game.speed;

            // Rotate coin
            coin.angle += 0.15;

            // Remove off-screen coins
            if (coin.y > Game.height + 50) {

                this.list.splice(i, 1);
                continue;

            }

            // Collect coin
            if (
                Player.x < coin.x + coin.size &&
                Player.x + Player.width > coin.x &&
                Player.y < coin.y + coin.size &&
                Player.y + Player.height > coin.y
            ) {

                Game.coins++;
                Game.score += 10;

                this.list.splice(i, 1);

            }

        }

    },

    draw(ctx) {

        this.list.forEach(coin => {

            ctx.save();

            ctx.translate(
                coin.x + coin.size / 2,
                coin.y + coin.size / 2
            );

            ctx.rotate(coin.angle);

            if (this.image.complete) {

                ctx.drawImage(
                    this.image,
                    -coin.size / 2,
                    -coin.size / 2,
                    coin.size,
                    coin.size
                );

            } else {

                ctx.fillStyle = "gold";

                ctx.beginPath();
                ctx.arc(0, 0, coin.size / 2, 0, Math.PI * 2);
                ctx.fill();

            }

            ctx.restore();

        });

    },

    spawnCoin() {

        const lane =
            this.lanes[Math.floor(Math.random() * this.lanes.length)];

        this.list.push({

            x: lane + 10,
            y: -40,

            size: 35,

            angle: 0

        });

    },

    reset() {

        this.list = [];
        this.spawnTimer = 0;

    }

};
