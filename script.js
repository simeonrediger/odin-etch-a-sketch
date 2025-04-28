const grid = document.querySelector('#grid');
const gridSize = 16;
populateGrid();

function populateGrid() {
    for (let i = 0; i < gridSize ** 2; i++) {
        const pixel = document.createElement('div');
        grid.append(pixel);
    }
}
