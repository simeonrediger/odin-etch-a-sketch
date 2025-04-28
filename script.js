prepareSettingsModal();

let leftMouseIsDown;
let rightMouseIsDown;
trackMouseButtonStates();
document.addEventListener('contextmenu', event => event.preventDefault());

const grid = document.querySelector('#grid');
let gridSize = 16;
prepareGrid(gridSize);

function prepareSettingsModal() {
    const settingsModal = document.querySelector('#settings');
    const openSettingsButton = document.querySelector('button.settings');
    const closeSettingsButton = document.querySelector('#settings .close');

    openSettingsButton.addEventListener(
        'click', () => settingsModal.showModal()
    );

    closeSettingsButton.addEventListener(
        'click', () => settingsModal.close()
    );
}

function prepareGrid(gridSize) {

    for (let i = 0; i < gridSize ** 2; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.addEventListener('mousedown', updatePixel);
        pixel.addEventListener('mouseenter', updatePixel);
        grid.append(pixel);
    }
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
