import { settings } from './settings.js';
import { mouse } from './mouse.js';
import { grid } from './grid.js';
import { tools } from './tools.js';

settings.prepareModal();
mouse.trackButtonStates();

// Replaces right click behavior with erase tool
document.addEventListener('contextmenu', event => event.preventDefault());

tools.setColor(tools.colorPickerButton, 'red');
tools.colorMenu.addEventListener('click', tools.selectColor);
tools.burnToggleButton.addEventListener('click', tools.toggleBurnMode);

grid.create(grid.size);
