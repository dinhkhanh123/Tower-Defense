import { BitmapText, Container, Graphics, Sprite, Texture } from 'pixi.js';
import { Tower } from "../../GameObject/Towers/Tower";
import { TowerFactory } from "../../TowerFactory/TowerFactory";
import { TowerType } from "../../GameObject/Towers/TowerType";
import { TowerController } from "../../Controller/TowerController";
import { EventHandle } from "../../GameBuild/EventHandle";
import { BottomPanel } from "./BottomPanel";
import { PlayerController } from '../../Controller/PlayerController';

export class TowerSystem extends Container {
    //private posTower!: { x: number; y: number };
    private baseSprite!: Sprite;
    constructor() {
        super();

        this.init();
        this.listenToEvents();
    }

    init() {
        const towerPan = new Sprite(Texture.from('ui_bar_buttom_tower'));
        towerPan.y = 600;

        const closeTowerPan = new Sprite(Texture.from('btn_close'));
        closeTowerPan.x = 780;
        closeTowerPan.y = 620;
        closeTowerPan.width = 30;
        closeTowerPan.height = 30;
        closeTowerPan.anchor.set(0.5);

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
            towerSprite.image.x = 100 * i + 50;
            towerSprite.image.y = 610;
            towerSprite.image.width = 80;
            towerSprite.image.height = 100;
            towerSprite.image.interactive = true;
            towerSprite.image.eventMode = 'static';
            towerSprite.image.cursor = 'pointer';

            
                towerSprite.image.on('pointerdown', () => {
                    const selectedTowerType = towers[i].type;

                    if(towers[i].priceTower.price <= PlayerController.instance.cointPlayer){
                        EventHandle.emit('buy_tower', towers[i].id);
                        TowerController.instance.createTower(selectedTowerType, this.baseSprite);
                        BottomPanel.instance.setVisibleSystem('skill');
                    }
                });
         

          

            this.addChild(towerSprite.image);

            const priceTowers = new BitmapText({
                text: towers[i].priceTower.price.toString(),
                style: {
                    fontFamily: 'Peaberry',
                    fontSize: 16,
                    align: 'left'
                }
            });

            priceTowers.position.set(100 * i + 75, 690);
            this.addChild(priceTowers);
        }
    }


    listenToEvents() {
        EventHandle.on('tower_slot_clicked', (sprite: Sprite) => {
            this.visible = true;
            BottomPanel.instance.setVisibleSystem('tower');
            this.baseSprite = sprite;
        });
    }
}