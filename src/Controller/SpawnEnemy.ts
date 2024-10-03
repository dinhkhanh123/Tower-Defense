import { Container, Sprite, Texture, Point, Assets } from "pixi.js";
import { Enemy } from "../GameObject/Enemies/Enemy";
import { EnemyType } from "../GameObject/Enemies/EnemyType";
import { GameConst } from "../GameBuild/GameConst";
import { ObjectPool } from "../ObjectPool/ObjectPool";
import { EventHandle } from "../GameBuild/EventHandle";
import { MapGame } from "../GameScene/Map/MapGame";
import { PlayerController } from "./PlayerController";

export class EnemySpawner {
    public static instance: EnemySpawner;
    private map: Container;
    private gridMap: number[][];
    private enemies: Enemy[] = [];
    public waveNumber: number;
    public isSpawning: boolean = false;
    public currentEnemiesCount: number = 0;

    constructor(map: Container) {
        EnemySpawner.instance = this;
        this.map = map;
        this.gridMap = MapGame.instance.gridMap;
        this.waveNumber = 0;
    }

    createEnemy(spawnPoint: { x: number, y: number }, goal: { x: number, y: number }, index: number) {
        const enemyType = EnemyType.Goblin;
        const enemy = ObjectPool.instance.getEnemyFromPool(enemyType);

        enemy.reset();

        enemy.sprite.x = spawnPoint.x * GameConst.SQUARE_SIZE;
        enemy.sprite.y = spawnPoint.y * GameConst.SQUARE_SIZE;


        enemy.setPosition(spawnPoint, goal, this.gridMap);

        this.enemies.push(enemy);

        enemy.sprite.zIndex = 1000 - index;
        console.log(enemy.sprite.zIndex);
        this.map.sortChildren();
        this.map.addChild(enemy.sprite);
    }

    removeEnemy(deadEnemy: Enemy) {
        const index = this.enemies.indexOf(deadEnemy);
        if (index !== -1) {
            this.enemies.splice(index, 1);
            this.map.removeChild(deadEnemy.sprite);

            ObjectPool.instance.returnEnemyToPool(deadEnemy.type, deadEnemy);
        }
    }

    spawnWave(spawnPoints: { x: number, y: number }[], goal: { x: number, y: number }, enemiesPerWave: number) {
        this.waveNumber++;
        this.currentEnemiesCount = 0;
        this.isSpawning = true;

        const spawnDelay = 1000;

        for (let i = 0; i < enemiesPerWave; i++) {
            spawnPoints.forEach(spawnPoint => {
                setTimeout(() => {
                    this.createEnemy(spawnPoint, goal, i);
                    this.currentEnemiesCount++;
                }, i * spawnDelay + Math.random() * spawnDelay);
            });
        }

        setTimeout(() => {
            this.isSpawning = false;
            console.log(`Wave ${this.waveNumber} completed.`);
        }, enemiesPerWave * spawnDelay);
    }


    update(deltaTime: number) {
        this.enemies.forEach((enemy) => {
            enemy.update(deltaTime);

            if (!enemy.isAlive || enemy.hasReachedGoal()) {
                this.removeEnemy(enemy);
            }

            if (!enemy.isAlive) {
                PlayerController.instance.addMoney(enemy.money);
            }

            if (enemy.hasReachedGoal()) {
                PlayerController.instance.takeDamage(enemy.damage);
            }
        });

        if (!this.isSpawning && this.getEnemies().length === 0 && this.waveNumber !== 0) {
            EventHandle.emit('start_spawn');
        }

    }

    public getEnemies(): Enemy[] {
        return this.enemies;
    }
}