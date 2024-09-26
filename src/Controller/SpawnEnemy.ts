import { Container, Sprite, Texture, Point, Assets } from "pixi.js";
import { Enemy } from "../GameObject/Enemies/Enemy";
import { Pathfinding } from "../GameScene/Map/Pathfinding";
import Asset from "../GameBuild/Asset";
import { EnemyType } from "../GameObject/Enemies/EnemyType";
import { GameConst } from "../GameBuild/GameConst";

export class EnemySpawner extends Container {
    private enemies: Enemy[] = [];
    private gridMap: number[][];
    private pathfinding: Pathfinding;
    private spawnInterval:number = 500;

    private spawnPoints: { x: number, y: number }[] = [
        { x: 0, y: 2 },
        { x: 19, y: 2 }
    ]; 
    private goal: { x: number, y: number } = { x: 0, y: 13 }; 



    constructor(gridmap: number[][]) {
        super();
        this.gridMap = gridmap;
        this.pathfinding = new Pathfinding(this.gridMap);
 
        this.spawnEnemy(this.spawnPoints[0]);
        // this.spawnEnemy(this.spawnPoints[1]);
        
    }



    spawnEnemy(startPoint:{ x: number, y: number }) {

        // Tạo enemy và truyền pathfinding để tự tìm đường
        const enemyType = EnemyType.Goblin;
        const newEnemy = new Enemy(this.enemies.length + 1, enemyType, startPoint, this.goal, this.pathfinding);
 
        newEnemy.sprite.position.set(startPoint.x * GameConst.SQUARE_SIZE , startPoint.y * GameConst.SQUARE_SIZE);
    
        newEnemy.sprite.anchor.set(0.5);

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