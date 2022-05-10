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
    constructor(x, y, color, width, height, type) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.velocity = {
            x: 0,
            y: 0
        }
        this.type = type
        this.alive = true;
    }
    // renders pawns on screen
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    // this updates the position as the player is drawn
    update() {
        this.render()
        this.x += this.velocity.x
        this.y += this.velocity.y

        if(this.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity
        else this.velocity.y = 0
    }
}
// GAME OBJECTS
// tester pawn
const mrRat = new Pawns(30, 5, 'purple', 30, 30, 'player')
// key press tracker for mrRat movements
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}
// slimeballs
const slimeballOne = new Pawns(200, 5, 'limegreen', 30, 30, 'slimeball')
const slimeballTwo = new Pawns(300, 5, 'limegreen', 30, 30, 'slimeball')
const slimeballThree = new Pawns(400, 5, 'limegreen', 30, 30, 'slimeball')
const slimeballFour = new Pawns(500, 5, 'limegreen', 30, 30, 'slimeball')
const slimeballFive = new Pawns(600, 5, 'limegreen', 30, 30, 'slimeball')
const slimeballSix = new Pawns(700, 5, 'limegreen', 30, 30, 'slimeball')
const slimeballs = (Pawns.type === 'slimeball')
// console.log(slimeballs)

// me.update()
// console.log(me)

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
    winDetect()
    hitDetect(slimeballOne, mrRat)
    hitDetect(slimeballTwo, mrRat)
    hitDetect(slimeballThree, mrRat)
    hitDetect(slimeballFour, mrRat)
    hitDetect(slimeballFive, mrRat)
    hitDetect(slimeballSix, mrRat)
    // slimeballs.update()
    slimeballOne.update()
    slimeballTwo.update()
    slimeballThree.update()
    slimeballFour.update()
    slimeballFive.update()
    slimeballSix.update()
// if statement for rat movement
    if (keys.right.pressed && mrRat.x < 770) {
        mrRat.velocity.x = 2
    } else if (keys.left.pressed && mrRat.x > 30) {
        mrRat.velocity.x = -2
    } else mrRat.velocity.x = 0
}
animate()
// EVENT LISTENERS
// handles movement
// switch statement event listener for key down events
addEventListener('keydown', ({key}) => {
    switch (key) {
        case('ArrowRight'):
            // console.log('right')
            // mrRat.velocity.x += 1
            keys.right.pressed = true
            break
        
        case('ArrowLeft'):
            // console.log('left')
            // mrRat.velocity.x -= 1
            keys.left.pressed = true
            break

        case('ArrowUp'):
            // console.log('up')
            mrRat.velocity.y -= 5
            break
        
        case('ArrowDown'):
            // console.log('down')
            mrRat.velocity.y = 0
            break
    }
    // console.log(keys.right.pressed)
})
// switch statement event listener for key up events for smooth movement across keyboard settings
addEventListener('keyup', ({key}) => {
    switch (key) {
        case('ArrowRight'):
            // console.log('right')
            // mrRat.velocity.x = 0
            keys.right.pressed = false
            break
        
        case('ArrowLeft'):
            // console.log('left')
            // mrRat.velocity.x = 0
            keys.left.pressed = false
            break

        case('ArrowUp'):
            // console.log('up')
            mrRat.velocity.y -= 5
            break
        
        // case('ArrowDown'):
        //     // console.log('down')
        //     break
    }
    // console.log(keys.right.pressed)
})
// hit detection function for all slimeballs against mr Rat
function hitDetect(slimeball, player) {
    if (
        // left
        player.x + player.width >= slimeball.x &&
        // right
        player.x <= slimeball.x + slimeball.width &&
        // top
        player.y + player.height >= slimeball.y &&
        // bottom
        player.y <= slimeball.y + slimeball.height
    ) {
        mrRat.alive = false
        console.log('hit detected')
    }
}
// win detect function 
function winDetect() {
    if (mrRat.alive === true && mrRat.x >= 770) {
        console.log('you win')
    } else if (mrRat.alive === false && mrRat.x < 770) {
        console.log('you lose')
    }
}