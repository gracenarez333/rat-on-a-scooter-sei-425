// DOM SELECTORS
// canvas element
const canvas = document.querySelector('#canvas')
// cheese counter

// CANVAS SETUP / GAME STATE
// set the rendering context of the canvas
const ctx = canvas.getContext('2d')

// set canvas width and height
canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])
// console.log(canvas)

// CLASSES
// controls creation of characters
class Pawns {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        // this.alive = true;
    }

    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
// tester pawn
const me = new Pawns(5, 5, 'blue', 30, 30)
me.render()
console.log(me)
// GAME OBJECTS

// GAME FUNCTIONS

function draw(x, y, width, height, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}

// EVENT LISTENERS