import { PointData, Sprite } from "pixi.js";
import { Enemy } from "../Enemies/Enemy";
import { EventHandle } from "../../GameBuild/EventHandle";
import { ObjectPool } from "../../ObjectPool/ObjectPool";
import { TowerType } from "../Towers/TowerType";

export class Projectile {
    private id: number;
    public sprite: Sprite;
    private speed: number;
    private damage: number;
    private target: PointData; 
    private type: TowerType;

    constructor(id:number,sprite: Sprite, towerType: TowerType) {
        this.id = id;
        this.sprite = sprite;
        this.type = towerType;
        this.speed = 0;
        this.damage = 0;
        this.target = {x:0,y:0}
    }

    public setTarget(idEnemy:number,target: Enemy, speed: number, damage: number) {
        this.target = target.position;
        this.speed = speed;
        this.damage = damage;
    }

    public move(delta: number) {
        const dx = this.target.x - this.sprite.x;
        const dy = this.target.y - this.sprite.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Nếu viên đạn tới gần mục tiêu, thực hiện va chạm
        if (distance < this.speed * delta) {
            this.hitTarget();
        } else {
            // Di chuyển viên đạn về phía mục tiêu
            this.sprite.x += (dx / distance) * this.speed * delta;
            this.sprite.y += (dy / distance) * this.speed * delta;
        }
    }

    // Xử lý khi viên đạn chạm vào mục tiêu
    private hitTarget() {
        // Gây sát thương cho mục tiêu
        // dung event emitter emit goi tru mau cua thang ene co id duoc truyen vao tu khi tower goi
       // this.target.takeDamage(this.damage);


        // gui event len tren project ctrler de xoa chinh ban than no ex: event... 'ten event', (this)
       EventHandle.emit('projectile_hit',(this));
    }

    update(delta:number){
        this.move(delta);
    }
}