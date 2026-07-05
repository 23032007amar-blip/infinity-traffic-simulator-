// js/road.js

const Road = {

    x: 50,
    y: 0,

    width: 300,
    height: 700,

    lineWidth: 8,
    lineHeight: 50,
    gap: 30,

    offset: 0,

    image: new Image(),

    init() {

        this.image.src = "assets/roads/city-road.png";

    },

    update() {

        this.offset += Game.speed;

        if (this.offset >= this.lineHeight + this.gap) {
            this.offset = 0;
        }

    },

    draw(ctx) {

        // Grass
        ctx.fillStyle = "#2e7d32";
        ctx.fillRect(0, 0, Game.width, Game.height);

        // Road Background
        if (this.image.complete) {

            ctx.drawImage(
                this.image,
                this.x,
                0,
                this.width,
                this.height
            );

        } else {

            ctx.fillStyle = "#555";
            ctx.fillRect(
                this.x,
                0,
                this.width,
                this.height
            );

        }

        // Road Borders
        ctx.fillStyle = "white";

        ctx.fillRect(this.x - 2, 0, 4, this.height);
        ctx.fillRect(this.x + this.width - 2, 0, 4, this.height);

        // Lane Markings
        ctx.fillStyle = "white";

        const lane1 = this.x + 100;
        const lane2 = this.x + 200;

        for (let y = -80; y < Game.height + 80; y += this.lineHeight + this.gap) {

            ctx.fillRect(
                lane1,
                y + this.offset,
                this.lineWidth,
                this.lineHeight
            );

            ctx.fillRect(
                lane2,
                y + this.offset,
                this.lineWidth,
                this.lineHeight
            );

        }

    },

    getLane(index) {

        const lanes = [
            70,
            170,
            270
        ];

        return lanes[index];

    },

    changeRoad(type) {

        switch (type) {

            case "city":
                this.image.src = "assets/roads/city-road.png";
                break;

            case "desert":
                this.image.src = "assets/roads/desert-road.png";
                break;

            case "forest":
                this.image.src = "assets/roads/forest-road.png";
                break;

            case "snow":
                this.image.src = "assets/roads/snow-road.png";
                break;

            case "beach":
                this.image.src = "assets/roads/beach-road.png";
                break;

            default:
                this.image.src = "assets/roads/city-road.png";

        }

    }

};
