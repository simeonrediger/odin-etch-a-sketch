import { settings } from './settings.js';
import { mouse } from './mouse.js';
import { grid } from './grid.js';

settings.prepareModal();

mouse.trackButtonStates();
document.addEventListener('contextmenu', event => event.preventDefault());

grid.create(grid.size);
