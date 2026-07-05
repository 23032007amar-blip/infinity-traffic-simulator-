// js/storage.js

const Storage = {

    KEY: "traffic_racer_save",

    save() {

        const data = {

            score: Game.score,
            coins: Game.coins,
            level: Game.level,
            speed: Game.speed,

            player: {

                fuel: Player.fuel,
                lives: Player.lives,
                nitroPower: Player.nitroPower

            },

            garage: {

                selectedCar: Garage.selectedCar,
                cars: Garage.cars

            },

            leaderboard: Leaderboard.scores

        };

        localStorage.setItem(
            this.KEY,
            JSON.stringify(data)
        );

    },

    load() {

        const save = localStorage.getItem(this.KEY);

        if (!save) return;

        const data = JSON.parse(save);

        // Game
        Game.score = data.score || 0;
        Game.coins = data.coins || 0;
        Game.level = data.level || 1;
        Game.speed = data.speed || 6;

        // Player
        Player.fuel = data.player?.fuel || 100;
        Player.lives = data.player?.lives || 3;
        Player.nitroPower = data.player?.nitroPower || 100;

        // Garage
        if (data.garage) {

            Garage.selectedCar = data.garage.selectedCar;
            Garage.cars = data.garage.cars;

            const car = Garage.cars[Garage.selectedCar];

            if (car) {
                Player.image.src = car.image;
                Player.speed = car.speed;
            }

        }

        // Leaderboard
        if (data.leaderboard) {

            Leaderboard.scores = data.leaderboard;

        }

    },

    reset() {

        localStorage.removeItem(this.KEY);

    },

    autoSave() {

        setInterval(() => {

            this.save();

        }, 5000);

    }

};
