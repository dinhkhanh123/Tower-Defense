import { BitmapText, Container, Graphics, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { BottomPanel } from "./BottomPanel";
import { EventHandle } from "../../GameBuild/EventHandle";
import AssetLoad from '../../GameBuild/Asset';

export class TowerInfor extends Container {
    private towerId: number;
    private levelTower: number;
    private priceTower: number;
    private priceUpgrade!: number;
    private priceUpgradeTxt: BitmapText;
    private privateSelltxt: BitmapText;
    private towerSprite: Sprite;
    private towerNameTxt: BitmapText;
    private towerDetailTxt: BitmapText;
    private towerInforTxt: BitmapText;
    private towerRange: Sprite


    constructor() {
        super();
        this.towerId = 0;
        this.levelTower = 0;
        this.priceTower = 0;
        this.towerSprite = new Sprite();
        this.towerNameTxt = new BitmapText();
        this.towerDetailTxt = new BitmapText();
        this.towerInforTxt = new BitmapText();
        this.priceUpgradeTxt = new BitmapText();
        this.privateSelltxt = new BitmapText();


        this.towerRange = new Sprite();


        this.addChild(this.towerRange);

        this.init();
        this.textTower();
        this.listenToEvents();

    }

    listenToEvents() {
        EventHandle.on('tower_clicked', (optionTower: {
            id: number,
            level: number;
            towerName: string;
            towerDetail: string;
            damage: number;
            speedAttack: number;
            sprite: Sprite;
            priceTower: number;
            upgradePrice: { [level: number]: number };
            range: {
                range: number;
                x: number;
                y: number;
            };
        }) => {
            this.towerId = optionTower.id;
            this.levelTower = optionTower.level;
            this.priceTower = optionTower.priceTower;

            if (this.levelTower < 3) {
                this.priceUpgrade = optionTower.upgradePrice[this.levelTower + 1];
                this.priceUpgradeTxt.text = this.priceUpgrade.toString();
            } else {
                this.priceUpgradeTxt.text = "Max";
            }
            this.privateSelltxt.text = optionTower.priceTower;
            this.towerSprite.texture = optionTower.sprite.texture;
            this.towerNameTxt.text = optionTower.towerName.toString();
            this.towerDetailTxt.text = optionTower.towerDetail.toString();
            this.towerInforTxt.text = 'Level: ' + optionTower.level + '  ' + 'Damage: ' + optionTower.damage + '  ' + 'Speed Attack: ' + optionTower.speedAttack;
            this.towerRange.texture = AssetLoad.getTexture('range');
            this.towerRange.anchor.set(0.5);
            this.towerRange.position.set(optionTower.range.x + 20, optionTower.range.y + 20);
            this.towerRange.width = optionTower.range.range * 2;
            this.towerRange.height = optionTower.range.range * 2;

        });
    }

    init() {
        const towerInfor = new Graphics();

        towerInfor.rect(0, 600, 800, 168);
        towerInfor.fill(0xD2E0FB);

        const closeTowerPan = this.createButton(780, 620, 30, 30, 'btn_close');
        closeTowerPan.on('pointerdown', () => BottomPanel.instance.setVisibleSystem('skill'));


        this.addChild(towerInfor);
        this.addChild(closeTowerPan);

    }

    textTower() {
        this.towerSprite = new Sprite();
        this.towerSprite.position.set(100, 610);
        this.towerSprite.width = 80;
        this.towerSprite.height = 100;

        this.towerNameTxt = this.createText(200, 610, 'GoldPeaberry', 24);

        this.towerDetailTxt = this.createText(200, 650, 'MonospacePeaberr', 16);

        this.towerInforTxt = this.createText(200, 680, 'MonospacePeaberr', 12);

        const towerUprade = this.createButton(550, 645, 100, 30, 'ui_bar_btn');
        this.createSprite(500,640,40,40,'ui_build');
        this.priceUpgradeTxt = this.createText(550, 630, 'ShinyPeaberry', 16);
        towerUprade.on('pointerdown', () => {
            EventHandle.emit('uprade_tower', this.towerId, this.priceUpgrade);
        });

        const towerSell = this.createButton(550, 685, 100, 30, 'ui_bar_btn');
        this.createSprite(500,685,40,40,'ui_money');
        this.privateSelltxt = this.createText(550, 670, 'ShinyPeaberry', 16);
        towerSell.on('pointerdown', () => {
            EventHandle.emit('sell_tower', this.towerId, this.priceTower);
        });

        this.addChild(this.towerSprite);
    }

    private createButton(x: number, y: number, w: number, h: number, texture: string): Sprite {
        const button = new Sprite(Texture.from(texture));
        button.anchor.set(0.5);
        button.width = w;
        button.height = h;
        button.position.set(x, y);
        button.interactive = true;
        button.eventMode = 'static';
        button.cursor = 'pointer';

        this.addChild(button);
        return button;
    }

    private createText(x: number, y: number, font: string, size: number): BitmapText {
        const bitmapTxt = new BitmapText({
            style: {
                fontFamily: font,
                fontSize: size,
                align: 'left'
            },
        });
        bitmapTxt.position.set(x, y);

        this.addChild(bitmapTxt);
        return bitmapTxt;
    }

    private createSprite(x: number, y: number, w: number, h: number, texture: string): Sprite {
        const sprite = new Sprite(AssetLoad.getTexture(texture));
        sprite.anchor.set(0.5);
        sprite.width = w;
        sprite.height = h;
        sprite.position.set(x, y);

        this.addChild(sprite);
        return sprite;
    }
}