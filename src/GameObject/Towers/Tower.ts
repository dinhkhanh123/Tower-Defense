import { Point, Sprite, Texture } from "pixi.js";
import { TowerType } from "./TowerType";
import Asset from "../../GameBuild/Asset";

export class Tower{
    public id: number;          
    public type: TowerType;     
    public sprite: Sprite;
    public damage: number;
    public range: number;
    public attackSpeed: number;
    public level: number;

    constructor(id: number, type: TowerType, damage: number, range: number, attackSpeed: number) {

        this.id = id;
        this.type = type;
        this.sprite = new Sprite(Asset.getTexture(type));
        this.damage = damage;
        this.range = range;
        this.attackSpeed = attackSpeed;
        this.level = 1;

     
    }
}