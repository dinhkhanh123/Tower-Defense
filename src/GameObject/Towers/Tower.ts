import { Point, Sprite, Texture } from "pixi.js";
import { TowerType } from "./TowerType";
import Asset from "../../GameBuild/Asset";
import { Enemy } from "../Enemies/Enemy";
import { Projectile } from "../Projectiles/Projectile";
import { TowerController } from "../../Controller/TowerController";
import { ObjectPool } from "../../ObjectPool/ObjectPool";

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
    public baseTower!:Sprite;
 

    private cooldownTime: number; // Time in seconds between shots
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

        this.cooldownTime = 1 / this.attackSpeed; // seconds between attacks
        this.lastAttackTime = 0;
    }

    public Attack(enemy:Enemy, currentTime: number){
        if (currentTime - this.lastAttackTime >= this.cooldownTime) {
            // Get projectile from the pool
            const projectile = ObjectPool.instance.getProjectileFromPool(this.type);
            projectile.sprite.position.set(this.spriteTower.x, this.spriteTower.y);
            projectile.setTarget(enemy, this.attackSpeed * 5, this.damage);

            // Add projectile to TowerController
            TowerController.instance.addProjectile(projectile);

            // Update last attack time
            this.lastAttackTime = currentTime;
        }
   
    }

    public isInRange(enemy: Enemy): boolean {
        const distance = Math.sqrt(
            Math.pow(enemy.sprite.x - this.spriteTower.x, 2) + 
            Math.pow(enemy.sprite.y - this.spriteTower.y, 2)
        );
        return distance <= this.range;
    }
}