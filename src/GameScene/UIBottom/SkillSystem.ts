import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { TowerSystem } from "./TowerSystem";
import { BottomPanel } from "./BottomPanel";

export class SkillSystem extends Container {

    constructor() {
        super();

        this.init();
    }

    init() {
        const skillPan = new Sprite(Texture.from('ui_bar_buttom'));
        skillPan.y = 600;
    

        this.addChild(skillPan);
    }
}