import { Container, Sprite, Texture, Point, Assets, AnimatedSprite } from "pixi.js";
import { Enemy } from "../GameObject/Enemies/Enemy";
import { EnemyType } from "../GameObject/Enemies/EnemyType";
import { GameConst } from "../GameBuild/GameConst";
import { ObjectPool } from "../ObjectPool/ObjectPool";
import { EventHandle } from "../GameBuild/EventHandle";
import { MapGame } from "../GameScene/Map/MapGame";
import { PlayerController } from "./PlayerController";
import { GameResult } from "../GameScene/Scenes/GameResult";

export class EnemySpawner {
    public static instance: EnemySpawner;
    private map: Container;
    private gridMap: number[][];
    private enemies: Enemy[] = [];
    public waveNumber: number;
    public isSpawning: boolean = false;
    private isGameEnded: boolean = false; 
    public currentEnemiesCount: number = 0;

    constructor(map: Container) {
        EnemySpawner.instance = this;
        this.map = map;
        this.gridMap = MapGame.instance.gridMap;
        this.waveNumber = 0;    
    }

    createEnemy(spawnPoint: { x: number, y: number }, goal: { x: number, y: number },enemyType:EnemyType[]) {
        if (this.isGameEnded) return;
        const enemy = ObjectPool.instance.getEnemyFromPool(enemyType[Math.floor(Math.random() * enemyType.length)]);

        enemy.reset();

        enemy.sprite.x = spawnPoint.x * GameConst.SQUARE_SIZE;
        enemy.sprite.y = spawnPoint.y * GameConst.SQUARE_SIZE;


        enemy.setPosition(spawnPoint, goal, this.gridMap);

        this.enemies.push(enemy);

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

    spawnWave(spawnPoints: { x: number, y: number }[], goal: { x: number, y: number }, enemiesPerWave: number, enemyType: EnemyType[]) {
        this.waveNumber++;
        this.currentEnemiesCount = 0;
        this.isSpawning = true;

        const spawnDelay = 500;

        for (let i = 0; i < enemiesPerWave; i++) {
            spawnPoints.forEach(spawnPoint => {
                setTimeout(() => {
                    this.createEnemy(spawnPoint, goal,enemyType);
                    this.currentEnemiesCount++;
                }, i * spawnDelay + Math.random() * spawnDelay);
            });
        }

        setTimeout(() => {
            this.isSpawning = false;
        }, enemiesPerWave * spawnDelay);
    }


    update(deltaTime: number) {
        if (this.isGameEnded) return;
        this.enemies.forEach((enemy) => {
            enemy.update(deltaTime);

            if (!enemy.isAlive || enemy.hasReachedGoal()) {
                this.removeEnemy(enemy);
            }

            if (!enemy.isAlive) {
                PlayerController.instance.addMoney(enemy.money);
            }

            if (enemy.hasReachedGoal()) {
                if(PlayerController.instance.hpPlayer > 0){
                    PlayerController.instance.takeDamage(enemy.damage);
                }
                
                if(PlayerController.instance.hpPlayer <= 0){
                    GameResult.instance.displayResult(false); 
                     this.endGame();  
                }
                
            }
        });

        this.updateEnemyZIndex() ;

        if (!this.isSpawning && this.getEnemies().length === 0 && this.waveNumber !== 0) {
            EventHandle.emit('start_spawn');
        }

        if (!this.isSpawning && this.getEnemies().length === 0 && this.waveNumber === PlayerController.instance.totalWaves) {
            GameResult.instance.displayResult(true);
            this.endGame(); 
        }

    }

    private updateEnemyZIndex() {
        this.enemies.forEach((enemy) => {
            enemy.sprite.zIndex = 2;
        });
    
        // Cập nhật zIndex cho từng enemy dựa trên tọa độ
        for (let i = 0; i < this.enemies.length; i++) {
            const enemy1 = this.enemies[i];
            for (let j = 0; j < this.enemies.length; j++) {
                const enemy2 = this.enemies[j];
                if (enemy1 !== enemy2) {
                    // Nếu enemy1 nằm dưới enemy2 (có y lớn hơn), tăng zIndex
                    if (enemy1.sprite.y > enemy2.sprite.y || 
                       (enemy1.sprite.y === enemy2.sprite.y && enemy1.sprite.x > enemy2.sprite.x)) {
                        enemy1.sprite.zIndex++;
                    }
                }
            }
        }}

    public getEnemies(): Enemy[] {
        return this.enemies;
    }

        // Phương thức để ngừng tất cả hoạt động khi game kết thúc
        public endGame(): void {
            this.isGameEnded = true;  // Đánh dấu game đã kết thúc
            // Dừng logic cho quái vật, nút và các thành phần khác
            this.enemies.forEach(enemy => {
                enemy.sprite.interactive = false;  // Vô hiệu hóa tương tác của quái
            });
            EventHandle.emit('disable_all_interactions');  // Tắt tất cả sự kiện tương tác
        }
}