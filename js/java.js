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
// console.log(canvas.height)
// console.log(canvas.width)
// CLASSES
// controls gravity of all pawns
const gravity = .5
// controls creation of characters
class Pawns {
    constructor(x, y, color, width, height, velocity) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.velocity = {
            x: 0,
            y: 0
        }
        // this.alive = true;
    }
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    update() {
        this.render()
        this.y += this.velocity.y
        if(this.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity
        else this.velocity.y = 0
    }
}
// tester pawn
const mrRat = new Pawns(5, 5, 'purple', 30, 30)
// me.update()
// console.log(me)
// GAME OBJECTS

// GAME FUNCTIONS
// draws the pawns
function draw(x, y, width, height, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}
// animates/updates screen for animation
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    mrRat.update()
}
animate()
// EVENT LISTENERS