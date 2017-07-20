class DOMObject {

    public x      : number;
    public y      : number;
    public width  : number;
    public height : number;
    public scale  : number;
    public tag : string;

    protected div: HTMLElement;

    constructor(x: number, y: number, tag: string) {
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

    public update() : void {
        
    }

    public draw(): void {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
    }
}