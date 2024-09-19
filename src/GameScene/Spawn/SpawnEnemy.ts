import { Container, Sprite, Texture, Point, Assets } from "pixi.js";
import { Enemy } from "../../GameObject/Enemies/Enemy";
import { Pathfinding } from "../Map/Pathfinding";

export class EnemySpawner extends Container{
    private enemies: Enemy[] = [];
    private gridMap: number[][];
    private pathfinding: Pathfinding;
    constructor(gridmap:number[][]){
        super();
        this.gridMap = gridmap;
        this.pathfinding = new Pathfinding(this.gridMap);

        this.init();
    }

   async init(){
        const enemytt = await Assets.load('./atlas/enemies_atlas.json');
        const texture = enemytt.textures['enemy1_1'];
        const start = { x: 0, y: 2}; 
        const start2 = { x: 19, y: 1}; 
        const goal = { x: 0, y: 13 }; 
        const goal2 = { x: 0, y: 13 }; 


        const path = this.pathfinding.bfs(start, goal2); 
        const path2 = this.pathfinding.bfs(start2, goal); 

        if (path && path2) {
            const enemy = new Enemy(1, texture, path);
            enemy.sprite.position.set(start.x * 40, start.y * 40);
            enemy.sprite.anchor.set(0.5);
            const enemy2 = new Enemy(2, texture, path2);
            enemy2.sprite.position.set(start2.x * 40, start2.y * 40);
            enemy2.sprite.anchor.set(0.5);

            this.enemies.push(enemy);
            this.enemies.push(enemy2);

            this.addChild(enemy.sprite);
            this.addChild(enemy2.sprite);
        }
    }

    update(delta:number){
        this.enemies.forEach(enemy => {
            enemy.update(delta);
        });
    }
}