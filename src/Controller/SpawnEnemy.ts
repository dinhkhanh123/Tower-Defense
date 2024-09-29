import { Container, Sprite, Texture, Point, Assets } from "pixi.js";
import { Enemy } from "../GameObject/Enemies/Enemy";
import { Pathfinding } from "../GameScene/Map/Pathfinding";
import Asset from "../GameBuild/Asset";
import { EnemyType } from "../GameObject/Enemies/EnemyType";
import { GameConst } from "../GameBuild/GameConst";
import { ObjectPool } from "../ObjectPool/ObjectPool";
import { EventHandle } from "../GameBuild/EventHandle";

export class EnemySpawner extends Container {
    private gridMap: number[][];
    private pathfinding: Pathfinding;
    private enemies: Enemy[] = [];
    public waveNumber: number;
    private spawnInterval: number;
    private lastSpawnTime: number = 0;
    private isSpawning: boolean = false;
    private enemiesToSpawn: number;
    private currentEnemiesCount: number = 0;
    private spawnPoint: { x: number, y: number };
    private goal: { x: number, y: number };


    constructor(gridmap: number[][]) {
        super();
        this.gridMap = gridmap;
        this.pathfinding = new Pathfinding(this.gridMap);
        this.spawnInterval = 2;
        this.waveNumber = 0;
        this.enemiesToSpawn = 0;
        this.spawnPoint = { x: 0, y: 0 };
        this.goal = { x: 0, y: 0 };

        this.listenEventHandle();
    }

    createEnemy(spawnPoint: { x: number, y: number }, goal: { x: number, y: number }) {
        const enemyType = EnemyType.Goblin;
        const enemy = ObjectPool.instance.getEnemyFromPool(enemyType);

        enemy.sprite.x = spawnPoint.x * GameConst.SQUARE_SIZE;
        enemy.sprite.y = spawnPoint.y * GameConst.SQUARE_SIZE;

        enemy.setPosition(spawnPoint, goal, this.pathfinding);

        this.enemies.push(enemy);

        this.addChild(enemy.sprite);
    }

    removeEnemy() {
        console.log('remove');
    }

    listenEventHandle() {
        EventHandle.on('startSpawn', (spawnPoint: { x: number, y: number }, goal: { x: number, y: number }, enemiesPerWave: number) => {
            this.spawnPoint = spawnPoint;
            this.goal = goal;
            this.enemiesToSpawn = enemiesPerWave;
            this.currentEnemiesCount = 0;
            this.isSpawning = true;
            this.lastSpawnTime = 0;

        });
    }

    update(deltaTime: number, currentTime: number) {
        if (this.isSpawning && this.currentEnemiesCount < this.enemiesToSpawn) {
            if (currentTime - this.lastSpawnTime >= this.spawnInterval) {
                this.createEnemy(this.spawnPoint, this.goal);
                this.currentEnemiesCount++;
                this.lastSpawnTime = currentTime;
            }
        }

        if (this.currentEnemiesCount >= this.enemiesToSpawn) {
            this.isSpawning = false;
        }

        this.enemies.forEach(enemy => {
            enemy.update(deltaTime);
        });
    }

    public getEnemies(): Enemy[] {
        return this.enemies;
    }

    // spawnEnemy() {
    //     const spawnPoint = this.spawnPoints[0];

    //     const enemyType = EnemyType.Goblin;
    //     const enemy = ObjectPool.instance.getEnemyFromPool(enemyType);

    //     enemy.sprite.x = spawnPoint.x * GameConst.SQUARE_SIZE;
    //     enemy.sprite.y = spawnPoint.y * GameConst.SQUARE_SIZE;

    //     enemy.setPosition(spawnPoint, this.goal, this.pathfinding);

    //     this.enemies.push(enemy);

    //     this.addChild(enemy.sprite);
    // }

    // update(delta: number, currentTime: number) {
    //     // Kiểm tra nếu đã đủ thời gian để spawn một kẻ địch mới
    //     if (currentTime - this.lastSpawnTime > this.spawnInterval) {
    //         this.spawnEnemy();
    //         this.lastSpawnTime = currentTime; // Cập nhật thời gian spawn cuối cùng
    //     }

    //     // Cập nhật tất cả các enemy
    //     this.enemies.forEach((enemy, index) => {
    //         enemy.update(delta);

    //         if (!enemy.isAlive) {
    //             this.removeChild(enemy.sprite);
    //             ObjectPool.instance.returnEnemyToPool(enemy.type, enemy);
    //             this.enemies.slice(index, 1);
    //         }


    //     });



    // }


}