import { PointData, Sprite } from "pixi.js";
import { Enemy } from "../Enemies/Enemy";
import { EventHandle } from "../../GameBuild/EventHandle";
import { ObjectPool } from "../../ObjectPool/ObjectPool";
import { TowerType } from "../Towers/TowerType";

export class Projectile {
    private id: number;
    public sprite: Sprite;
    private speed: number;
    public damage: number;
    private targetPosition: PointData;
    private towerType: TowerType;
    public enemyId: number;

    constructor(id: number, sprite: Sprite, towerType: TowerType) {
        this.id = id;
        this.sprite = sprite;
        this.towerType = towerType;
        this.speed = 0;
        this.damage = 0;
        this.enemyId = 0;
        this.targetPosition = { x: 0, y: 0 };
    }

    public setTarget(enemyId: number, targetPosition: PointData, speed: number, damage: number) {
        this.enemyId = enemyId;
        this.targetPosition = targetPosition;
        this.speed = speed * 5;
        this.damage = damage;
    }

    public move(delta: number) {
        const dx = this.targetPosition.x - this.sprite.x;
        const dy = this.targetPosition.y - this.sprite.y;
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
        this.move(delta);
    }
    // Xử lý khi viên đạn chạm vào mục tiêu
    private hitTarget() {
        EventHandle.emit('projectile_hit', this.towerType, this, this.enemyId);
    }
}


