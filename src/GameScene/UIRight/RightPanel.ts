import { Container, Graphics, Sprite, Texture } from "pixi.js";
import Asset from "../../GameBuild/Asset";


export class RightPanel extends Container{

    constructor(){
        super();
        this.init();
    }

    init(){
        this.width = 224;
        this.height = 768;

        const rightPanGrap = new Sprite(Texture.from('background_right'));
        rightPanGrap.x = 800;
        
        const logo = new Sprite(Texture.from('logo_game'));
        logo.anchor.set(0.5);
        logo.x = 910;
        logo.y = 120;

        const health = new Sprite(Asset.getTexture('health'));
        health.anchor.set(0.5);
        health.x = 860;
        health.y = 230;
        health.width = 30;
        health.height = 30;

        const wave = new Sprite(Asset.getTexture('wave'));
        wave.anchor.set(0.5);
        wave.x = 860;
        wave.y = 280;
        wave.width = 30;
        wave.height = 30;

        const coin = new Sprite(Asset.getTexture('coin'));
        coin.anchor.set(0.5);
        coin.x = 860;
        coin.y = 330;
        coin.width = 30;
        coin.height = 30;

        


        this.addChild(rightPanGrap);
        this.addChild(logo);
        this.addChild(coin);
        this.addChild(wave);
        this.addChild(health);


    }
}