import { Container, Sprite } from "pixi.js";
import { Pathfinding } from "../../GameScene/Map/Pathfinding";
import Asset from "../../GameBuild/Asset";
import { GameConst } from "../../GameBuild/GameConst";
import { Enemy } from "../Enemies/Enemy";

export class Hero {
    public sprite: Container;
    private currentPosition!: { x: number, y: number };
    private goalPosition!: { x: number, y: number };
    private pathfinding!: Pathfinding;
    private currentPathIndex: number = 0;
    private attackRadius: number = 100;
    private damage: number = 10;
    private speed = 2;

    constructor(position: { x: number, y: number }) {
        this.sprite = new Container();
        this.currentPosition = position;
        this.goalPosition = position;
        this.initHeroSprite();
    }

    // Tạo hero sprite
    private initHeroSprite() {
        const heroSprite = new Sprite(Asset.getTexture("hero"));
        heroSprite.anchor.set(0.5);
        this.sprite.addChild(heroSprite);
    }

    setPosition(pointStart: { x: number, y: number }, pointEnd: { x: number, y: number }, gridMap: number[][]) {
        this.currentPosition = { x: pointStart.x, y: pointStart.y };
        this.goalPosition = { x: pointEnd.x, y: pointEnd.y };
        this.pathfinding = new Pathfinding(gridMap);
    }

    move(delta: number) {
        const path = this.pathfinding.bfs(this.currentPosition, this.goalPosition);

        if (path && this.currentPathIndex < path.length) {
            const target = path[this.currentPathIndex];
            const dx = target.x * GameConst.SQUARE_SIZE - this.sprite.x;
            const dy = target.y * GameConst.SQUARE_SIZE - this.sprite.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 1) {
                this.sprite.x += (dx / dist) * this.speed * delta;
                this.sprite.y += (dy / dist) * this.speed * delta;
            } else {
                this.currentPathIndex++;
            }
        }
    }

    // Tấn công kẻ địch trong bán kính
    attackEnemyInRange(enemies: Enemy[]) {
        for (const enemy of enemies) {
            const dx = enemy.sprite.x - this.sprite.x;
            const dy = enemy.sprite.y - this.sprite.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= this.attackRadius && enemy.isAlive) {
                //  enemy.takeDamage(this.damage);
                break; // Tấn công enemy đầu tiên trong phạm vi
            }
        }
    }

    update(delta: number, enemies: Enemy[]) {
        this.move(delta);
        this.attackEnemyInRange(enemies);
    }
}
