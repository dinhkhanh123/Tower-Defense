import { Container, Graphics, Point, Rectangle, Sprite, Texture } from "pixi.js";
import { GameConst } from "../../GameBuild/GameConst";
import {Pathfinding} from "../Map/Pathfinding"
import { EnemySpawner } from '../Spawn/SpawnEnemy';
import { Enemy } from "../../GameObject/Enemies/Enemy";

export class MapGame extends Container {
    private gridMap: number[][] = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Hàng 1
        [1, 1, 1, 1, 1, 0, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1], // Hàng 2
        [1, 1, 1, 1, 1, 0, 3, 3, 3, 3, 3, 0, 2, 1, 1, 1, 1, 1, 1, 1], // Hàng 3
        [0, 0, 0, 1, 1, 0, 3, 3, 3, 3, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0], // Hàng 4
        [0, 3, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 0, 3, 3, 0], // Hàng 5
        [0, 3, 0, 1, 1, 2, 0, 0, 2, 0, 0, 2, 0, 1, 1, 0, 0, 3, 3, 0], // Hàng 6
        [0, 3, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 0], // Hàng 7
        [0, 3, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 3, 3, 0], // Hàng 8
        [0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 1, 1, 0, 0, 0, 0, 0], // Hàng 9
        [0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], // Hàng 10
        [0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 0, 3, 3, 0], // Hàng 11
        [0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 1, 1, 0, 0, 3, 3, 0], // Hàng 12
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 0], // Hàng 13
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 0], // Hàng 14
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // Hàng 15
    ];;
    private pathfinding!: Pathfinding;
    private enemySpawn: EnemySpawner;
    
    constructor() {
        super();
        this.enemySpawn = new EnemySpawner(this.gridMap);
        this.init();
             
    }

    init() {
        this.width = 800;
        this.height = 600;

        this.LoadMap();
        this.addChild(this.enemySpawn);    
    }
    update(delta:number){
        this.enemySpawn.update(delta);
       }
    
    LoadMap() {
        const grap = new Graphics();
        const cellSize = GameConst.SQUARE_SIZE;
      
        for (let i = 0; i < this.gridMap.length; i++) {
            const y = i * cellSize;
            for (let j = 0; j < this.gridMap[i].length; j++) {
                const x = j * cellSize;
                const cellValue = this.gridMap[i][j];

                grap.rect(x, y, cellSize, cellSize);
                let texturemap: Texture;
                switch (cellValue) {
                    case 0: // Cỏ
                    texturemap = Texture.from("grass");
                        break;
                    case 1: // Đường
                    texturemap = Texture.from("road");
                        break;
                    case 2: // Tháp
                    texturemap = Texture.from("tower1_1");
                        break;
                    case 3: // Vật thể khác
                    texturemap = Texture.from("road");
                        break;
                        default:
                            texturemap = Texture.EMPTY; 
                }
                const sprite = new Sprite(texturemap);
                sprite.x = x;
                sprite.y = y;
                sprite.width = cellSize;
                sprite.height = cellSize;

                this.addChild(sprite); 
            }
        }
        
    }

    

    // drawPath(path: [number, number][]) {
    //     const graphics = new Graphics();  
    //     const cellSize = GameConst.SQUARE_SIZE;
        
    //     for (let i = 0; i < path.length - 1; i++) {
    //         const [x1, y1] = path[i];
    //         const [x2, y2] = path[i + 1];
    
    //         // Di chuyển đến điểm bắt đầu của đoạn đường
    //         graphics.moveTo(x1 * cellSize + cellSize / 2, y1 * cellSize + cellSize / 2);
            
    //         // Vẽ đường tới điểm tiếp theo
    //         graphics.lineTo(x2 * cellSize + cellSize / 2, y2 * cellSize + cellSize / 2);
    //     }
    //     graphics.stroke({ width: 2, color: 0xffd900 });
    
    //     // Thêm Graphics vào Container để hiển thị
    //     this.addChild(graphics); 
    // }
}