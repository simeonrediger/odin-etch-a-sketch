import { settings } from './settings.js';
import { mouse } from './mouse.js';
import { grid } from './grid.js';
import { tools } from './tools.js';

settings.prepareModal();
mouse.trackButtonStates();

// Replaces right click behavior with erase tool
document.addEventListener('contextmenu', event => event.preventDefault());

tools.setColor(tools.colorPickerButton, 'red');
tools.colorPickerButton.addEventListener('click', tools.toggleColorMenu);
tools.colorPickerAndMenu.addEventListener('focusout', tools.toggleColorMenu);
tools.colorMenu.addEventListener('click', event => {
    tools.selectColor(event.target);
});

tools.burnToggleButton.addEventListener('click', tools.toggleBurnMode);

grid.create(grid.size);
