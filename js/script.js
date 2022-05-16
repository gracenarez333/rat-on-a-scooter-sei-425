// DOM SELECTORS

// canvas element
const canvas = document.querySelector('#canvas')
// status display
const statusDisplay = document.querySelector('#status')
// replay button
const replayBtn = document.querySelector('#replayButton')
// start button
const startBtn = document.querySelector('#startButton')

// CANVAS SETUP / GAME STATE
// set the rendering context of the canvas

const ctx = canvas.getContext('2d')

// set canvas width and height

canvas.width = 800
canvas.height = 400

// CLASSES

// audios
const click = new Audio('./audio/click.mp3')
click.volume = .4
const jump = new Audio('./audio/jump.mp3')
jump.volume = .4
const winner = new Audio('./audio/win.mp3')
winner.volume = .4
const loser = new Audio('./audio/loser.mp3')
loser.volume = .4

let gameStartStatus = false
let gameOverStatus = false

const gameStatusTextElement = document.querySelector('[data-game-over-text]')
const gameStatusElement = document.getElementById('gameOver')
const startGameElement = document.getElementById('gameStart')

// controls gravity of all pawns
const gravity = .4

// controls creation of characters
// controls sprites
const ratImage = new Image()
ratImage.src = './img/mrrat.png'
const slimeImage = new Image()
slimeImage.src = './img/slimey.png'
const cheeseImage = new Image()
cheeseImage.src = './img/cheese.png'
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
        }
    }
}
// GAME OBJECTS
// rat pawns
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
let slimeballTwo = new Pawns(350, -10, 'limegreen', 40, 50, 'slimeball', slimeImage)
let slimeballThree = new Pawns(500, 5, 'limegreen', 40, 50, 'slimeball', slimeImage)
let slimeballFour = new Pawns(650, -10, 'limegreen', 40, 50, 'slimeball', slimeImage)
// const slimeballFive = new Pawns(750, 5, 'limegreen', 50, 50, 'slimeball', slimeImage)
// const slimeballSix = new Pawns(700, -10, 'limegreen', 50, 50, 'slimeball', slimeImage)
const slimeballs = (Pawns.type === 'slimeball')
// cheese
let cheeseOne = new Pawns(265, 5, 'yellow', 30, 30, 'snack', cheeseImage)
let cheeseTwo = new Pawns(415, 5, 'yellow', 40, 40, 'snack', cheeseImage)
let cheeseThree = new Pawns(575, 5, 'yellow', 50, 50, 'snack', cheeseImage)
let cheeseFour = new Pawns(710, 5, 'yellow', 60, 60, 'snack', cheeseImage)

// GAME FUNCTIONS

// draws the pawns
function draw(x, y, width, height, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}
// animates/updates screen for animation
function animate() {
    if (gameOverStatus) {
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
    // slimeballs update
        slimeballOne.update()
        slimeballTwo.update()
        slimeballThree.update()
        slimeballFour.update()
    // slimeballFive.update()
    // slimeballSix.update()
    // cheese update
        cheeseOne.update()
        cheeseTwo.update()
        cheeseThree.update()
        cheeseFour.update()
// if statement for rat movement
            if (keys.right.pressed && mrRat.x < 800) {
            mrRat.velocity.x = 2.7
            } else if (keys.left.pressed && mrRat.x > 30) {
            mrRat.velocity.x = -2.7
            } else mrRat.velocity.x = 0
}

// EVENT LISTENERS
// handles movement
// switch statement event listener for key down events
addEventListener('keydown', ({key}) => {
    switch (key) {
        case('ArrowRight'):
            keys.right.pressed = true
            break
        
        case('ArrowLeft'):
            keys.left.pressed = true
            break

        case('ArrowUp'):
            mrRat.velocity.y -= 5
            jump.play()
            break
        
        case('ArrowDown'):
            mrRat.velocity.y = 0
            break
    }
})

// switch statement event listener for key up events for smooth movement across keyboard settings
addEventListener('keyup', ({key}) => {
    switch (key) {
        case('ArrowRight'):
            keys.right.pressed = false
            break
        
        case('ArrowLeft'):
            keys.left.pressed = false
            break

        case('ArrowUp'):
            mrRat.velocity.y -= 5
            break
    }
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
    }
}

// win detect function 
function winDetect() {
    if (mrRat.alive === true && mrRat.x >= 800) {
        gameOverStatus = true
        gameStatusTextElement.innerText = 'you win!'
        gameStatusElement.classList.add('show')
        winner.play()
    } else if (mrRat.alive === false && mrRat.x < 800) {
        gameOverStatus = true
        gameStatusTextElement.innerText = 'you lose!'
        gameStatusElement.classList.add('show')
        loser.play()
    } 
}

// start button event listener
startBtn.addEventListener('click', function(){
    go()
    click.play()
})
// go function to start rendering when start is clicked
function go() {
    startGameElement.classList.add('hidden')
    animate()
}
// replay button event listener
replayBtn.addEventListener('click', function(){
    refresh()
    click.play()
})
// refresh function to clear game and re-render
function refresh() {
    gameOverStatus = false
    mrRat = new Pawns(30, 5, 'purple', 50, 60, 'player', ratImage)
    slimeballOne = new Pawns(180, 5, 'limegreen', 40, 50, 'slimeball', slimeImage)
    slimeballTwo = new Pawns(350, -10, 'limegreen', 40, 50, 'slimeball', slimeImage)
    slimeballThree = new Pawns(500, 5, 'limegreen', 40, 50, 'slimeball', slimeImage)
    slimeballFour = new Pawns(650, -10, 'limegreen', 40, 50, 'slimeball', slimeImage)
    cheeseOne = new Pawns(265, 5, 'yellow', 30, 30, 'snack', cheeseImage)
    cheeseTwo = new Pawns(415, 5, 'yellow', 40, 40, 'snack', cheeseImage)
    cheeseThree = new Pawns(575, 5, 'yellow', 50, 50, 'snack', cheeseImage)
    cheeseFour = new Pawns(710, 5, 'yellow', 60, 60, 'snack', cheeseImage)
    gameStatusElement.classList.remove('show')
    animate()
}