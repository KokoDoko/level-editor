class MenuItem extends DOMObject {
    
    constructor(x: number, y: number, tag: string) {
        super(x, y, tag);
        
        // while in the menu the items are displayed smaller
        this.scale = Math.min(1, 54/this.height, 54/this.width);
        
        this.draw();
        
        this.div.addEventListener(Settings.down, (e: Event) => this.createElement(e));
    }
    
    private createElement(e: Event): void {
        e.preventDefault();
        
        let event:GameEvent = new GameEvent(e);

        let offx: number = event.clientX - this.x;
        let offy: number = event.clientY - this.y;

        let x: number = event.clientX - offx;
        let y: number = event.clientY - offy;
        
        new DraggableDomObject(x, y, this.tag, offx, offy);        
    }
}