// js/main.js

window.addEventListener("load", () => {

    // Menu Buttons
    const menu = document.getElementById("menu");
    const game = document.getElementById("game");

    const playBtn = document.getElementById("playBtn");
    const garageBtn = document.getElementById("garageBtn");
    const shopBtn = document.getElementById("shopBtn");
    const leaderboardBtn = document.getElementById("leaderboardBtn");
    const settingsBtn = document.getElementById("settingsBtn");

    // Initialize modules
    if (typeof Garage !== "undefined") Garage.init();
    if (typeof Shop !== "undefined") Shop.init();
    if (typeof Leaderboard !== "undefined") Leaderboard.init();

    // Start Game
    playBtn.addEventListener("click", () => {

        menu.style.display = "none";
        game.style.display = "block";

        Game.init();

    });

    // Garage
    garageBtn.addEventListener("click", () => {

        alert("🚗 Garage Coming Soon");

    });

    // Shop
    shopBtn.addEventListener("click", () => {

        alert("🛒 Shop Coming Soon");

    });

    // Leaderboard
    leaderboardBtn.addEventListener("click", () => {

        let text = "🏆 TOP SCORES\n\n";

        Leaderboard.load();

        if (Leaderboard.scores.length === 0) {

            text += "No scores yet.";

        } else {

            Leaderboard.scores.forEach((score, index) => {

                text += `${index + 1}. ${score.name} - ${score.score}\n`;

            });

        }

        alert(text);

    });

    // Settings
    settingsBtn.addEventListener("click", () => {

        alert("⚙️ Settings Coming Soon");

    });

});
