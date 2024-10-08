import { BitmapText, Container, Graphics, Sprite, Texture } from "pixi.js";
import AssetLoad from '../../GameBuild/Asset';
import { PlayerController } from "../../Controller/PlayerController";
import { MapGame } from "../Map/MapGame";


export class RightPanel extends Container {
    public static instance: RightPanel;
    private cointTxt: BitmapText;
    private healthTxt: BitmapText;
    private waveTxt: BitmapText;
    constructor() {
        super();
        if (!RightPanel.instance) {
            RightPanel.instance = this;
        }
        this.cointTxt = new BitmapText();
        this.waveTxt = new BitmapText();
        this.healthTxt = new BitmapText();

        this.init();
        this.propertyTxt();
        this.updateCoinDisplay();
    }

    init() {
        this.width = 224;
        this.height = 768;

        const rightPanGrap = new Sprite(Texture.from('background_right'));
        rightPanGrap.x = 800;
        this.addChild(rightPanGrap);

        this.createSprite(910,120,150,150,'logo_game');

        this.createSprite(910,250,140,60,'ui-health');

        this.createSprite(910,310,140,60,'ui-wave');
    
        this.createSprite(910,370,140,60,'ui-coin');
      
    }

    propertyTxt() {
        this.healthTxt = this.createText(910,230,20);
        this.waveTxt =this.createText(910,290,20);
        this.cointTxt =this.createText(910,350,20);
    }

    updateCoinDisplay() {
        this.healthTxt.text = PlayerController.instance.hpPlayer.toString();
        this.waveTxt.text = PlayerController.instance.currentWave + '/' + PlayerController.instance.waveData.length;
        this.cointTxt.text = PlayerController.instance.cointPlayer.toString();
    }

    createText(x:number,y:number,size:number):BitmapText{
        const text = new BitmapText({
            style: {
                fontFamily: 'ShinyPeaberry',
                fontSize: size,
                align: 'left'
            }
        }); 
        text.position.set(x,y);
        this.addChild(text);
        return text;
    }

    createSprite(x:number,y:number,w:number,h:number,texture:string):Sprite{
        const sprite = new Sprite(AssetLoad.getTexture(texture));
        sprite.anchor.set(0.5);
        sprite.position.set(x,y);
        sprite.width = w;
        sprite.height = h;

        this.addChild(sprite);
        return sprite;
    }
}