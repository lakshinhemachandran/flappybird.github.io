const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
const birdImg = new Image();
const bgImg = new Image();
const fgImg = new Image();
const pipeNorthImg = new Image();
const pipeSouthImg = new Image();

birdImg.src = 'https://example.com/bird.png'; // Replace with your bird image URL
bgImg.src = 'https://example.com/bg.png'; // Replace with your background image URL
fgImg.src = 'https://example.com/fg.png'; // Replace with your foreground image URL
pipeNorthImg.src = 'https://example.com/pipeNorth.png'; // Replace with your pipe north image URL
pipeSouthImg.src = 'https://example.com/pipeSouth.png'; // Replace with your pipe south image URL

// Game variables
let gap = 85;
let constant = pipeNorthImg.height + gap;

let birdX = 10;
let birdY = 150;
let gravity = 1.5;
let score = 0;

// Pipe coordinates
let pipes = [];
pipes[0] = {
    x: canvas.width,
    y: 0
};

// Control the bird
document.addEventListener('keydown', moveUp);

function moveUp() {
    birdY -= 25;
}

// Draw function
function draw() {
    ctx.drawImage(bgImg, 0, 0);

    for (let i = 0; i < pipes.length; i++) {
        ctx.drawImage(pipeNorthImg, pipes[i].x, pipes[i].y);
        ctx.drawImage(pipeSouthImg, pipes[i].x, pipes[i].y + constant);

        pipes[i].x--;

        if (pipes[i].x == 125) {
            pipes.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorthImg.height) - pipeNorthImg.height
            });
        }

        // Detect collision
        if (
            birdX + birdImg.width >= pipes[i].x &&
            birdX <= pipes[i].x + pipeNorthImg.width &&
            (birdY <= pipes[i].y + pipeNorthImg.height || birdY + birdImg.height >= pipes[i].y + constant) ||
            birdY + birdImg.height >= canvas.height - fgImg.height
        ) {
            location.reload(); // Reload the page
        }

        if (pipes[i].x == 5) {
            score++;
        }
    }

    ctx.drawImage(fgImg, 0, canvas.height - fgImg.height);
    ctx.drawImage(birdImg, birdX, birdY);

    birdY += gravity;

    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);
}

function startGame() {
    document.getElementById('introScreen').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'flex';
    draw();
}
