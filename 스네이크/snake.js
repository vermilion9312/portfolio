function init() {
    generateApple();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawTile();
    drawWall();

    eat();
    setSnake();
    drawApple();
    drawSnake();


    if (wallCollision() || bodyCollision()) {

        alert("Game Over!");
        clearInterval(intervalId);
    }
    drawWall();
}



function setSnake() {
    x += dx;
    y += dy;
    var snake = {
        x: x,
        y: y,
        color: "orange"
    };
    while (snakeList.length > snakeLength) {
        // 뱀몸 제한을 넘으면 배열 안의 객체를 자르고
        snakeList.shift();
    }
    // 새로운 객체를 배열 안에 집어 넣는다
    snakeList.push(snake);
}

function drawSnake() {
    for (var i = 0; i < snakeList.length; i += 1) {
        ctx.fillStyle = snakeList[i].color;
        ctx.fillRect(snakeList[i].x, snakeList[i].y, size, size);
    }
}

function drawTile() {
    var k = 0;
    for (var i = 0; i < Math.floor(canvas.width / size); i += 1) {
        for (var j = 0; j < Math.floor(canvas.height / size); j += 1) {
            if (k % 2 == 0) {
                ctx.fillStyle = "palegreen";
                ctx.fillRect(size * i, size * j, size, size);
            } else {
                ctx.fillStyle = "green";
                ctx.fillRect(size * i, size * j, size, size);
            }
            k += 1
        }
    }
}

function drawWall() {
    ctx.fillStyle = "rgb(30, 30, 30)";
    ctx.fillRect(0, 0, size, canvas.height);
    ctx.fillRect(0, 0, canvas.width, size);
    ctx.fillRect(canvas.width - size, 0, size, canvas.height);
    ctx.fillRect(0, canvas.width - size, canvas.width, size);
}


function generateApple() {
    while (true) {
        check = true;

        // 랜덤한 위치에 사과를 생성한다.
        appleX = (Math.floor(Math.random() * ((canvas.width - 2 * size)) / size) + 1) * size;
        appleY = (Math.floor(Math.random() * ((canvas.height - 2 * size)) / size) + 1) * size;

        // 사과가 뱀몸 안에 생성된다면, 다시 while문을 돌려 새로 생성한다
        for (var i = 0; i < snakeList.length; i += 1) {
            if (snakeList[i].x == appleX && snakeList[i].y == appleY) {
                check = false;
            }
        }

        if (check) {
            break;
        }
    }
}

function eat() {
    if (x == appleX && y == appleY) {
        // 사과를 먹으면 뱀몸의 제한을 늘린다
        snakeLength += 1;
        generateApple();
    }
}

function drawApple() {
    ctx.beginPath();

    ctx.fillStyle = "red";
    ctx.arc(appleX + size / 2, appleY + size / 2, size / 3, 0, 360);
    ctx.fill();

    ctx.closePath();
}

function wallCollision() {
    if (x < size || x > canvas.width - 2 * size || y <= size || y >= canvas.height - 2 * size) {
        return true
    }
}

function bodyCollision() {
    for (var i = 0; i < snakeList.length - 1; i += 1) {
        var idx = snakeList.length - 1;
        if (snakeList[idx].x == snakeList[i].x && snakeList[idx].y == snakeList[i].y) {
            return true
        }
    }

}
//==========================================
var canvas = document.getElementById("snake");
var ctx = canvas.getContext("2d");

var size = 30;
var snakeList = [];
var snakeLength = 5;
var appleX;
var appleY;

var x = size;
var y = 2 * size;
var dx = size;
var dy = 0;

document.onkeydown = function (e) {
    switch (e.code) {
        case "KeyW":
            if (dy != size) {
                dx = 0;
                dy = -size;
            }
            break;
        case "KeyS":
            if (dy != -size) {
                dx = 0;
                dy = size;
            }
            break;
        case "KeyA":
            if (dx != size) {
                dx = -size;
                dy = 0;
            }
            break;
        case "KeyD":
            if (dx != -size) {
                dx = size;
                dy = 0;
            }
            break;
    }
}
intervalId = setInterval(draw, 100);
init();