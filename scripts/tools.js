let primaryTool = 'draw';
let color = 'red';
let isColorMenuOpen = false;
const burnToggleButton = document.querySelector('#burn-toggle');
const colorPickerButton = document.querySelector('#color-picker');
const colorMenu = document.querySelector('#color-menu');

function setPrimaryTool(toolName) {
    primaryTool = toolName;
}

function useTool(pixel) {

    switch(primaryTool) {

        case 'draw':
            draw(pixel);
            break;
        case 'burn':
            burn(pixel);
    }
}

function draw(pixel) {
    setColor(pixel, color);
    resetBurn(pixel);
}

function erase(pixel) {
    delete pixel.dataset.color;
}

function burn(pixel) {
    const filter = window.getComputedStyle(pixel).filter;

    if (filter.includes('brightness')) {
        const brightness = +filter.slice(11, -1);

        if (brightness === 0) {
            return;
        }

        const newBrightness = (10 * brightness - 1) / 10;
        pixel.style.filter = `brightness(${newBrightness})`;

    } else {
        pixel.style.filter = 'brightness(0.9)';
    }
}

function resetBurn(pixel) {
    pixel.style.filter = 'none';
}

function openColorMenu() {
    colorMenu.classList.remove('hidden');
    isColorMenuOpen = true;
}

function closeColorMenu() {
    colorMenu.classList.add('hidden');
    isColorMenuOpen = false;
}

function selectColor(selectedColorButton) {
    const colorValue = selectedColorButton.dataset.color;

    if (colorValue) {
        setColor(colorPickerButton, colorValue);
    }

    closeColorMenu();
}

function setColor(element, colorValue) {
    color = colorValue;
    element.dataset.color = colorValue;
}

function toggleBurnMode() {
    setPrimaryTool(primaryTool === 'burn' ? 'draw' : 'burn');
    burnToggleButton.classList.toggle('active');
}

export const tools = {
    colorPickerButton,
    colorMenu,
    get isColorMenuOpen() { return isColorMenuOpen; },
    burnToggleButton,
    draw,
    erase,
    openColorMenu,
    closeColorMenu,
    selectColor,
    setPrimaryTool,
    setColor,
    toggleBurnMode,
    useTool,
};
