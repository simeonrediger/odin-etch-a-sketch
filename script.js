const gridSizeInput = document.querySelector('#settings input')
prepareSettingsModal();

let leftMouseIsDown;
let rightMouseIsDown;
trackMouseButtonStates();
document.addEventListener('contextmenu', event => event.preventDefault());

const grid = document.querySelector('#grid');
const computedGridSize = 48 * 16; // 48rem * 16px/rem
let gridSize = 16;
prepareGrid(gridSize);

function prepareSettingsModal() {
    const settingsModal = document.querySelector('#settings');
    const openSettingsButton = document.querySelector('button.settings');
    const closeSettingsButton = document.querySelector('#settings .close');

    openSettingsButton.addEventListener('click', () => {
        settingsModal.showModal();
        settingsModal.focus();
    });

    closeSettingsButton.addEventListener('click', () => {
        let customGridSize = parseInt(gridSizeInput.value);
        customGridSize = Math.max(1, customGridSize);
        customGridSize = Math.min(customGridSize, 100);

        if (customGridSize != gridSizeInput.value) {
            gridSizeInput.value = customGridSize;
        }

        if (isNaN(customGridSize)) {
            gridSizeInput.classList.add('error');
            return;
        }

        if (customGridSize !== gridSize) {
            gridSize = customGridSize;
            prepareGrid(gridSize);
        }

        settingsModal.close();
    });

    settingsModal.addEventListener('click', event => {
        if (event.target === settingsModal) {
            settingsModal.close();
        }
    });
}

function prepareGrid(gridSize) {
    clearGrid();

    const pixelRowTemplate = document.createElement('div');
    pixelRowTemplate.classList.add('pixel-row');
    const pixelTemplate = document.createElement('div');
    pixelTemplate.classList.add('pixel');

    for (let column = 0; column < gridSize; column++) {
        const pixel = pixelTemplate.cloneNode();
        pixelRowTemplate.append(pixel);
    }

    for (let row = 0; row < gridSize; row++) {
        const pixelRow = pixelRowTemplate.cloneNode(true);
        grid.append(pixelRow);
    }

    for (const pixel of grid.querySelectorAll('.pixel')) {
        pixel.addEventListener('mousedown', updatePixel);
        pixel.addEventListener('mouseenter', updatePixel);
    }
}

function clearGrid() {
    grid.innerHTML = '';
}

function trackMouseButtonStates() {

    for (const eventType of ['mousedown', 'mouseup']) {

        document.body.addEventListener(
            eventType,
            updateMouseButtonState,
            true, // update states before pixel
        );
    }
}

function updateMouseButtonState(event) {
    const buttonIsDown = event.type === 'mousedown';

    switch (event.button) {
        case 0: // left mouse button
            leftMouseIsDown = buttonIsDown;
            break;
        case 2: // right mouse button
            rightMouseIsDown = buttonIsDown;
    }
}

function updatePixel(event) {
    const pixel = event.target;

    if (leftMouseIsDown && !rightMouseIsDown) {
        draw(pixel);
    } else if (rightMouseIsDown && !leftMouseIsDown) {
        erase(pixel);
    }
}

function draw(pixel) {
    pixel.classList.add('filled');
}

function erase(pixel) {
    pixel.classList.remove('filled');
}
