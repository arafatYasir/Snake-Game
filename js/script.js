let canvas = document.getElementById("gameField");
let ctx = canvas.getContext("2d");
let scoreElement = document.querySelector(".score");

let gridSize = 20;
let tiles = canvas.width / gridSize;
let speed = 100;

// game initial setup
let snake = [
    { x: 10, y: 10 },
];

let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && dy !== 1) {
        dx = 0;
        dy = -1;
    }
    else if (e.key === "ArrowDown" && dy !== -1) {
        dx = 0;
        dy = 1;
    }
    else if (e.key === "ArrowLeft" && dx !== 1) {
        dx = -1;
        dy = 0;
    }
    else if (e.key === "ArrowRight" && dx !== -1) {
        dx = 1;
        dy = 0;
    }
});

function drawGame() {
    ctx.fillStyle = "#1b1b1b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    // drawing snake
    ctx.fillStyle = "#00ffff";
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
    }

    // drawing food
    ctx.fillStyle = "#ff004f";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function updateSnake() {
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };

    // checking for edge collision
    if (head.x < 0 || head.x >= tiles || head.y < 0 || head.y >= tiles) {
        resetGame();
        return;
    }

    // checking for self collision
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
            return;
        }
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        if(score % 5 === 0) {
            speed -= 5;
        }
        scoreElement.innerHTML = `Score: ${score}`;
        generateFood();
    }
    else {
        snake.pop();
    }
}

function generateFood() {
    food.x = parseInt(Math.random() * (tiles - 1));
    food.y = parseInt(Math.random() * (tiles - 1));

    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === food.x && snake[i].y === food.y) {
            generateFood();
            return;
        }
    }
}

function resetGame() {
    snake = [
        { x: 10, y: 10 },
    ];

    food = { x: 15, y: 15 };
    dx = 0;
    dy = 0;
    score = 0;
    speed = 100;
    scoreElement.innerHTML = `Score: 0`;
}

function runGame() {
    updateSnake();
    drawGame();
    setTimeout(runGame, speed);
}

runGame();