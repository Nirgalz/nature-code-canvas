'use strict'

const width = 800;
const height = 500;
let mousePos = {x: 0, y: 0};
let velocity = 5;

const canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#e5cc81';
ctx.fillRect(0, 0, width, height);

execExempleBtns();

class Walker {
    pos = {x: 0, y: 0};
    interval;

    constructor(funcName) {
        this.pos.x = width / 2;
        this.pos.y = height / 2;
        this.display();
        this.interval = setInterval(() => {
            this[funcName]();
        }, 1)
    }

    execExemple(funcName) {
        clearInterval(this.interval);
        ctx.clearRect(0,0, canvas.width, canvas.height);

        ctx.fillStyle = '#e5cc81';
        ctx.fillRect(0, 0, width, height);
        this.pos.x = width / 2;
        this.pos.y = height / 2;
        ctx.beginPath();
        this.interval = setInterval(() => {
            this[funcName]();
        }, 1)
    }

    display() {
        ctx.strokeStyle = '#000000';
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.stroke();
    }

    randomMove() {
        const random = randomIntFromInterval(0, 3);
        let moveTo = [
            () => {
                this.pos.x += 1;
            },
            () => {
                this.pos.x -= 1;
            },
            () => {
                this.pos.y += 1;
            },
            () => {
                this.pos.y -= 1;
            }
        ];

        moveTo[random]();
        moveToTarget(this)
    }

    randomMoveLeftRight() {
        const random = randomIntFromInterval(0, 4);
        let moveTo = [
            () => {
                this.pos.x += 1;
            },
            () => {
                this.pos.x -= 1;
            },
            () => {
                this.pos.y += 1;
            },
            () => {
                this.pos.y -= 1;
            },
            () => {
                this.pos.x += 1;
                this.pos.y += 1;
            }
        ];

        moveTo[random]();
        moveToTarget(this)
    }

    randomMoveToMouse() {
        const random = randomIntFromInterval(0, 7);
        let moveTo = [
            () => {
                this.pos.x += 1;
            },
            () => {
                this.pos.x -= 1;
            },
            () => {
                this.pos.y += 1;
            },
            () => {
                this.pos.y -= 1;
            },
        ];
        if (random > 3) {
            this.pos.x += mousePos.x > this.pos.x ? 1 : -1;
            this.pos.y += mousePos.y > this.pos.y ? 1 : -1;
        } else {
            moveTo[random]();
        }
        moveToTarget(this)
    }
}

function moveToTarget(el) {
    if (el.pos.x > width) {
        el.pos.x -= 1;
    } else if (el.pos.x < 0) {
        el.pos.x += 1;
    }
    if (el.pos.y > height) {
        el.pos.y -= 2;
    } else if (el.pos.x < 0) {
        el.pos.y += 2;
    }

    ctx.lineTo(el.pos.x, el.pos.y)
    ctx.stroke();
}

let walker = new Walker('randomMoveLeftRight');

document.addEventListener('mousemove', evt => {
    mousePos = getMousePos(canvas, evt);
})


function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


$('.exec-btn').on('click', function (e) {
    e.preventDefault();
    walker.execExemple($(this).data('exec'));
    console.log($(this).data('exec'))
})



function execExempleBtns() {
    const exemples = {
        'introduction': ['randomMove', 'randomMoveLeftRight', 'randomMoveToMouse']
    }
    const keys = Object.keys(exemples);
    let dropdowns = '';
    keys.forEach((key, index) => {
        dropdowns += ` <a class="navbar-brand" href="#"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#${key}-dropdown" aria-controls="#${key}-dropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="#${key}-dropdown">
            <ul class="navbar-nav">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="${key}-DropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        ${key}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="${key}-DropdownMenuLink">`;
        exemples[key].forEach((key, index) => {
            dropdowns += `<li><a class="dropdown-item exec-btn" data-exec="${key}" href="">${key}</a></li>`;
        })
        dropdowns += `</ul>
                </li>
            </ul>
        </div>`;
        $('#nav-links').append(dropdowns);
    });
}