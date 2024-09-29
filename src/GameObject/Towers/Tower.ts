import { Point, PointData, Sprite, Texture } from "pixi.js";
import { TowerType } from "./TowerType";
import Asset from "../../GameBuild/Asset";
import { Enemy } from "../Enemies/Enemy";
import { Projectile } from "../Projectiles/Projectile";
import { TowerController } from "../../Controller/TowerController";
import { ObjectPool } from "../../ObjectPool/ObjectPool";
import { ProjectileController } from "../../Controller/ProjectileController";
import { EventHandle } from "../../GameBuild/EventHandle";

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
    public baseTower!: Sprite;
    public target: Enemy[] = [];


    private cooldownTime: number;
    private lastAttackTime: number;

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

        this.cooldownTime = .5 / this.attackSpeed;
        this.lastAttackTime = 0;
    }

    public Attack(enemyId: number, enemyPosition: PointData, currentTime: number) {
        if (currentTime - this.lastAttackTime >= this.cooldownTime) {
            EventHandle.emit('create_projectile', this, enemyId, enemyPosition);
            this.lastAttackTime = currentTime;
        }
    }

    public isInRange(enemyPosition: PointData): boolean {
        const distance = Math.sqrt(
            Math.pow(enemyPosition.x - this.spriteTower.x, 2) +
            Math.pow(enemyPosition.y - this.spriteTower.y, 2)
        );
        return distance <= this.range;
    }
}