import { Sprite } from "pixi.js";
import { Enemy } from "../Enemies/Enemy";

export class Projectile {
    private sprite:Sprite;
    private speed: number;
    private damage: number;
    private target: Enemy;

    constructor(sprite:Sprite,speed: number, damage: number, target: Enemy){
        this.sprite = sprite;
        this.speed = speed;
        this.damage = damage;
        this.target = target;
    }

    public move(delta: number) {
        const dx = this.target.sprite.x - this.sprite.x;
        const dy = this.target.sprite.y - this.sprite.y;
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
        this.target.takeDamage(this.damage);
        // Hủy viên đạn (có thể remove khỏi scene và array)
        this.destroy();
    }

    // Hủy viên đạn
    public destroy() {
        // Logic xóa viên đạn khỏi map hoặc object pool
        this.sprite.destroy();
    }
}