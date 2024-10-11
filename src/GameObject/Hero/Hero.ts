import { AnimatedSprite, Container, Graphics, PointData, Sprite, Texture } from "pixi.js";
import { Pathfinding } from "../../GameScene/Map/Pathfinding";
import Asset from "../../GameBuild/Asset";
import { GameConst } from "../../GameBuild/GameConst";
import AssetLoad from "../../GameBuild/Asset";
import { Enemy } from "../Enemies/Enemy";
import { EventHandle } from "../../GameBuild/EventHandle";

export class Hero {
    private id: number;
    private heroName: string;
    private heroLevel: number;
    private heroHp: number;
    private heroDamage: number;
    private attackRadius: number = 30;
    public heroSprite: Container;
    private heroSpeed: number;
    private currentPosition!: { x: number, y: number };
    private goalPosition!: { x: number, y: number };
    private pathfinding!: Pathfinding;
    private currentPathIndex: number = 0;
    private isAlive: boolean;
    public isMoving: boolean = false;
    public heroAni: AnimatedSprite;
    public target: Enemy[] = [];

    private attackAnimationTextures: { [key: string]: string } = {
        up: 'attack_up',
        down: 'attack_down',
        left: 'attack_left',
        right: 'attack_right'
    };

    constructor(id: number, name: string, hp: number, speed: number, damage: number, texture: string) {
        this.id = id;
        this.heroName = name;
        this.heroLevel = 1;
        this.heroHp = hp;
        this.heroDamage = damage;
        this.heroSpeed = speed;
        this.isAlive = true;
        this.heroSprite = new Container;
        this.heroAni = new AnimatedSprite(AssetLoad.getAnimation(`attack_right`));
        this.heroAni.animationSpeed = 0.1;
        this.heroAni.anchor.set(0.5);
        this.heroAni.scale.set(0.6);
        this.heroSprite.zIndex = 1000;


        const radius = new Sprite(AssetLoad.getTexture('range'));
        radius.anchor.set(0.5);
        radius.position = this.heroSprite.position;

        radius.width = this.attackRadius * 2;
        radius.height = this.attackRadius * 2;

        this.heroSprite.addChild(radius);
        this.heroSprite.addChild(this.heroAni);
    }

    setPosition(pointStart: { x: number, y: number }, pointEnd: { x: number, y: number }, gridMap: number[][]) {
        this.currentPosition = { x: pointStart.x, y: pointStart.y };
        this.goalPosition = { x: pointEnd.x, y: pointEnd.y };
        this.pathfinding = new Pathfinding(gridMap);
        const path = this.pathfinding.bfs(this.currentPosition, this.goalPosition);
        if (path) {
            this.isMoving = true;
            this.currentPathIndex = 0;
        } else {
            this.isMoving = false;
        }
    }

    private getCurrentDirection(): string {
        if (this.heroAni.textures === AssetLoad.getAnimation(`move_up`)) {
            return 'up';
        } else if (this.heroAni.textures === AssetLoad.getAnimation(`move_down`)) {
            return 'down';
        } else if (this.heroAni.textures === AssetLoad.getAnimation(`move_left`)) {
            return 'left';
        } else {
            return 'right';
        }
    }

    attack(target: Enemy) {
    
        // Kiểm tra nếu kẻ thù đang trong tầm đánh
        if (this.isInRange(target.getUpdatePositionEnemy()) && !this.heroAni.playing) {
            // Phát animation tấn công dựa trên hướng hiện tại
            const currentDirection = this.getCurrentDirection();
            this.heroAni.textures = AssetLoad.getAnimation(this.attackAnimationTextures[currentDirection]);
            this.heroAni.play();
    
            this.heroAni.onFrameChange = (currentFrame: number) => {
                if (currentFrame === this.heroAni.totalFrames - 1) {
                    target.takeDamage(target.id, this.heroDamage);
    
                    this.heroAni.onFrameChange = undefined;
                    this.heroAni.gotoAndStop(0);
                }
            };
        }
    }

    move(delta: number) {
        // Chỉ cập nhật vị trí nếu đang di chuyển và đã có mục tiêu
        if (!this.isMoving || !this.goalPosition) return;

        const path = this.pathfinding.astar(this.currentPosition, this.goalPosition);
        if (path && this.currentPathIndex < path.length) {
            const target = path[this.currentPathIndex];
            const dx = target.x * GameConst.SQUARE_SIZE - this.heroSprite.x;
            const dy = target.y * GameConst.SQUARE_SIZE - this.heroSprite.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 1) {
                this.heroSprite.x += (dx / dist) * this.heroSpeed * delta;
                this.heroSprite.y += (dy / dist) * this.heroSpeed * delta;

                let newTexture;

                if (Math.abs(dx) > Math.abs(dy)) {
                    if (dx > 0) {
                        newTexture = AssetLoad.getAnimation(`move_right`);
                    } else {
                        newTexture = AssetLoad.getAnimation(`move_left`);
                    }
                } else {
                    if (dy > 0) {
                        newTexture = AssetLoad.getAnimation(`move_down`);
                    } else {
                        newTexture = AssetLoad.getAnimation(`move_up`);
                    }
                }

                // Chỉ thay đổi textures khi cần thiết
                if (this.heroAni.textures !== newTexture) {
                    this.heroAni.textures = newTexture;
                    this.heroAni.play();
                }

                this.heroSprite.addChild(this.heroAni);
            } else {
                this.currentPathIndex++;
            }
        }

        if (path && this.currentPathIndex >= path.length) {
            this.isMoving = false;
            this.heroAni.gotoAndStop(0);
        }
    }

    public isInRange(enemyPosition: PointData): boolean {
        const distance = Math.sqrt(
            Math.pow(enemyPosition.x - this.heroSprite.x + GameConst.SQUARE_SIZE / 2, 2) +
            Math.pow(enemyPosition.y - this.heroSprite.y + GameConst.SQUARE_SIZE / 2, 2)
        );
        return distance <= this.attackRadius;
    }

    update(deltaTime: number) {
        this.move(deltaTime);
    }
}