import { Container, Graphics } from "pixi.js";
import { Tower } from "../../GameObject/Towers/Tower";
import { TowerFactory } from "../../TowerFactory/TowerFactory";
import { TowerType } from "../../GameObject/Towers/TowerType";
import { TowerController } from "../../Controller/TowerController";
import { EventHandle } from "../../GameBuild/EventHandle";
import { BottomPanel } from "./BottomPanel";

export class TowerSystem extends Container {

    private posTower!: { x: number; y: number };
    constructor() {
        super();

        this.init();
        this.listenToEvents();
    }

    init() {
        const towerPan = new Graphics();
        towerPan.rect(0, 600, 800, 168);
        towerPan.fill('#EDE8DC');

        const closeTowerPan = new Graphics();
        closeTowerPan.rect(770, 600, 30, 30);
        closeTowerPan.fill('#D91656');

        closeTowerPan.interactive = true;
        closeTowerPan.eventMode = 'static';
        closeTowerPan.on('pointerdown', () => BottomPanel.instance.setVisibleSystem('skill'));

        this.addChild(towerPan);
        this.addChild(closeTowerPan);

        const towers: Tower[] = [
            TowerFactory.createTower(TowerType.Archer),
            TowerFactory.createTower(TowerType.Mage),
            TowerFactory.createTower(TowerType.Tech),
            TowerFactory.createTower(TowerType.Cannon)
        ];

        for (let i = 0; i < towers.length; i++) {

            const towerSprite = towers[i].imageTower;
            towerSprite.x = 100 * i + 50;
            towerSprite.y = 610;
            towerSprite.width = 80;
            towerSprite.height = 100;
            towerSprite.interactive = true;

            towerSprite.on('pointerdown', () => {
                const selectedTowerType = towers[i].type;
                TowerController.instance.createTower(selectedTowerType, this.posTower.x, this.posTower.y);
                BottomPanel.instance.setVisibleSystem('skill');
            });


            this.addChild(towerSprite);
        }
    }


    listenToEvents() {
        EventHandle.on('tower_slot_clicked', (data: { x: number; y: number }) => {
            this.visible = true;
            BottomPanel.instance.setVisibleSystem('tower');
            this.posTower = { x: data.x, y: data.y };
        });
    }
}