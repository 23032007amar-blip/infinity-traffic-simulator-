// js/collision.js

const Collision = {

    update() {

        this.checkTraffic();
        this.checkCoins();

    },

    // -------------------------
    // Traffic Collision
    // -------------------------
    checkTraffic() {

        for (let i = Traffic.cars.length - 1; i >= 0; i--) {

            const car = Traffic.cars[i];

            if (this.isColliding(Player, car)) {

                Player.crash();

                // Remove crashed traffic car
                Traffic.cars.splice(i, 1);

                // End game if no lives left
                if (Player.lives <= 0) {
                    Game.gameOver();
                }

            }

        }

    },

    // -------------------------
    // Coin Collision
    // -------------------------
    checkCoins() {

        for (let i = Coins.list.length - 1; i >= 0; i--) {

            const coin = Coins.list[i];

            if (this.isColliding(Player, {

                x: coin.x,
                y: coin.y,
                width: coin.size,
                height: coin.size

            })) {

                Game.coins++;
                Game.score += 20;

                Coins.list.splice(i, 1);

            }

        }

    },

    // -------------------------
    // Rectangle Collision
    // -------------------------
    isColliding(a, b) {

        return (

            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y

        );

    }

};
