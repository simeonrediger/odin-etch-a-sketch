let color;
let isColorMenuOpen = false;
const colorPickerButton = document.querySelector('#color-picker');
const colorMenu = document.querySelector('#color-menu');

function draw(pixel) {
    setColor(pixel, color);
}

function erase(pixel) {
    delete pixel.dataset.color;
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
    setColor(colorPickerButton, colorValue);
    closeColorMenu();
}

function setColor(element, colorValue) {
    color = colorValue;
    element.dataset.color = colorValue;
}

export const tools = {
    colorPickerButton,
    colorMenu,
    get isColorMenuOpen() { return isColorMenuOpen; },
    draw,
    erase,
    openColorMenu,
    closeColorMenu,
    selectColor,
    setColor,
};
