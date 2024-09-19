import { Point, Sprite, Texture } from "pixi.js";

export class Enemy {
    private id: number;
    public sprite: Sprite;
    private hp: number;
    private speed: number;
    private damage: number;
    private isAlive: boolean;
    private path: { x: number, y: number }[] = []; 
    private currentPathIndex: number = 0;
    

    constructor(id:number, texture: Texture,path: { x: number, y: number }[]) {
        this.id = id;
        this.sprite = new Sprite(texture);
        this.hp = 100; 
        this.speed = 2; 
        this.damage = 10; 
        this.isAlive = true; 
        this.path = path;
    }

    move(delta: number) {
        if (this.currentPathIndex < this.path.length) {
            const target = this.path[this.currentPathIndex];
            const dx = target.x * 40 - this.sprite.x;
            const dy = target.y * 40 - this.sprite.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 1) {
                const angle = Math.atan2(dy, dx);

                this.sprite.rotation = angle;

               // this.updateTexture(dx, dy);

                this.sprite.x += (dx / dist) * this.speed * delta;
                this.sprite.y += (dy / dist) * this.speed * delta;
            } else {
                this.currentPathIndex++; 
            }
        }
    }
    update(delta: number) {
        this.move(delta);
    }

    takeDamage(damage: number) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.hp = 0;
            this.isAlive = false;
            this.die();
        }
    }

   
    die() {
      //  console.log(`Enemy ${this.id} has been killed.`);
        // Thêm logic như xóa enemy khỏi game, hiển thị hiệu ứng, v.v.
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

   

    // Kiểm tra nếu kẻ thù đã đến cuối lộ trình
    // hasReachedEnd(): boolean {
    //     return this.currentPathIndex >= this.path.length - 1;
    // }
}
