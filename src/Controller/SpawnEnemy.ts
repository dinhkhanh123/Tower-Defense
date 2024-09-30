import { Container, Sprite, Texture, Point, Assets } from "pixi.js";
import { Enemy } from "../GameObject/Enemies/Enemy";
import { EnemyType } from "../GameObject/Enemies/EnemyType";
import { GameConst } from "../GameBuild/GameConst";
import { ObjectPool } from "../ObjectPool/ObjectPool";
import { EventHandle } from "../GameBuild/EventHandle";

export class EnemySpawner extends Container {
    private gridMap: number[][];
    private enemies: Enemy[] = [];
    public waveNumber: number;
    public isSpawning: boolean = false;
    public currentEnemiesCount: number = 0;

    constructor(gridmap: number[][]) {
        super();
        this.gridMap = gridmap;
        this.waveNumber = 0;
  
        this.listenEventHandle();
    }

    listenEventHandle() {
        EventHandle.on('startSpawn', (spawnPoint: { x: number, y: number }, goal: { x: number, y: number }, enemiesPerWave: number) => {
            this.isSpawning = false;

            if(this.enemies.length === 0 && !this.isSpawning){
                this.spawnWave(spawnPoint,goal,enemiesPerWave);
            }
        });
    }

    createEnemy(spawnPoint: { x: number, y: number }, goal: { x: number, y: number }) {
        const enemyType = EnemyType.Goblin;
        const enemy = ObjectPool.instance.getEnemyFromPool(enemyType);

        enemy.reset();

        enemy.sprite.x = spawnPoint.x * GameConst.SQUARE_SIZE;
        enemy.sprite.y = spawnPoint.y * GameConst.SQUARE_SIZE;

        enemy.sprite.anchor.set(0.5);

        enemy.setPosition(spawnPoint, goal, this.gridMap);

        this.enemies.push(enemy);

        this.addChild(enemy.sprite);
    }

    removeEnemy(deadEnemy: Enemy) {
    const index = this.enemies.indexOf(deadEnemy);
        if (index !== -1) {    
            this.enemies.splice(index, 1);
            this.removeChild(deadEnemy.sprite);  
    
            ObjectPool.instance.returnEnemyToPool(deadEnemy.type, deadEnemy);
        }
    }

    spawnWave(spawnPoint: { x: number, y: number }, goal: { x: number, y: number }, enemiesPerWave: number) {
        this.waveNumber ++;
        this.currentEnemiesCount = 0;
        this.isSpawning = true;

        const spawnDelay = 1000;
        for (let i = 0; i < enemiesPerWave; i++) {
            setTimeout(() => {
                this.createEnemy(spawnPoint, goal);
                this.currentEnemiesCount++;
            }, i * spawnDelay + Math.random() * spawnDelay); 
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
        });     
    }

    public getEnemies(): Enemy[] {
        return this.enemies;
    }


    // if (this.isSpawning && this.currentEnemiesCount < this.enemiesToSpawn) {
    //     if (currentTime - this.lastSpawnTime >= this.spawnInterval) {
    //         this.createEnemy(this.spawnPoint, this.goal);
    //         this.currentEnemiesCount++;
    //         this.lastSpawnTime = currentTime;
    //     }
    // }



    // if (this.currentEnemiesCount >= this.enemiesToSpawn) {
    //     this.isSpawning = false;
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
    //             this.enemies.splice(index, 1);
    //         }

    //     });
    // }


}