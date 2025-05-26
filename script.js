const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');
const scoreDisplay = document.getElementById('score');
const speedControl = document.getElementById('speedControl');
const speedDisplay = document.getElementById('speedDisplay');
const countdown = document.getElementById('countdown');

const gameOverSound = document.getElementById('gameOverSound');
const biteSound = document.getElementById('biteSound');
const startSound = document.getElementById('startSound');
const pauseSound = document.getElementById('pauseSound');
const restartSound = document.getElementById('restartSound');

canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 200, y: 200 }];
let direction = { x: 20, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let gameRunning = false;
let isPaused = false;
let speed = 5;
let frameInterval = 1000 / speed;
let lastTime = 0;

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}


function getRandomFoodPosition() {
    const gridSize = 20;
    const maxGrids = canvas.width / gridSize;
    return {
        x: Math.floor(Math.random() * maxGrids) * gridSize,
        y: Math.floor(Math.random() * maxGrids) * gridSize
    };
}

function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.beginPath();
        ctx.arc(segment.x + 10, segment.y + 10, 10, 0, Math.PI * 2);
        ctx.fillStyle = index === 0 ? 'blue' : 'green'; 
        ctx.fill();
    });
}

function drawFood() {
    ctx.beginPath();
    ctx.arc(food.x + 10, food.y + 10, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
}

function updateGame(time) {
    if (!gameRunning || isPaused) return;
    if (time - lastTime < frameInterval) {
        requestAnimationFrame(updateGame);
        return;
    }
    lastTime = time;

    const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };

    if (newHead.x === food.x && newHead.y === food.y) {
        snake.push({}); 
        food = getRandomFoodPosition();
        score += 10;
        scoreDisplay.textContent = score;
        playSound(biteSound);
    } else {
        snake.pop(); 
    }

    snake.unshift(newHead);

    
    if (checkCollision(newHead)) {
        gameOver();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();

    requestAnimationFrame(updateGame);
}


function checkCollision(head) {
    return (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
    );
}


function gameOver() {
    gameRunning = false;
    playSound(gameOverSound);
    ctx.fillStyle = 'black';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
}


function startCountdown(callback) {
    let count = 3;
    countdown.style.display = 'block';

    const showCount = () => {
        if (count > 0) {
            countdown.textContent = count;
        } else if (count === 0) {
            countdown.textContent = "Let's go!";
            playSound(startSound);
        } else {
            countdown.style.display = 'none';
            clearInterval(interval);
            callback();
        }
        count--;
    };

    showCount();
    const interval = setInterval(showCount, 600);
}


function startGame() {
    gameRunning = false;

    startCountdown(() => {
        gameRunning = true;
        isPaused = false;
        direction = { x: 20, y: 0 };
        snake = [{ x: 200, y: 200 }];
        food = getRandomFoodPosition();
        score = 0;
        scoreDisplay.textContent = score;
        speed = parseInt(speedControl.value);
        frameInterval = 1000 / speed;
        lastTime = 0;
        requestAnimationFrame(updateGame);
    });
}


function restartGame() {
    playSound(restartSound);
    startGame();
}


function pauseGame() {
    isPaused = !isPaused;
    playSound(pauseSound);
}


document.addEventListener('keydown', event => {
    const keyMap = {
        37: [-20, 0], // left
        38: [0, -20], // up
        39: [20, 0],  // right
        40: [0, 20]   // down
    };

    if (keyMap[event.keyCode]) {
        const [x, y] = keyMap[event.keyCode];
        const nextX = snake[0].x + x;
        const nextY = snake[0].y + y;

        
        if (snake.length > 1 && nextX === snake[1].x && nextY === snake[1].y) return;

        direction = { x, y };
    }
});


speedControl.addEventListener('input', () => {
    speedDisplay.textContent = speedControl.value;
});


startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', pauseGame);
restartBtn.addEventListener('click', restartGame);

