import { settings } from './settings.js';
import { mouse } from './mouse.js';
import { grid } from './grid.js';
import { tools } from './tools.js';

settings.prepareModal();
mouse.trackButtonStates();

// Replaces right click behavior with erase tool
document.addEventListener('contextmenu', event => event.preventDefault());

tools.fillToggleButton.addEventListener('click', tools.toggleFillMode);
tools.burnToggleButton.addEventListener('click', tools.toggleBurnMode);
tools.colorMenu.addEventListener('click', tools.selectColor);
tools.randomColorButton.addEventListener('click', tools.toggleRandomColorMode);
tools.setColor(tools.colorPickerButton, 'red');

grid.create(grid.size);
