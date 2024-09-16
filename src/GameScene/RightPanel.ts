import { Container, Graphics } from "pixi.js";
import { GameConst } from "../GameConst";

export class RightPanel extends Container{

    constructor(){
        super();
        this.init();
    }

    init(){
        this.width = 224;
        this.height = 768;

        const rightPanGrap = new Graphics();
        rightPanGrap.rect(800, 0, 224, 768); 
        rightPanGrap.fill(0x00ff00);

        this.addChild(rightPanGrap);
    }
}