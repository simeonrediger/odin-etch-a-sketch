const grid = document.querySelector('#grid');
const gridSize = 16;
populateGrid();

let leftMouseIsDown;
trackLeftMouseClicks();


function populateGrid() {
    for (let i = 0; i < gridSize ** 2; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');

        pixel.addEventListener('mousedown', draw);
        pixel.addEventListener('mouseenter', event => {
            if (leftMouseIsDown) {
                draw(event);
            }
        });

        grid.append(pixel);
    }
}

function trackLeftMouseClicks() {
    document.body.addEventListener('mousedown', () => leftMouseIsDown = true);
    document.body.addEventListener('mouseup', () => leftMouseIsDown = false);
}

function draw(event) {
    const pixel = event.target;
    pixel.classList.add('filled');
}
