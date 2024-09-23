import { Container, Graphics, Sprite, Text } from "pixi.js";
import { BottomPanel } from "./BottomPanel";
import { EventHandle } from "../../GameBuild/EventHandle";
import { Tower } from "../../GameObject/Towers/Tower";

export class TowerInfor extends Container {
    private towerSprite!: Sprite;
    private towerDetailText!: Text;
    constructor() {
        super();
        this.init();
        this.listenToEvents();
    }

    init() {
        const towerInfor = new Graphics();

        towerInfor.rect(0, 600, 800, 168);
        towerInfor.fill(0xD2E0FB);

        const closeTowerPan = new Graphics();
        closeTowerPan.rect(770, 600, 30, 30);
        closeTowerPan.fill('#D91656');

        closeTowerPan.interactive = true;
        closeTowerPan.eventMode = 'static';
        closeTowerPan.on('pointerdown', () => BottomPanel.instance.setVisibleSystem('skill'));


        this.towerSprite = new Sprite();
        this.towerSprite.position.set(100, 610); // Set the position once
        this.towerSprite.width = 80;
        this.towerSprite.height = 100;

        this.towerDetailText = new Text({
            text: this.towerDetailText,
        });
        this.towerDetailText.position.set(200, 610);

        this.addChild(towerInfor);
        this.addChild(closeTowerPan);
        this.addChild(this.towerSprite); 
        this.addChild(this.towerDetailText); 
    }

    listenToEvents() {
        EventHandle.on('tower_clicked', (tower: Tower) => {
            this.getTowerInfo(tower);
        });
    }

    getTowerInfo(tower: Tower) {
        this.towerSprite.texture = tower.imageTower.texture;
        this.towerSprite.width = 80;
        this.towerSprite.height = 100;

        this.towerDetailText.text = tower.towerDetail;

    }
}