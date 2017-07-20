/**
 * this class receives a mouseEvent or a touchEvent with multiple touches, and converts it into a normalized event
 */
class GameEvent {

    public clientX:number = 0;
    public clientY:number = 0;
    public altKey:boolean = false;

    constructor(e:Event) {
        
        switch(e.type){
        case "mousedown":
        case "mouseup":
        case "mousemove":
            let m:MouseEvent = <MouseEvent>e;
            this.clientX = m.clientX;
            this.clientY = m.clientY;
            this.altKey = m.altKey;
            break;
        case "touchcancel":
        case "touchstart":
        case "touchmove":
            let allTouches:TouchEvent = <TouchEvent>e;
            let t:Touch = allTouches.targetTouches[0];
            this.clientX = t.clientX;
            this.clientY = t.clientY;
            break; 
        case "touchend":
            let all:TouchEvent = <TouchEvent>e;
            break;
        default :
            console.log("Unknown: " + e.type);
        }
    }
}