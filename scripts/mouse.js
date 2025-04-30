let leftButtonDown;
let rightButtonDown;

function trackButtonStates() {

    for (const eventType of ['mousedown', 'mouseup']) {

        document.body.addEventListener(
            eventType,
            updateButtonState,
            true,  // update states before pixel
        );
    }
}

function updateButtonState(event) {
    const buttonDown = event.type === 'mousedown';

    switch (event.button) {
        case 0:  // left mouse button
            leftButtonDown = buttonDown;
            break;
        case 2:  // right mouse button
            rightButtonDown = buttonDown;
    }
}

export const mouse = {
    get leftButtonDown() { return leftButtonDown; },
    get rightButtonDown() { return rightButtonDown; },
    trackButtonStates,
};
