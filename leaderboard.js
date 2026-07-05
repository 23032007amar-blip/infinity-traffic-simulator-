// js/leaderboard.js

const Leaderboard = {

    key: "traffic_racer_leaderboard",
    scores: [],

    init() {
        this.load();
    },

    load() {

        const data = localStorage.getItem(this.key);

        if (data) {
            this.scores = JSON.parse(data);
        } else {
            this.scores = [];
        }

    },

    save() {

        localStorage.setItem(
            this.key,
            JSON.stringify(this.scores)
        );

    },

    addScore(name, score, coins) {

        this.scores.push({

            name: name || "Player",
            score: Math.floor(score),
            coins: coins,
            date: new Date().toLocaleDateString()

        });

        // Highest score first
        this.scores.sort((a, b) => b.score - a.score);

        // Keep only Top 10
        if (this.scores.length > 10) {
            this.scores.length = 10;
        }

        this.save();

    },

    getTopScore() {

        if (this.scores.length === 0)
            return 0;

        return this.scores[0].score;

    },

    clear() {

        this.scores = [];
        localStorage.removeItem(this.key);

    },

    show() {

        let message = "🏆 TRAFFIC RACER LEADERBOARD\n\n";

        if (this.scores.length === 0) {

            message += "No High Scores Yet!";

        } else {

            this.scores.forEach((player, index) => {

                message +=
                    (index + 1) + ". " +
                    player.name +
                    " - " +
                    player.score +
                    " pts" +
                    " | 🪙 " +
                    player.coins +
                    "\n";

            });

        }

        alert(message);

    }

};
