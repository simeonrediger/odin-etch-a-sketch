function draw(pixel) {
    pixel.classList.add('filled');
}

function erase(pixel) {
    pixel.classList.remove('filled');
}

export const art = {
    draw,
    erase,
};
