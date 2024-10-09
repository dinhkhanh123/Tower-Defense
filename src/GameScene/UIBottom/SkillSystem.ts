import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { TowerSystem } from "./TowerSystem";
import { BottomPanel } from "./BottomPanel";

export class SkillSystem extends Container {
    public static instance:SkillSystem;
    public isHeroSelected: boolean = false;
    constructor() {
        super();
        if(!SkillSystem.instance){
            SkillSystem.instance = this;
        }
        this.init();
    }

    init() {
        const skillPan = new Sprite(Texture.from('ui_bar_buttom'));
        skillPan.y = 600;
        this.addChild(skillPan);

        const hero = this.createSprite(100,660,50,50,'hero_avatar');
        hero.interactive = true;
        hero.eventMode = 'static';
        hero.cursor = 'pointer';
        hero.on('pointerdown',()=>{
            this.isHeroSelected = true;
            hero.scale.set(1.2);
            console.log("Hero selected. Click on map to move.");
        });

        hero.on('hero_has_position',()=>{
            hero.scale.set(1);
        });
    
    }

    createSprite(x:number,y:number,w:number,h:number,texture:string):Sprite{
        const sprite = new Sprite(Texture.from(texture));
        sprite.anchor.set(0.5);
        sprite.position.set(x,y);
        sprite.width = w;
        sprite.height = h;

        this.addChild(sprite);
        return sprite;
    }

    // Reset trạng thái chọn hero
    resetHeroSelection() {
        this.isHeroSelected = false;
    }
}