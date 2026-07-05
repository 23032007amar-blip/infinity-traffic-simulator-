// js/shop.js

const Shop = {

    items: [
        {
            id: 1,
            name: "Fuel Refill",
            type: "fuel",
            price: 100,
            amount: 100
        },
        {
            id: 2,
            name: "Nitro Pack",
            type: "nitro",
            price: 250,
            amount: 5
        },
        {
            id: 3,
            name: "Extra Life",
            type: "life",
            price: 500,
            amount: 1
        },
        {
            id: 4,
            name: "Coin Pack",
            type: "coins",
            price: 0,
            amount: 500
        },
        {
            id: 5,
            name: "Gold Car Skin",
            type: "skin",
            price: 1000,
            image: "assets/cars/gold-player.png"
        }
    ],

    init() {
        this.load();
    },

    buy(id) {

        const item = this.items.find(i => i.id === id);

        if (!item) return;

        if (Game.coins < item.price) {
            alert("Not enough coins!");
            return;
        }

        Game.coins -= item.price;

        switch(item.type){

            case "fuel":
                Player.fuel = 100;
                break;

            case "nitro":
                Player.nitroPower += item.amount;
                if(Player.nitroPower > 100)
                    Player.nitroPower = 100;
                break;

            case "life":
                Player.lives += item.amount;
                break;

            case "coins":
                Game.coins += item.amount;
                break;

            case "skin":
                Player.image.src = item.image;
                Player.skin = "gold";
                break;

        }

        this.save();

        alert(item.name + " Purchased!");

    },

    save(){

        const data = {

            coins: Game.coins,

            fuel: Player.fuel,

            lives: Player.lives,

            nitro: Player.nitroPower,

            skin: Player.skin || "default"

        };

        localStorage.setItem(
            "shopData",
            JSON.stringify(data)
        );

    },

    load(){

        const data = JSON.parse(
            localStorage.getItem("shopData")
        );

        if(!data) return;

        Game.coins = data.coins;
        Player.fuel = data.fuel;
        Player.lives = data.lives;
        Player.nitroPower = data.nitro;
        Player.skin = data.skin;

        if(Player.skin === "gold"){

            Player.image.src =
                "assets/cars/gold-player.png";

        }

    },

    reset(){

        localStorage.removeItem("shopData");

    }

};
