import { PointData, Sprite } from "pixi.js";
import { TowerType } from "./TowerType";
import Asset from "../../GameBuild/Asset";
import { Enemy } from "../Enemies/Enemy";
import { EventHandle } from "../../GameBuild/EventHandle";

export class Tower {
    public id: number;
    public type: TowerType;
    public spriteTower: Sprite;
    public imageTower: Sprite;
    public towerName: string;
    public towerDetail: string;
    public damage: number;
    public range: number;
    public attackSpeed: number;
    public level: number;
    public baseTower!: Sprite;
    public target: Enemy[] = [];


    private cooldownTime: number;
    private attackTime: number;

    constructor(id: number, type: TowerType, damage: number, range: number, attackSpeed: number,towerName:string, towerDetail: string) {
        this.id = id;
        this.level = 1;
        this.type = type;
        this.towerName = towerName;
        this.spriteTower = new Sprite(Asset.getTexture(`${type}_${this.level}`));
        this.imageTower = new Sprite(Asset.getTexture(`${type}_Img_${this.level}`));
        this.damage = damage;
        this.range = range;
        this.attackSpeed = attackSpeed;
        this.towerDetail = towerDetail;

        this.cooldownTime = 50 / this.attackSpeed;
        this.attackTime = 0;

        this.listenEventHandle();
    }

    public Attack(enemyId: number, enemyPosition: PointData, detatime: number) {
        
        this.attackTime += detatime;
        if (this.attackTime >= this.cooldownTime) {
            EventHandle.emit('create_projectile', this, enemyId, enemyPosition);
            this.attackTime = 0;
        }
    }

    private Uprade(idTower: number) {
        if(idTower === this.id && this.level < 3){
            this.level++;
           // this.spriteTower = new Sprite(Asset.getTexture(`${this.type}_${this.level}`));
            this.imageTower = new Sprite(Asset.getTexture(`${this.type}_Img_${this.level}`));
            this.damage += 2;
            this.attackSpeed += .5;
            this.range += 50;
            
            
            const optionTower = {
                id:this.id,
                level: this.level,
                towerName: this.towerName,
                towerDetail: this.towerDetail,
                damage: this.damage,
                speedAttack: this.attackSpeed,
                sprite: this.imageTower,
                range: {
                    range: this.range,
                    x: this.spriteTower.position.x,
                    y: this.spriteTower.position.y
                }
            };
            EventHandle.emit('tower_clicked', optionTower);
        }
    }

    public isInRange(enemyPosition: PointData): boolean {
        const distance = Math.sqrt(
            Math.pow(enemyPosition.x - this.spriteTower.x, 2) +
            Math.pow(enemyPosition.y - this.spriteTower.y, 2)
        );
        return distance <= this.range;
    }


    listenEventHandle(){
        EventHandle.on('uprade_tower',(idTower:number) => this.Uprade(idTower));
    }
}