/**
 * SnapButton
 */
class SnapButton extends DOMObject {
        
    constructor(x:number, y:number) {
       super(x,y,"snapbutton");
       this.div.addEventListener("click", (e) => this.toggleSnap(e));
    }

    public toggleSnap(event: MouseEvent) : void { 
       Settings.snapping = !Settings.snapping;
       
       this.div.style.backgroundImage = (Settings.snapping) ? "url(images/snapbutton_on.png)": "url(images/snapbutton_off.png)";
    }
}