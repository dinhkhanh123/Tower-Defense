import { Point, Sprite, Texture } from "pixi.js";

export class Tower{
    private id: number;
    private sprite: Sprite;
    private damage: number;
    private range: number;
    private attackSpeed: number; 
    private level: number;
    private cost: number;
    private target: any; 
    private cooldown: number; 
    private isAttacking: boolean;
    private position: Point;
    private textures: Texture[];

    constructor(id: number, textures: Texture[], position: Point){
        this.id = id;
        this.textures = textures; 
        this.sprite = new Sprite(this.textures[0]); 
        this.damage = 10; 
        this.range = 100; 
        this.attackSpeed = 1; 
        this.level = 1; 
        this.cost = 100; 
        this.cooldown = 0; 
        this.isAttacking = false;
        this.position = position;

        this.sprite.position.set(position.x, position.y);
    }

    init(){
        
    }
    upgrade() {
        this.level++;
        this.damage += 5; 
        this.range += 10; 
        this.attackSpeed *= 0.9; // Giảm thời gian hồi giữa các lần bắn (tăng tốc độ bắn)
        this.cost += 50; 

        if (this.level - 1 < this.textures.length) {
            this.sprite.texture = this.textures[this.level - 1]; 
        }
    }

    findTarget(enemies: any[]) {
        // Tìm kẻ thù trong phạm vi tấn công
        for (let enemy of enemies) {
            const distance = this.getDistanceTo(enemy);
            if (distance <= this.range) {
                this.target = enemy;
                return;
            }
        }
        // Nếu không có kẻ thù nào trong phạm vi, bỏ mục tiêu
        this.target = null;
    }

    getDistanceTo(enemy: any): number {
        const dx = this.sprite.x - enemy.x;
        const dy = this.sprite.y - enemy.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    canAttack(): boolean {
        return this.cooldown <= 0 && this.target != null && this.getDistanceTo(this.target) <= this.range;
    }

    attack() {
        if (this.canAttack()) {
            console.log(`Tower ${this.id} is attacking!`);
            this.target.takeDamage(this.damage); // Gây sát thương cho mục tiêu
            this.cooldown = this.attackSpeed; // Đặt thời gian hồi cho lần bắn tiếp theo
        }
    }

    update(delta: number, enemies: any[]) {
        if (this.cooldown > 0) {
            this.cooldown -= delta; 
        }

        if (this.target == null || this.getDistanceTo(this.target) > this.range) {
            this.findTarget(enemies); 
        }

        if (this.target) {
            this.attack(); 
        }
    }
}