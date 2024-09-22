import { Container, Graphics } from "pixi.js";
import { Tower } from "../../GameObject/Towers/Tower";
import { TowerFactory } from "../../TowerFactory/TowerFactory";
import { TowerType } from "../../GameObject/Towers/TowerType";
import { EventHandle } from "../../GameBuild/EventHandle";
import { TowerController } from "../../Controller/TowerController";

export class BottomPanel extends Container {
    private skillSystem;
    private towerSystem;
    private posTower!: { x: number; y: number };


    constructor() {
        super();
        this.towerSystem = new Container();
        this.skillSystem = new Container();
        this.init();
        this.SkillSystem();
        this.TowerSystem();
        this.listenToEvents();
    }
    init() {
        const w = 800;
        const h = 168;
        this.width = w;
        this.height = h;
    }

    SkillSystem() {
        const skillPan = new Graphics();

        skillPan.rect(0, 600, 800, 168);
        skillPan.fill(0x0000ff);

        this.skillSystem.addChild(skillPan);

        this.addChild(this.skillSystem);
    }

    TowerSystem() {
        this.towerSystem.visible = false;

        const towerPan = new Graphics();
        towerPan.rect(0, 600, 800, 168);
        towerPan.fill('#EDE8DC');

        const closeTowerPan = new Graphics();
        closeTowerPan.rect(770, 600, 30, 30);
        closeTowerPan.fill('#D91656');

        closeTowerPan.interactive = true;
        closeTowerPan.eventMode = 'static';
        closeTowerPan.on('pointerdown', () => this.HideShow());

        this.towerSystem.addChild(towerPan);
        this.towerSystem.addChild(closeTowerPan);

        const towers: Tower[] = [
            TowerFactory.createTower(TowerType.Archer),
            TowerFactory.createTower(TowerType.Mage),
            TowerFactory.createTower(TowerType.Tech),
            TowerFactory.createTower(TowerType.Cannon)
        ];

        for (let i = 0; i < towers.length; i++) {

            const towerSprite = towers[i].sprite;
            towerSprite.x = 100 * i + 50;
            towerSprite.y = 610;
            towerSprite.width = 80;
            towerSprite.height = 100;
            towerSprite.interactive = true;

            towerSprite.on('pointerdown', () => {
                const selectedTowerType = towers[i].type;
                TowerController.instance.createTower(selectedTowerType, this.posTower.x, this.posTower.y);
                this.HideShow();
            });


            this.towerSystem.addChild(towerSprite);
        }
        this.addChild(this.towerSystem);
    }

    TowerInfor() {

    }


    HideShow() {
        this.skillSystem.visible = true;
        this.towerSystem.visible = false;
    }

    listenToEvents() {
        EventHandle.on('tower_slot_clicked', (data: { x: number; y: number }) => {
            this.skillSystem.visible = false;
            this.towerSystem.visible = true;

            this.posTower = { x: data.x, y: data.y };
        });
    }
}
