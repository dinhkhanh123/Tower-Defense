import { Point, PointData, Sprite, Texture } from "pixi.js";
import { GameConst } from "../../GameBuild/GameConst";
import { EnemyType } from "./EnemyType";
import Asset from "../../GameBuild/Asset";
import { Pathfinding } from "../../GameScene/Map/Pathfinding";
import { EventHandle } from "../../GameBuild/EventHandle";
import { Projectile } from "../Projectiles/Projectile";
import { TowerType } from "../Towers/TowerType";
import { ObjectPool } from "../../ObjectPool/ObjectPool";

export class Enemy {
    public id: number;
    public sprite: Sprite;
    public type: EnemyType;
    private _hp: {hpConst: number, hpCount: number};
    private _speed: {speedConst:number, speedCount:number};
    private _damage: {damageConst: number, damageCount: number};
    public isAlive: boolean;
    public position: PointData;
    private currentPosition!: { x: number, y: number };
    private goalPosition!: { x: number, y: number };
    private pathfinding!: Pathfinding;
    private currentPathIndex: number = 0;


    constructor(id: number, type: EnemyType, hp: number, speed: number, damage: number) {
        this.id = id;
        this.type = type;
        this.sprite = new Sprite(Asset.getTexture(type));
        this._hp = {hpConst: hp, hpCount: hp};
        this._speed = {speedConst: speed,speedCount: speed};
        this._damage = {damageConst: damage, damageCount: damage};

        this.isAlive = true;
        this.position = { x: this.sprite.x, y: this.sprite.y };

        this.listenEventHandle();
    }

    reset(){
        this._hp.hpCount = this._hp.hpConst;
        this.isAlive = true;
        this.currentPathIndex = 0;
    }

    setPosition(pointStart: { x: number, y: number }, pointEnd: { x: number, y: number }, gridMap: number[][]) {
        this.currentPosition = {x: pointStart.x, y: pointStart.y};
        this.goalPosition = {x: pointEnd.x, y: pointEnd.y};
        this.pathfinding = new Pathfinding(gridMap)
 
    }

    move(delta: number) {

        const path = this.pathfinding.bfs(this.currentPosition, this.goalPosition);

        if (path && this.currentPathIndex < path.length) {
            const target = path[this.currentPathIndex];
            const dx = target.x * GameConst.SQUARE_SIZE - this.sprite.x;
            const dy = target.y * GameConst.SQUARE_SIZE - this.sprite.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 1) {
                this.sprite.x += (dx / dist) * this._speed.speedCount * delta;
                this.sprite.y += (dy / dist) * this._speed.speedCount * delta;
            } else {
                this.currentPathIndex++;
            }
        }

    }

    public getUpdatePositionEnemy(): PointData {
        this.position = { x: this.sprite.x, y: this.sprite.y };
        return this.position;
    }

    update(delta: number) {
        this.move(delta);
    }

    takeDamage(id:number, damage: number) {

        if(id === this.id){
            this._hp.hpCount -= damage;
            if (this._hp.hpCount <= 0) {
                this._hp.hpCount = 0;
                this.isAlive = false;              
            } 
        }  

    }

    listenEventHandle() {
        EventHandle.on('projectile_hit', (towerType: TowerType, projectile: Projectile, idEnemy: number) => {
            this.takeDamage(idEnemy, projectile.damage);
        });
    }

    hasReachedGoal(): boolean {
        const dx = this.goalPosition.x * GameConst.SQUARE_SIZE - this.sprite.x;
        const dy = this.goalPosition.y * GameConst.SQUARE_SIZE - this.sprite.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance < 1;
    }

    updateTexture(dx: number, dy: number) {
        // const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        // if (angle >= -45 && angle < 45) {
        //     this.sprite = new Sprite(Texture.from('enemy2'));
        // } else if (angle >= 45 && angle < 135) {
        //     this.sprite = new Sprite(Texture.from('enemy1'));
        // } else if (angle >= -135 && angle < -45) {
        //     this.sprite = new Sprite(Texture.from('enemy2'));
        // } else {
        //     this.sprite = new Sprite(Texture.from('enemy1'));
        // }
    }

    //Kiểm tra nếu kẻ thù đã đến cuối lộ trình
    // hasReachedEnd(): boolean {
    //     return this.currentPathIndex >= this.path.length - 1;
    // }
}
// if (this.currentPathIndex < this.path.length) {
//     const target = this.path[this.currentPathIndex];
//     const dx = target.x * GameConst.SQUARE_SIZE - this.sprite.x;
//     const dy = target.y * GameConst.SQUARE_SIZE - this.sprite.y;
//     const dist = Math.sqrt(dx * dx + dy * dy);

//     if (dist > 1) {
//         const angle = Math.atan2(dy, dx);

//         this.sprite.rotation = angle;

//        // this.updateTexture(dx, dy);

//         this.sprite.x += (dx / dist) * this.speed * delta;
//         this.sprite.y += (dy / dist) * this.speed * delta;
//     } else {
//         this.currentPathIndex++; 
//     }
// }