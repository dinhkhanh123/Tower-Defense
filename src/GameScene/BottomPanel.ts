import { Container, Graphics } from "pixi.js";

export class BottomPanel extends Container{

    constructor(){
        super();
        this.init();
    }
    init() {
        this.width = 800;
        this.height = 168;

        const bottomPanGrap = new Graphics();
        bottomPanGrap.rect(0,600,800,168);
        bottomPanGrap.fill(0x0000ff);

        this.addChild(bottomPanGrap);
    }
}