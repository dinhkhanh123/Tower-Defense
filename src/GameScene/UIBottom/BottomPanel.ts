import { Container } from "pixi.js";
import { SkillSystem } from "./SkillSystem";
import { TowerSystem } from "./TowerSystem";
import { TowerInfor } from "./TowerInfor";
import { Tower } from "../../GameObject/Towers/Tower";

export class BottomPanel extends Container {
    public static instance: BottomPanel

    private skillSystem;
    private towerSystem;
    private towerInfor;

    constructor() {
        super();
        BottomPanel.instance = this;
        this.towerSystem = new TowerSystem();
        this.skillSystem = new SkillSystem();
        this.towerInfor = new TowerInfor();

        this.init();

    }
    init() {
        const w = 800;
        const h = 168;
        this.width = w;
        this.height = h;
        this.addChild(this.skillSystem);
        this.addChild(this.towerSystem);
        this.addChild(this.towerInfor);

        this.skillSystem.visible = true;
        this.towerSystem.visible = false;
        this.towerInfor.visible = false;
    }

    public setVisibleSystem(system: 'tower' | 'skill' | 'infor') {

        this.towerSystem.visible = false;
        this.skillSystem.visible = false;
        this.towerInfor.visible = false;

        if (system === 'tower') {
            this.towerSystem.visible = true;
        } else if (system === 'skill') {
            this.skillSystem.visible = true;
        } else if (system === 'infor') {
            this.towerInfor.visible = true;
        }
    }
}
