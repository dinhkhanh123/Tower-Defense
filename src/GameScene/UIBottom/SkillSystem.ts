import { Container, Graphics } from "pixi.js";
import { TowerSystem } from "./TowerSystem";
import { BottomPanel } from "./BottomPanel";

export class SkillSystem extends Container {

    constructor() {
        super();

        this.init();
    }

    init() {
        const skillPan = new Graphics();

        skillPan.rect(0, 600, 800, 168);
        skillPan.fill(0xB17457);

        this.addChild(skillPan);
    }
}