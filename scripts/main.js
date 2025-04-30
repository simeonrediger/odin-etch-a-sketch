import { settings } from './settings.js';
import { mouse } from './mouse.js';
import { grid } from './grid.js';
import { tools } from './tools.js';

settings.prepareModal();
mouse.trackButtonStates();

// Replaces right click behavior with erase tool
document.addEventListener('contextmenu', event => event.preventDefault());

tools.colorPickerButton.addEventListener('click', event => {
    if (tools.isColorMenuOpen) {
        tools.closeColorMenu();
    } else {
        tools.openColorMenu();
    }
});

tools.colorMenu.addEventListener('click', event => {
    tools.selectColor(event.target);
});

grid.create(grid.size);
