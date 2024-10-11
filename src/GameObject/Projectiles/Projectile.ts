import { PointData, Sprite } from "pixi.js";
import { Enemy } from "../Enemies/Enemy";
import { EventHandle } from "../../GameBuild/EventHandle";
import { TowerType } from "../Towers/TowerType";

export class Projectile {
    private id: number;
    public sprite: Sprite;
    private speed: number;
    public damage: number;
    public target!: Enemy;
    private towerType: TowerType;
    private force:number;

    constructor(id: number, sprite: Sprite, towerType: TowerType) {
        this.id = id;
        this.sprite = sprite;
        this.towerType = towerType;
        this.speed = 0;
        this.damage = 0;
        this.force = 5;
    }

    public setTarget(enemyTarget: Enemy, speed: number, damage: number) {
        this.target = enemyTarget;
        this.speed = speed * this.force;
        this.damage = damage;
    }

    public move(delta: number) {

        const dx = this.target.sprite.x - this.sprite.x;
        const dy = this.target.sprite.y - this.sprite.y;
        const distance = Math.sqrt(dx * dx + dy * dy);


        this.sprite.rotation = Math.atan2(dy, dx);

        // Nếu viên đạn tới gần mục tiêu, thực hiện va chạm
        if (distance < this.speed * delta) {
            this.hitTarget();
        } else {
            // Di chuyển viên đạn về phía mục tiêu
            this.sprite.x += (dx / distance) * this.speed * delta;
            this.sprite.y += (dy / distance) * this.speed * delta;
        }
    }
    update(delta: number) {
        this.target.getUpdatePositionEnemy();
        this.move(delta);
    }

    // Xử lý khi viên đạn chạm vào mục tiêu
    private hitTarget() {
        EventHandle.emit('projectile_hit', this.towerType, this, this.target.id);
    }
}


