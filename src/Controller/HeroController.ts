import { Container } from "pixi.js";
import { Hero } from "../GameObject/Hero/Hero";
import { GameConst } from "../GameBuild/GameConst";
import { MapGame } from "../GameScene/Map/MapGame";
import { EventHandle } from "../GameBuild/EventHandle";
import { EnemySpawner } from "./SpawnEnemy";

export class HeroController {
    public static instance: HeroController;
    private map: Container;
    private gridMap: number[][];
    private isGameOver: boolean = false;
    private hero: Hero;

    constructor(map: Container) {
        HeroController.instance = this;
        this.gridMap = MapGame.instance.gridMap;
        this.map = map;

        this.hero = new Hero(1, 'Hero', 10, 2, 5, 'hero_avatar');

        this.spawnHero({ x: 1, y: 13 });

        this.listenEventHandle();
    }

    listenEventHandle() {
        EventHandle.on('hero_moved', (position: { x: number, y: number }) => {
            this.moveNewPosition(position);
        });
    }

    spawnHero(position: { x: number, y: number }) {
        this.hero.heroSprite.x = position.x * GameConst.SQUARE_SIZE;
        this.hero.heroSprite.y = position.y * GameConst.SQUARE_SIZE;

        this.map.addChild(this.hero.heroSprite);
    }

    moveNewPosition(position: { x: number, y: number }) {
        if (!this.isGameOver) {
            const startPosition = { x: Math.floor(this.hero.heroSprite.x / GameConst.SQUARE_SIZE), y: Math.floor(this.hero.heroSprite.y / GameConst.SQUARE_SIZE) };
            const goalPosition = { x: position.x, y: position.y };

            this.hero.setPosition(startPosition, goalPosition, this.gridMap);
            this.hero.heroAni.play();
        }
    }

    update(deltaTime: number) {
        if (this.hero.isMoving) {
            this.hero.update(deltaTime);
        } else {
            // Khi hero không còn di chuyển, kiểm tra kẻ thù trong tầm đánh
            const enemiesInRange = EnemySpawner.instance.getEnemies().filter(enemy =>
                enemy.isAlive && this.hero.isInRange(enemy.getUpdatePositionEnemy())
            );

            // Tấn công kẻ thù đầu tiên trong tầm bắn
            if (enemiesInRange.length > 0) {
                let currentTarget = enemiesInRange[0]; // Lấy kẻ thù đầu tiên
                if (!currentTarget.isAlive || !this.hero.isInRange(currentTarget.getUpdatePositionEnemy())) {
                    this.hero.target.shift();
                } else {
                    this.hero.attack(currentTarget);
                }
            }
        }
    }
}
