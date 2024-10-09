import { BitmapText, Container, Graphics, Sprite, Texture } from 'pixi.js';
import { Tower } from "../../GameObject/Towers/Tower";
import { TowerFactory } from "../../TowerFactory/TowerFactory";
import { TowerType } from "../../GameObject/Towers/TowerType";
import { TowerController } from "../../Controller/TowerController";
import { EventHandle } from "../../GameBuild/EventHandle";
import { BottomPanel } from "./BottomPanel";
import { PlayerController } from '../../Controller/PlayerController';

export class TowerSystem extends Container {
    private static instance : TowerSystem;
    private baseSprite!: Sprite;

    constructor() {
        super();

        this.init();
        this.listenToEvents();
    }

    public static getInstance(): TowerSystem {
        if (!TowerSystem.instance) {
            TowerSystem.instance = new TowerSystem();
        }
        return TowerSystem.instance;
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

            const card = this.createTowerCard(towers[i], 100 * i + 50, 610);
            this.addChild(card);
        }
    }


    listenToEvents() {
        EventHandle.on('tower_slot_clicked', (sprite: Sprite) => {
            this.visible = true;
            BottomPanel.instance.setVisibleSystem('tower');
            this.baseSprite = sprite;
        });
    }
    createTowerCard(tower: Tower, x: number, y: number): Container {
        // Tạo container cho card
        const card = new Container();
        card.position.set(x, y);

        // Background của card
        const bgCard = new Sprite(Texture.from('ui_card'));
        bgCard.width = 80;
        bgCard.height = 100;

        card.interactive = true;
        card.eventMode = 'static';
        card.cursor = 'pointer';

        // Xử lý sự kiện click lên tháp
        card.on('pointerdown', () => {
            const selectedTowerType = tower.type;

            if (tower.priceTower.price <= PlayerController.instance.cointPlayer) {
                EventHandle.emit('buy_tower', tower.id);
                TowerController.instance.createTower(selectedTowerType, this.baseSprite);
                BottomPanel.instance.setVisibleSystem('skill');
            }
        });
        card.addChild(bgCard);

        // Ảnh của tower
        const towerSprite = tower.imageTower.image;
        towerSprite.width = 30;
        towerSprite.height = 45;
        towerSprite.x = 25;
        towerSprite.y = 20;
   

        card.addChild(towerSprite);
     
        // Hiển thị giá của tháp
        const priceTowers = new BitmapText({
            text: tower.priceTower.price.toString(),
            style: {
                fontFamily: 'ShinyPeaberry',
                fontSize: 12,
                align: 'left'
            }
        });
        priceTowers.position.set(28, 70);
        card.addChild(priceTowers);
        
        return card;
    }

}