import { Point, Sprite, Texture } from "pixi.js";
import { TowerType } from "./TowerType";
import Asset from "../../GameBuild/Asset";

export class Tower {
    public id: number;
    public type: TowerType;
    public spriteTower: Sprite;
    public imageTower: Sprite;
    public damage: number;
    public range: number;
    public attackSpeed: number;
    public towerDetail: string;
    public level: number;

    constructor(id: number, type: TowerType, damage: number, range: number, attackSpeed: number, towerDetail: string) {
        this.id = id;
        this.type = type;
        this.spriteTower = new Sprite(Asset.getTexture(type));
        this.imageTower = new Sprite(Asset.getTexture(type));
        this.damage = damage;
        this.range = range;
        this.attackSpeed = attackSpeed;
        this.towerDetail = towerDetail;
        this.level = 1;
    }
}