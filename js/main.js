'use strict'

const width = 300;
const height = 300;

const canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#e5cc81';
ctx.fillRect(10, 10, width, height);


class Walker {
    pos = {x: 0, y: 0}

    constructor() {
        this.pos.x = width / 2;
        this.pos.y = height / 2;
        this.display();
    }

    display() {
        ctx.strokeStyle = '#000000';
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.stroke();
    }

    randomMove() {
        const random = randomIntFromInterval(0,3);
        let moveTo = [
            () => { this.pos.x += 1; },
            () => { this.pos.x -= 1; },
            () => { this.pos.y += 1; },
            () => { this.pos.y -= 1; }
        ];

        moveTo[random]();
        ctx.lineTo(this.pos.x, this.pos.y)
        ctx.stroke();
    }
}

let walker = new Walker();

window.setInterval(() => {
    walker.randomMove();
}, 10)


function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}