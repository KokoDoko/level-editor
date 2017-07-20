class Settings {
   
    public static gridSize:number = 54;
    public static snapping:boolean = true;

    // todo use enum
    public static down:string = "mousedown";
    public static up:string = "mouseup";
    public static move:string = "mousemove";
    public static eventType:string = "mouseEvent";

    public static enableTouch(){
        Settings.down = "touchstart";
        Settings.up = "touchend";
        Settings.move = "touchmove";
        Settings.eventType = "touchEvent";
    }
   
}