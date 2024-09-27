import { Container, Sprite, Texture, Point, Assets } from "pixi.js";
import { Enemy } from "../GameObject/Enemies/Enemy";
import { Pathfinding } from "../GameScene/Map/Pathfinding";
import Asset from "../GameBuild/Asset";
import { EnemyType } from "../GameObject/Enemies/EnemyType";
import { GameConst } from "../GameBuild/GameConst";
import { ObjectPool } from "../ObjectPool/ObjectPool";

export class EnemySpawner extends Container {
    private gridMap: number[][];
    private pathfinding: Pathfinding;
    private enemies: Enemy[] = [];
    private spawnInterval: number = 5;
    private lastSpawnTime: number = 0;

    private spawnPoints: { x: number, y: number }[] = [
        { x: 0, y: 2 },
        { x: 2, y: 2 }
    ];
    private goal: { x: number, y: number } = { x: 0, y: 13 };

    constructor(gridmap: number[][]) {
        super();
        this.gridMap = gridmap;
        this.pathfinding = new Pathfinding(this.gridMap);

    }

    spawnEnemy() {
        const spawnPoint = this.spawnPoints[0];

        const enemyType = EnemyType.Goblin;
        const enemy = ObjectPool.instance.getEnemyFromPool(enemyType);

        enemy.sprite.x = spawnPoint.x * GameConst.SQUARE_SIZE;
        enemy.sprite.y = spawnPoint.y * GameConst.SQUARE_SIZE;

        enemy.setPosition(spawnPoint, this.goal, this.pathfinding);

        this.enemies.push(enemy);

        this.addChild(enemy.sprite);
    }

    update(delta: number,currentTime: number) {
    // Kiểm tra nếu đã đủ thời gian để spawn một kẻ địch mới
    if (currentTime - this.lastSpawnTime > this.spawnInterval) {
        this.spawnEnemy();
        this.lastSpawnTime = currentTime; // Cập nhật thời gian spawn cuối cùng
    }

    // Cập nhật tất cả các enemy
    this.enemies.forEach(enemy => {
        enemy.update(delta);
    });

    // Loại bỏ các enemy đã chết
    this.enemies = this.enemies.filter(enemy => enemy.isAlive);
    }

    public getEnemies(): Enemy[] {
        return this.enemies;
    }
}