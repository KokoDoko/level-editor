/// <reference path="menuitem.ts" />

class Menu extends DOMObject {
    
    private menuOptions: string[] = ["brick", "question", "cloud", "floor", "goomba", "pipe"];
    
    constructor(game: Game) {
        super(0,0, "menu");
                
        for(let i = 0; i < this.menuOptions.length; i++) {
            new MenuItem(i * 60 + 10 , 10, this.menuOptions[i]);    
        }
        
        new SnapButton(420,16);
    }

}