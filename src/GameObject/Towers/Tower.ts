import { Point, Sprite, Texture } from "pixi.js";
import { TowerType } from "../../GameBuild/TowerType";

export class Tower{
    public id: number;          
    public type: TowerType;     
    public sprite: Sprite;
    public damage: number;
    public range: number;
    public attackSpeed: number;
    public level: number;

    constructor(id: number, type: TowerType, texture: Texture, damage: number, range: number, attackSpeed: number) {

        this.id = id;
        this.type = type;
        this.sprite = new Sprite(texture);
        this.damage = damage;
        this.range = range;
        this.attackSpeed = attackSpeed;
        this.level = 1;

     
    }

    attack() {
        
    }

    upgrade() {
        this.level++;
        this.damage *= 1.2;
        this.range *= 1.1;
        this.attackSpeed *= 1.05;
     
    }
}