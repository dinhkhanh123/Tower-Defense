import { BitmapText, Container, Graphics, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { BottomPanel } from "./BottomPanel";
import { EventHandle } from "../../GameBuild/EventHandle";
import { Tower } from "../../GameObject/Towers/Tower";
import Asset from "../../GameBuild/Asset";

export class TowerInfor extends Container {
    private towerId: Number;
    private levelTower:number;
    private towerSprite: Sprite;
    private towerNameTxt: BitmapText;
    private towerDetailTxt: BitmapText;
    private towerInforTxt:BitmapText;
    private towerRange:Sprite

    private towerUprade: Graphics;
    private towerSell: Graphics;

    constructor() {
        super();
        this.towerId = 0;
        this.levelTower = 0;
        this.towerSprite = new Sprite();
        this.towerNameTxt = new BitmapText();
        this.towerDetailTxt = new BitmapText();
        this.towerInforTxt = new BitmapText();
        this.towerRange = new Sprite();

        this.towerUprade = new Graphics();
        this.towerSell = new Graphics();

        this.addChild(this.towerRange);
        this.init();
        this.textTower();
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


        this.addChild(towerInfor);
        this.addChild(closeTowerPan);

    }

    textTower(){

        this.towerSprite = new Sprite();
        this.towerSprite.position.set(100, 610); 
        this.towerSprite.width = 80;
        this.towerSprite.height = 100;

        this.towerNameTxt = new BitmapText({
            text: this.towerNameTxt,
            style: {
                fontFamily: 'Peaberry',
                fontSize: 24,
                align: 'left'
            },
        });
        this.towerNameTxt.position.set(200, 610);

        this.towerDetailTxt = new BitmapText({
            text: this.towerDetailTxt,
            style: {
                fontFamily: 'MonospacePeaberr',
                fontSize: 16,
                align: 'left'
            },
        });
        this.towerDetailTxt.position.set(200, 650);

        this.towerInforTxt = new BitmapText({
            style: {
                fontFamily: 'MonospacePeaberr',
                fontSize: 12,
                align: 'left'
            },
        });
        this.towerInforTxt.position.set(200, 680);

        this.towerUprade.rect(500,630,100,30);
        this.towerUprade.fill(0x72BF78);
        this.towerUprade.eventMode='static';
        this.towerUprade.cursor = 'pointer';
        this.towerUprade.interactive = true

        this.towerUprade.on('pointerdown',()=>{
            EventHandle.emit('uprade_tower', this.towerId);
        });

        // if(this.levelTower === 3){
        //     this.towerUprade.visible = false;
        // }

        this.towerSell.rect(500,670,100,30);
        this.towerSell.fill(0xE78F81);
        this.towerSell.eventMode = 'static';
        this.towerSell.cursor = 'pointer';
        this.towerSell.interactive = true;

        this.towerSell.on('pointerdown',()=>{
            EventHandle.emit('sell_tower', this.towerId);
        });



        this.addChild(this.towerSprite); 
        this.addChild(this.towerNameTxt);
        this.addChild(this.towerDetailTxt);
        this.addChild(this.towerInforTxt);

        this.addChild(this.towerUprade);
        this.addChild(this.towerSell);


    }
    

    listenToEvents() {
        EventHandle.on('tower_clicked', (optionTower:{
            id:number,
            level: number;
            towerName: string;
            towerDetail: string;
            damage: number;
            speedAttack: number;
            sprite: Sprite;
            range: {
                range: number;
                x: number;
                y: number;
            };
        }) => {
            this.towerId = optionTower.id;
            this.levelTower = optionTower.level;
            this.towerSprite.texture = optionTower.sprite.texture;
            this.towerNameTxt.text = optionTower.towerName.toString();
            this.towerDetailTxt.text = optionTower.towerDetail.toString();
            this.towerInforTxt.text = 'Level: ' + optionTower.level + '  ' + 'Damage: ' + optionTower.damage + '  ' + 'Speed Attack: ' + optionTower.speedAttack;
            this.towerRange.texture = Asset.getTexture('range');
            this.towerRange.anchor.set(0.5);
            this.towerRange.position.set(optionTower.range.x + 20 ,optionTower.range.y + 20);
            this.towerRange.width = optionTower.range.range*2;
            this.towerRange.height = optionTower.range.range*2;
                    
        });
    }
}