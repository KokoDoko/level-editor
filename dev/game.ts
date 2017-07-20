class Game {
    constructor() {
        if ('ontouchstart' in window) {
            Settings.enableTouch();
        }

        new Menu(this);
    }
}

window.addEventListener("load", function() {
    new Game();
});