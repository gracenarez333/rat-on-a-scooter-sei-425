// SPRITE IMPORTS
// import mrrat from '../img/mrrat.png' 
// import slimey from '../img/slimey.png'
// DOM SELECTORS
// canvas element
const canvas = document.querySelector('#canvas')
// status display
const statusDisplay = document.querySelector('#status')
const replayBtn = document.querySelector('#replayButton')

// CANVAS SETUP / GAME STATE
// set the rendering context of the canvas
const ctx = canvas.getContext('2d')

// set canvas width and height
canvas.width = 800
canvas.height = 400
// console.log(canvas)
// console.log(canvas.height)
// console.log(canvas.width)
// CLASSES
let gameOverStatus = false

const gameStatusTextElement = document.querySelector('[data-game-over-text]')
const gameStatusElement = document.getElementById('gameOver')
// controls gravity of all pawns
const gravity = .4
// const bounce = 1
// controls creation of characters
const ratImage = new Image()
ratImage.src = './img/mrrat.png'
const slimeImage = new Image()
slimeImage.src = './img/slimey.png'
class Pawns {
    constructor(x, y, color, width, height, type, image) {
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
        this.alive = true
        this.bounce = Math.random()
        this.image = image
    }
    // renders pawns on screen
    render() {
        // ctx.fillStyle = this.color
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
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

    slimeBounce() {
        this.render()
        this.x += this.velocity.x
        this.y += this.velocity.y

        if(this.y + this.height + this.velocity.y >= canvas.height){
        this.velocity.y = -this.velocity.y
        // this.bounce = -this.bounce
        }
    // } else this.bounce = 1
}
}
// GAME OBJECTS
// tester pawn
let mrRat = new Pawns(30, 5, 'purple', 50, 60, 'player', ratImage)
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
let slimeballOne = new Pawns(180, 5, 'limegreen', 40, 50, 'slimeball', slimeImage)
let slimeballTwo = new Pawns(350, 5, 'limegreen', 40, 50, 'slimeball', slimeImage)
let slimeballThree = new Pawns(500, 5, 'limegreen', 40, 50, 'slimeball', slimeImage)
let slimeballFour = new Pawns(650, 5, 'limegreen', 40, 50, 'slimeball', slimeImage)
// const slimeballFive = new Pawns(750, 5, 'limegreen', 50, 50, 'slimeball', slimeImage)
// const slimeballSix = new Pawns(700, 5, 'limegreen', 50, 50, 'slimeball', slimeImage)
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
    if (gameOverStatus) {
        // console.log('smd'); 
        return;
    }
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    mrRat.update()
    winDetect()
    // hit detection for each slimeball
    hitDetect(slimeballOne, mrRat)
    hitDetect(slimeballTwo, mrRat)
    hitDetect(slimeballThree, mrRat)
    hitDetect(slimeballFour, mrRat)
    // hitDetect(slimeballFive, mrRat)
    // hitDetect(slimeballSix, mrRat)
    // slimeball bounce
    slimeballOne.slimeBounce()
    slimeballTwo.slimeBounce()
    slimeballThree.slimeBounce()
    slimeballFour.slimeBounce()
    // slimeballFive.slimeBounce()
    // slimeballSix.slimeBounce()
    // slimeballs.update()
    slimeballOne.update()
    slimeballTwo.update()
    slimeballThree.update()
    slimeballFour.update()
    // slimeballFive.update()
    // slimeballSix.update()
// if statement for rat movement
    if (keys.right.pressed && mrRat.x < 800) {
        mrRat.velocity.x = 2.7
    } else if (keys.left.pressed && mrRat.x > 30) {
        mrRat.velocity.x = -2.7
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
        // right
        player.x + player.width >= slimeball.x &&
        // left
        player.x <= slimeball.x + slimeball.width &&
        // bottom
        player.y + player.height >= slimeball.y &&
        // top
        player.y <= slimeball.y + slimeball.height
    ) {
        mrRat.alive = false
        // console.log('hit detected')
    }
}
// win detect function 
function winDetect() {
    if (mrRat.alive === true && mrRat.x >= 800) {
        // console.log('you win')
        // ctx.clearRect(0, 0, canvas.width, canvas.height)
        gameOverStatus = true
        gameStatusTextElement.innerText = 'you win!'
        gameStatusElement.classList.add('show')
        // animate()
    } else if (mrRat.alive === false && mrRat.x < 800) {
        // console.log('you lose')
        // ctx.clearRect(0, 0, canvas.width, canvas.height)
        gameOverStatus = true
        gameStatusTextElement.innerText = 'you lose!'
        gameStatusElement.classList.add('show')
        // animate()
    } 
}
replayBtn.addEventListener('click', function(){
    refresh()
})

function refresh() {
    gameOverStatus = false
    mrRat = new Pawns(30, 5, 'purple', 50, 60, 'player', ratImage)
    slimeballOne = new Pawns(180, 5, 'limegreen', 40, 50, 'slimeball', slimeImage)
    slimeballTwo = new Pawns(350, 5, 'limegreen', 40, 50, 'slimeball', slimeImage)
    slimeballThree = new Pawns(500, 5, 'limegreen', 40, 50, 'slimeball', slimeImage)
    slimeballFour = new Pawns(650, 5, 'limegreen', 40, 50, 'slimeball', slimeImage)
    gameStatusElement.classList.remove('show')
    animate()
    // console.log('smd again')
}