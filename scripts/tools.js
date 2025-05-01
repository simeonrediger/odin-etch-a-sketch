let primaryTool = 'draw';
let color = 'red';
let isColorRandom = false;
const burnToggleButton = document.querySelector('#burn-toggle');
const colorPickerButton = document.querySelector('#color-picker');
const colorMenu = document.querySelector('#color-menu');
const randomColorButton = document.querySelector('#randomize-color');

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

    if (isColorRandom) {
        const randomColorDecimalValue = Math.floor(Math.random() * 0xffffff);
        const randomColorHexValue = randomColorDecimalValue.toString(16);
        const randomColorString = `#${randomColorHexValue}`.padStart(7, '0');
        setColor(pixel, randomColorString);

    } else {
        setColor(pixel, color);
    }

    resetBurn(pixel);
}

function erase(pixel) {
    delete pixel.dataset.color;
    pixel.style.backgroundColor = '';
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

function selectColor(event) {
    const selectedColorButton = event.target;
    const colorValue = selectedColorButton.dataset.color;

    if (colorValue) {
        setColor(colorPickerButton, colorValue);
    }
}

function setColor(element, colorValue) {
    color = colorValue;

    if (colorValue.startsWith('#')) {
        element.style.backgroundColor = colorValue;
        delete element.dataset.color;
        colorPickerButton.style.backgroundColor = colorValue;

    } else {
        element.dataset.color = colorValue;
        element.style.backgroundColor = '';
        colorPickerButton.style.backgroundColor = '';
    }
}

function toggleBurnMode() {
    setPrimaryTool(primaryTool === 'burn' ? 'draw' : 'burn');
    burnToggleButton.classList.toggle('active');
}

function toggleRandomColorMode() {
    isColorRandom = !isColorRandom;
    randomColorButton.classList.toggle('active');
}

export const tools = {
    colorPickerButton,
    colorMenu,
    burnToggleButton,
    randomColorButton,
    erase,
    selectColor,
    setColor,
    toggleBurnMode,
    toggleRandomColorMode,
    useTool,
};
