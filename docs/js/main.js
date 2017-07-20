"use strict";
class DOMObject {
    constructor(x, y, tag) {
        this.x = x;
        this.y = y;
        this.scale = 1;
        this.tag = tag;
        this.div = document.createElement(tag);
        document.body.appendChild(this.div);
        this.width = this.div.offsetWidth;
        this.height = this.div.offsetHeight;
        this.draw();
    }
    update() {
    }
    draw() {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
    }
}
class DraggableDomObject extends DOMObject {
    constructor(x, y, tag, offx, offy) {
        super(x, y, tag);
        this.offSetX = 0;
        this.offSetY = 0;
        this.offSetX = offx;
        this.offSetY = offy;
        this.moveCallback = (e) => this.updatePosition(e);
        this.div.addEventListener(Settings.down, (e) => this.initDrag(e));
        this.div.addEventListener(Settings.up, (e) => this.stopDrag(e));
        this.draw();
        window.addEventListener(Settings.move, this.moveCallback);
    }
    initDrag(e) {
        e.preventDefault();
        let event = new GameEvent(e);
        if (this.div.parentElement) {
            this.div.parentElement.appendChild(this.div);
        }
        this.offSetX = event.clientX - this.x;
        this.offSetY = event.clientY - this.y;
        if (event.altKey) {
            let go = new DraggableDomObject(this.x, this.y, this.div.tagName, this.offSetX, this.offSetY);
        }
        else {
            window.addEventListener(Settings.move, this.moveCallback);
        }
    }
    updatePosition(e) {
        e.preventDefault();
        let event = new GameEvent(e);
        this.x = event.clientX - this.offSetX;
        this.y = event.clientY - this.offSetY;
        this.draw();
    }
    stopDrag(e) {
        window.removeEventListener(Settings.move, this.moveCallback);
        e.preventDefault();
        let s = Settings.gridSize;
        if (Settings.snapping) {
            this.x = Math.round(this.x / s) * s;
            this.y = Math.round(this.y / s) * s;
            this.draw();
        }
    }
}
class Game {
    constructor() {
        if ('ontouchstart' in window) {
            Settings.enableTouch();
        }
        new Menu(this);
    }
}
window.addEventListener("load", function () {
    new Game();
});
class GameEvent {
    constructor(e) {
        this.clientX = 0;
        this.clientY = 0;
        this.altKey = false;
        switch (e.type) {
            case "mousedown":
            case "mouseup":
            case "mousemove":
                let m = e;
                this.clientX = m.clientX;
                this.clientY = m.clientY;
                this.altKey = m.altKey;
                break;
            case "touchcancel":
            case "touchstart":
            case "touchmove":
                let allTouches = e;
                let t = allTouches.targetTouches[0];
                this.clientX = t.clientX;
                this.clientY = t.clientY;
                break;
            case "touchend":
                let all = e;
                break;
            default:
                console.log("Unknown: " + e.type);
        }
    }
}
class MenuItem extends DOMObject {
    constructor(x, y, tag) {
        super(x, y, tag);
        this.scale = Math.min(1, 54 / this.height, 54 / this.width);
        this.draw();
        this.div.addEventListener(Settings.down, (e) => this.createElement(e));
    }
    createElement(e) {
        e.preventDefault();
        let event = new GameEvent(e);
        let offx = event.clientX - this.x;
        let offy = event.clientY - this.y;
        let x = event.clientX - offx;
        let y = event.clientY - offy;
        new DraggableDomObject(x, y, this.tag, offx, offy);
    }
}
class Menu extends DOMObject {
    constructor(game) {
        super(0, 0, "menu");
        this.menuOptions = ["brick", "question", "cloud", "floor", "goomba", "pipe"];
        for (let i = 0; i < this.menuOptions.length; i++) {
            new MenuItem(i * 60 + 10, 10, this.menuOptions[i]);
        }
        new SnapButton(420, 16);
    }
}
class Settings {
    static enableTouch() {
        Settings.down = "touchstart";
        Settings.up = "touchend";
        Settings.move = "touchmove";
        Settings.eventType = "touchEvent";
    }
}
Settings.gridSize = 54;
Settings.snapping = true;
Settings.down = "mousedown";
Settings.up = "mouseup";
Settings.move = "mousemove";
Settings.eventType = "mouseEvent";
class SnapButton extends DOMObject {
    constructor(x, y) {
        super(x, y, "snapbutton");
        this.div.addEventListener("click", (e) => this.toggleSnap(e));
    }
    toggleSnap(event) {
        Settings.snapping = !Settings.snapping;
        this.div.style.backgroundImage = (Settings.snapping) ? "url(images/snapbutton_on.png)" : "url(images/snapbutton_off.png)";
    }
}
//# sourceMappingURL=main.js.map