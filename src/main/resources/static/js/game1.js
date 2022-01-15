const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


let x = canvas.width / 2;
let y = canvas.height - 30;

// 공속도
let dx = 5;
let dy = -5;

let ballRadius = 10;

// 발판
let paddleHeight = 10;
let paddleWidth = 100;
let rightPressed = false;
let leftPressed = false;

// 블록개수
let blockRowCount = 6;
let blockColumnCount = 5;

let blockWidth = 75;
let blockHeight = 20;
let blockPadding = 10;

// 블록 위치
let blockOffsetTop = 40;
let blockOffsetLeft = 40;

let score = 0;
let colorSet = false;
let lives = 3;

// 블럭 2차 배열 생성
let block = [];
for (let c = 0; c < blockColumnCount; c++) {
    block[c] = [];
    for (let r = 0; r < blockRowCount; r++) {
        block[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// 블럭 화면에 그려줌
function drawBlock() {
    for (let c = 0; c < blockColumnCount; c++) {
        for (let r = 0; r < blockRowCount; r++) {
            //status가 1이면 블럭을 그림
            if (block[c][r].status === 1) {
                let blockX = c * (blockWidth + blockPadding) + blockOffsetLeft;
                let blockY = r * (blockHeight + blockPadding) + blockOffsetTop;
                block[c][r].x = blockX;
                block[c][r].y = blockY;
                ctx.beginPath(); // 경로 생성
                ctx.rect(blockX, blockY, blockWidth, blockHeight); // 블록 그리기
                //블록색
                ctx.fillStyle = "black";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// x축위 시작 위치
let paddleX = (canvas.width - paddleWidth) / 2;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);

    if (!colorSet) {
        ctx.fillStyle = "yellow";
    } else {
        let ranColor = Math.floor(Math.random() * 255);
        let ranColor1 = Math.floor(Math.random() * 255);
        let ranColor2 = Math.floor(Math.random() * 255);
        ctx.fillStyle = `rgb(${ranColor},${ranColor1},${ranColor2})`;
    }
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(
        paddleX,
        canvas.height - paddleHeight,
        paddleWidth,
        paddleHeight
    );
    // padddle color
    ctx.fillStyle = "purple";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    //위치 바뀌기 전 공 삭제
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBlock();
    drawScore();
    drawLives();
    collisionDetection();

    // 벽면에 닿으면 반대로 이동
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy * 1.1;
        } else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 5;
                dy = -5;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
        //leftPressed 가 투르고 뒤가 0보다 크면
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();

function keyDownHandler(e) {
    if (e.keyCode === 39) {
        rightPressed = true;
    } else if (e.keyCode === 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.keyCode === 39) {
        rightPressed = false;
    } else if (e.keyCode === 37) {
        leftPressed = false;
    }
}

document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

// 블럭에 충돌 감지 함수
// 공이 벽돌안에 존재하려면?
// 공의 x,y좌표는 벽돌의 x,y좌표보다 커야한다.
// 공의 x,y좌표는 벽돌의 x,y좌표 + 가로길이, 세로길이 보다 작아야한다.
function collisionDetection() {
    for (let c = 0; c < blockColumnCount; c++) {
        for (let r = 0; r < blockRowCount; r++) {
            let b = block[c][r];
            if (b.status === 1) {
                if (
                    x > b.x &&
                    x < b.x + blockWidth &&
                    y > b.y &&
                    y < b.y + blockHeight
                ) {
                    colorSet = true;
                    dy = -dy;
                    //벽돌에 맞으면 status를 0으로 바꾼다.
                    b.status = 0;
                    score++;
                    if (score === blockRowCount * blockColumnCount) {
                        alert("성공!!!");
                        if(localStorage.getItem("score")) {
                            let userScore = localStorage.getItem("score")
                            const newScore = parseInt(userScore) + 1;
                            localStorage.setItem("score", newScore.toString());
                        } else {
                            localStorage.setItem("score", "1");
                        }
                        localStorage.setItem("score")
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


