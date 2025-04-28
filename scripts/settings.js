import { grid } from './grid.js';

const gridSizeInput = document.querySelector('dialog.settings input');

function prepareModal() {
    const modal = document.querySelector('dialog.settings');
    const openButton = document.querySelector('.open.settings');
    const closeButton = document.querySelector('dialog.settings .close');

    openButton.addEventListener('click', () => {
        modal.showModal();
        modal.focus();
    });

    closeButton.addEventListener('click', () => {
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

        if (customGridSize !== grid.size) {
            grid.size = customGridSize;
            grid.create(grid.size);
        }

        modal.close();
    });

    modal.addEventListener('click', event => {
        if (event.target === modal) {
            modal.close();
        }
    });
}

export const settings = {
    prepareModal,
};
