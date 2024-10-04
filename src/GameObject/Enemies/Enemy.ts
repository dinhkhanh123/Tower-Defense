import { AnimatedSprite, Container, Point, PointData, Sprite, Texture } from "pixi.js";
import { GameConst } from "../../GameBuild/GameConst";
import { EnemyType } from "./EnemyType";
import Asset from "../../GameBuild/Asset";
import { Pathfinding } from "../../GameScene/Map/Pathfinding";
import { EventHandle } from "../../GameBuild/EventHandle";
import { Projectile } from "../Projectiles/Projectile";
import { TowerType } from "../Towers/TowerType";
import { ObjectPool } from "../../ObjectPool/ObjectPool";
import { HealthBar } from "./HealthBar";

export class Enemy {
    public id: number;
    public sprite: Container;
    public type: EnemyType;
    public money: number;
    private _hp: { hpConst: number, hpCount: number };
    private _speed: { speedConst: number, speedCount: number };
    public damage: number;
    public isAlive: boolean;
    public position: PointData;
    private currentPosition!: { x: number, y: number };
    private goalPosition!: { x: number, y: number };
    private pathfinding!: Pathfinding;
    private currentPathIndex: number = 0;

    private healthBar: HealthBar;
    private anim: AnimatedSprite;

    constructor(id: number, type: EnemyType, hp: number, speed: number, damage: number, money: number) {
        this.sprite = new Container();
        this.id = id;
        this.type = type;
        this.money = money;
        this.damage = damage;
        this._hp = { hpConst: hp, hpCount: hp };
        this._speed = { speedConst: speed, speedCount: speed };
        this.position = { x: this.sprite.x, y: this.sprite.y };
        this.isAlive = true;
        this.healthBar = new HealthBar(this);

        // const enemySprite = new Sprite(Asset.getTexture(type));
        // enemySprite.anchor.set(0.5);

        this.anim = new AnimatedSprite(Asset.getAnimation(`${this.type}_move_left`));
        this.anim.anchor.set(0.5);
        this.anim.scale.set(0.5);

        this.sprite.addChild(this.anim);
        this.listenEventHandle();
    }

    listenEventHandle() {
        EventHandle.on('projectile_hit', (towerType: TowerType, projectile: Projectile, idEnemy: number) => {
            this.takeDamage(idEnemy, projectile.damage);
        });
    }

    reset() {
        this._hp.hpCount = this._hp.hpConst;
        this.isAlive = true;
        this.currentPathIndex = 0;
        const fullHealthPercent = 1;
        this.healthBar.updateHealthBar(fullHealthPercent);
        this.anim.play();
    }

    setPosition(pointStart: { x: number, y: number }, pointEnd: { x: number, y: number }, gridMap: number[][]) {
        this.currentPosition = { x: pointStart.x, y: pointStart.y };
        this.goalPosition = { x: pointEnd.x, y: pointEnd.y };
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

                // Cập nhật hoạt ảnh dựa trên hướng di chuyển
                let newTexture;

                if (Math.abs(dx) > Math.abs(dy)) {
                    if (dx > 0) {
                        newTexture = Asset.getAnimation(`${this.type}_move_right`);
                    } else {
                        newTexture = Asset.getAnimation(`${this.type}_move_left`);
                    }
                } else {
                    if (dy > 0) {
                        newTexture = Asset.getAnimation(`${this.type}_move_down`);
                    } else {
                        newTexture = Asset.getAnimation(`${this.type}_move_up`);
                    }
                }

                // Chỉ thay đổi textures khi cần thiết
                if (this.anim.textures !== newTexture) {
                    this.anim.textures = newTexture;
                    this.anim.play();
                }

                this.anim.animationSpeed = 0.1;

                this.sprite.addChild(this.anim);
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

    takeDamage(id: number, damage: number) {
        if (id === this.id) {
            this._hp.hpCount -= damage;
            if (this._hp.hpCount <= 0) {
                this._hp.hpCount = 0;
                this.isAlive = false;
            }
            // Tính phần trăm máu còn lại
            const healthPercent = this._hp.hpCount / this._hp.hpConst;
            this.healthBar.updateHealthBar(healthPercent);
        }
    }

    hasReachedGoal(): boolean {
        const dx = this.goalPosition.x * GameConst.SQUARE_SIZE - this.sprite.x;
        const dy = this.goalPosition.y * GameConst.SQUARE_SIZE - this.sprite.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance < 1;
    }
}
