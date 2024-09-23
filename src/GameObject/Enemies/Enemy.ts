import { Point, Sprite, Texture } from "pixi.js";
import { GameConst } from "../../GameBuild/GameConst";
import { EnemyType } from "./EnemyType";
import Asset from "../../GameBuild/Asset";
import { Pathfinding } from "../../GameScene/Map/Pathfinding";

export class Enemy {
    private id: number;
    public sprite: Sprite;
    private hp: number;
    private speed: number;
    private damage: number;
    private isAlive: boolean;
    private currentPosition: { x: number, y: number };
    private goalPosition: { x: number, y: number };
    private pathfinding: Pathfinding;
    private currentPathIndex: number = 0;


    constructor(id: number, type: EnemyType, pointStart: { x: number, y: number }, pointEnd: { x: number, y: number }, pathfinding: Pathfinding) {
        this.id = id;
        this.sprite = new Sprite(Asset.getTexture('Goblin'));
        this.hp = 100;
        this.speed = 2;
        this.damage = 10;
        this.isAlive = true;
        this.currentPosition = pointStart;
        this.goalPosition = pointEnd;
        this.pathfinding = pathfinding;
    }

    move(delta: number) {

        const path = this.pathfinding.bfs(this.currentPosition, this.goalPosition);

        if (path && this.currentPathIndex < path.length) {
            const target = path[this.currentPathIndex];
            const dx = target.x * GameConst.SQUARE_SIZE - this.sprite.x;
            const dy = target.y * GameConst.SQUARE_SIZE - this.sprite.y;
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
        // Nếu tìm thấy đường đi
        // if (path && this.currentPathIndex < path.length) {

        //     const nextPoint = path[this.currentPathIndex];

        //     // Di chuyển enemy về phía điểm tiếp theo
        //     const dx = nextPoint.x * 40 - this.sprite.x;
        //     const dy = nextPoint.y * 40 - this.sprite.y;
        //     const distance = Math.sqrt(dx * dx + dy * dy);

        //     // Di chuyển theo trục x và y dựa trên khoảng cách
        //     if (distance > 0) {
        //         this.sprite.x += (dx / distance) * this.speed * delta;
        //         this.sprite.y += (dy / distance) * this.speed * delta;

        //         // Nếu enemy đã gần tới điểm tiếp theo, chuyển sang điểm tiếp theo trong path
        //         if (distance < this.speed * delta) {
        //             this.currentPathIndex++;
        //             this.currentPosition = nextPoint; // Cập nhật vị trí hiện tại của enemy
        //         }
        //     }
        // }
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