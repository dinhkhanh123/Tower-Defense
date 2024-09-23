import { Container, Sprite, Texture, Point, Assets } from "pixi.js";
import { Enemy } from "../GameObject/Enemies/Enemy";
import { Pathfinding } from "../GameScene/Map/Pathfinding";
import Asset from "../GameBuild/Asset";
import { EnemyType } from "../GameObject/Enemies/EnemyType";

export class EnemySpawner extends Container {
    private enemies: Enemy[] = [];
    private gridMap: number[][];
    private pathfinding: Pathfinding;

    private start: { x: number, y: number } = { x: 0, y: 2 }; // Start point
    private goal: { x: number, y: number } = { x: 0, y: 13 }; // End point



    constructor(gridmap: number[][]) {
        super();
        this.gridMap = gridmap;
        this.pathfinding = new Pathfinding(this.gridMap);
        this.spawnEnemy();
    }



    spawnEnemy() {

        // Tạo enemy và truyền pathfinding để tự tìm đường
        const enemyType = EnemyType.Goblin;
        const newEnemy = new Enemy(this.enemies.length + 1, enemyType, this.start, this.goal, this.pathfinding);
        newEnemy.sprite.position.set(this.start.x * 40, this.start.y * 40);
        newEnemy.sprite.anchor.set(0.5);
        console.log(newEnemy);
        // Thêm enemy vào danh sách và container
        this.enemies.push(newEnemy);
        this.addChild(newEnemy.sprite);


    }

    update(delta: number) {
        // Cập nhật tất cả các enemy
        this.enemies.forEach(enemy => {
            enemy.update(delta);

        });


    }

    public getEnemies(): Enemy[] {
        return this.enemies;
    }


}