const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
const birdImg = new Image();
const bgImg = new Image();
const fgImg = new Image();
const pipeNorthImg = new Image();
const pipeSouthImg = new Image();

birdImg.src = 'https://banner2.cleanpng.com/20190313/lbw/kisspng-314xelampaposs-profile-1713901635122.webp'; // Replace with your bird image URL
bgImg.src = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/089918d8-99ff-45de-a084-3fe85d0e3fcc/dg34rsu-29a3d144-dc3f-473e-a949-f73a4ba1ef7c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA4OTkxOGQ4LTk5ZmYtNDVkZS1hMDg0LTNmZTg1ZDBlM2ZjY1wvZGczNHJzdS0yOWEzZDE0NC1kYzNmLTQ3M2UtYTk0OS1mNzNhNGJhMWVmN2MucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.zvNGmLdKoPJQgA8oJpbKhBRg-eCdzTc1j_Nceg1adY4'; // Replace with your background image URL
pipeNorthImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAtFBMVEX///98s0Ky/1lonzi1/1p5rkHM/5AsLCyY206n8FRSiS46M0G14INYeD8/O0HH/4WJxUdelDNpojd7e3tCQkKysrJzc3M3Mzpje0pvbHJCPUZ6pk0zMzNyoEPg4OBhjzs2LD/U/5W//3ZsZXFre1kbGxul5V46Ojrp6emhxnew4Hp8r0eKwkyW01FQfDRZhjhUbkEQEBBqamrB7o6w5XVtmUhjh0ZJfSqT1ktne1JZbUdNXEOgpqyWAAAB3klEQVR4nO3YXU/TcBTAYba2W9nmFJzoXhiKsk0FfAeU7/+9/LNg4oWDjmTZKT5P0nN9fjc9aXd2Nqbd7bVarafNZjN/VpT5btH4t6yzl0aW7T/pP9/cNpugUGF8ChXGp1BhfAoVxqdQYXwKFcanUGF8ChXGp1BhfAoVxqdQYXwKFcanUGF8ChXGp1BhfAoVxqdQYXwKFcanUGF8ChXGp1BhfAoVxqdQYXwKFcanUGF8ChXGp1BhfAoVxqdQYXwKFcanUGF8ChXGp1BhfAoVxqdQYXwKFcanUGF8ChXGp1BhfAoVxqdQYXwKFcanUGF8/09hnj/OwuliMnrf6/U+lGU5+3h4Ojs7XOHo/FMayef+wWK67b0rm55MBoNR99ZotBz3GAwGky/bXryyaQp8iPa2F68sFR6s72u9Codvbw2Hy1FFrQq739J75vssGY/PZqfju5xfjMc/kot+nQpfv0m34vjmGhbFbl6uOBVLRafTaOyne3E0qnHhqmv4d2GmMBKFCuNTqDA+hQrjU/i4CrNUeFXcIbu8TGOvtoXNPL957ndVu8LkuErZH2XNvg/775Kfr9bw6/q6Tn8x2vOXa5vP5yfbXryyxYsH2vbiAAAAAAAAAAAAAAAAAAAQwG9kZMxGMBLZywAAAABJRU5ErkJggg=='; // Replace with your pipe north image URL
pipeSouthImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUoAAACZCAMAAAB+KoMCAAAAvVBMVEX29vYApgAAAAB+zxAAowD8/PyRkZGysrIAogB90xQXqQZKvxSA0g9aWlprnCw5txJUxBbr/+twpC0JOAkNgA30/+J41RcvsQ58wiBFvBOGxjB+ui8xSBRmzxgkqwsVjxZqpB/IyMgVmRVdxRLR0dHk5ORn0BiHyTJumTWAtTkmmBhtzBN0vi9cyxgSlBUlrwsrOhkjQhIxRBxKSkpaey0yjBdElRw8nSBgripQpyZvlzxCqiBYtSkkhyX3/+vLflheAAADkklEQVR4nO3cDVfSUACH8YyRY1tBL2KYkuYLZppZaS9a3/9jBbt3xL1Iju2/0RnPr1OdAeMcnrPVvZe5R48AAAAAAAAA/P/aK7fqAirtoycrdtSUlu3Nxyu2SUpSekgpQ0oZUsqQUoaUMtOUp6/r9b65KV8krYlk/GvyR/Z3a277nhf988n73yHZaXzKupCSlIuRUoaUMqSUmUvZ8fiFE/8FeWVvYDebn7KzHTk2em7LJA6iQoa25Ulots/WIGWwMSuMvZQD9/ncon6W0mx/XIOUboFAlXJISlLmRUoZUsqQUqZ4yjAMg2D8O2fKqG/GkydhMN4vCEiZpQy6H4w4d0s7vtwz+52TcprSLjz2ljzhA3Oir8HEMX/Kjk0ZktIonHKQkNJVPiUnuMVRKcNRKVPfURmkwrCfrM16ZUVHZWTHkxfD1OU6rFdWlJKJo+wEJ6XuBCclR2Ve/FspwwkuU+MJno4nk5PQDDBJWXy2c2lss15ZOmX2hkwcy57gpOSozI2jUoaUMg+m9K9k4wRfZCZl6p6Urnia0lg2ZdQ3+zU45add46Xnatd15T1+5e/wELvf5+amXBlSktJHShlSypBShpQypNQ5PkgdfbGf7Ou+cf3KdbPvurGPX3vbC9nXnWYJD6zjVRfQsfegemo/4TM76+l6s5TYnfR0Yvt4t2NnPTlnOW+ylE27+dXUTEozF++6E8K5ZY1sAmmvs2w9tKxhv9uZSbnqj1yV+ZRuicUpE1K6Kj8qh6TkBF8WR6VMdSnN196B+R+clCVSRheHqd52qvuNlEVT/v2RerP9lpSFU9prhfZIScplkVKGlDKklKkwpVkRstdVkrLEuLJr9cz48jspS04cA+bgqpTMwUm5PFLKkFKGlDI1rVcmpCwxruwd9sYOYzu8ZL2yxHplkkzuh87EsXxK5uCkLIqUMqSUIaUM65UyNaxXGqxXsl6ZG3NwGVLKkFKG6ytlOCplWK+UqW5cGVsD4wcpub4yL+bgMqSUIaUMKWVIKVP1emWL9crSKSM7nhzY4SXjyjKznQ0z25nsxcSROfgSSClDShlSypBSpo71yhY/D14qZZQtVNrRJeNKZju5MQeXIaUMKWVIKUNKmeL3ZOukTyy8P/pl3+y4ht84/hztTIxu37nuzOOZ0Z19/HbkbvvO7H7ndvtX41Nmt7Fs/94ynnu2fP4T/g6Lnm/sfSsBAAAAAACARvsDCwocuFTzJMcAAAAASUVORK5CYII='; // Replace with your pipe south image URL

// Game variables
let gap = 85;
let constant;

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
document.addEventListener('click', moveUp);

function moveUp() {
    birdY -= 25;
}

// Draw function
function draw() {
    ctx.drawImage(bgImg, 0, 0);

    for (let i = 0; i < pipes.length; i++) {
        constant = pipeNorthImg.height + gap;
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
