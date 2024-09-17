import { Container, Graphics, Rectangle } from "pixi.js";
import { GameConst } from "../GameConst";
import gameMap from '../GameScene/mapGame.json'

export class MapGame extends Container{
    private gridMap:number[][] = [];
    private map: any;
    constructor(){
        super();
        this.init();
     
    }

    init(){
        this.width = 800;
        this.height = 600;
        this.pivot.x = this.width / 2;
        this.pivot.y = this.height / 2
        // const mapGrap = new Graphics();
        // mapGrap.rect(0, 0, 800, 600); 
        // mapGrap.fill(0xff0000);
        // this.addChild(mapGrap);
        this.LoadMap();

        this.map = gameMap;
        const grc = new Graphics();
        gameMap.forEach((val: number[], idxX:number) => {
                val.forEach((value, idxY) => {
                    grc.rect(idxX*40, idxY * 40, 40, 40);
                    switch (value) {
                        case 0:
                            grc.fill('0x86D293');
                            break;
                        case 1:
                            grc.fill('0xFDFAD9');
                            break;
                        case 2:
                            grc.fill('0x664343');
                            break;
                        case 3:
                            grc.fill('0xF5F5F5');
                            break;
                        default:
                            break;
                    }
                });
        });

        this.addChild(grc);
        
        
    }

    LoadMap(){
        const grap = new Graphics();

        const cellSize = GameConst.SQUARE_SIZE;
        // const rows = Math.floor(GameConst.GAME_HEIGHT / cellSize);
        // const cols = Math.floor(GameConst.GAME_WIDTH / cellSize);
        // this.gridMap = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

         this.gridMap = [
            [6, 0, 0, 1, 1, 0, 0, 2, 0, 3, 0, 1, 0, 0, 1, 0, 0, 2, 0, 3], // Hàng 1
            [0, 0, 0, 1, 1, 0, 0, 2, 0, 3, 1, 1, 0, 0, 1, 0, 0, 2, 0, 3], // Hàng 2
            [0, 0, 0, 1, 1, 0, 0, 2, 0, 3, 0, 0, 0, 0, 1, 0, 0, 2, 0, 3], // Hàng 3
            [0, 0, 0, 1, 1, 1, 1, 2, 0, 3, 0, 0, 1, 1, 1, 1, 1, 2, 0, 3], // Hàng 4
            [0, 0, 0, 1, 1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3], // Hàng 5
            [0, 0, 0, 0, 1, 0, 0, 2, 0, 3, 0, 1, 0, 0, 1, 0, 0, 2, 0, 3], // Hàng 6
            [0, 0, 0, 0, 1, 0, 0, 2, 0, 3, 1, 1, 0, 0, 1, 0, 0, 2, 0, 3], // Hàng 7
            [0, 0, 0, 0, 1, 0, 0, 2, 0, 3, 0, 0, 0, 0, 1, 0, 0, 2, 0, 3], // Hàng 8
            [0, 0, 0, 1, 1, 1, 1, 2, 0, 3, 0, 0, 1, 1, 1, 1, 1, 2, 0, 3], // Hàng 9
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3], // Hàng 10
            [0, 0, 0, 0, 1, 0, 0, 2, 0, 3, 0, 1, 0, 0, 1, 0, 0, 2, 0, 3], // Hàng 11
            [0, 0, 0, 0, 1, 0, 0, 2, 0, 3, 1, 1, 0, 0, 1, 0, 0, 2, 0, 3], // Hàng 12
            [0, 0, 0, 0, 1, 0, 0, 2, 0, 3, 0, 0, 0, 0, 1, 0, 0, 2, 0, 3], // Hàng 13
            [0, 1, 0, 1, 1, 1, 1, 2, 0, 3, 0, 0, 1, 1, 1, 1, 1, 2, 0, 0], // Hàng 14
            [0, 1, 0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0]  // Hàng 15
        ];

        

        for (let i = 0; i < this.gridMap.length; i++) { 
            const y = i * cellSize;  // 'y' theo hàng
            for (let j = 0; j < this.gridMap[i].length ; j++) { 
                const x = j * cellSize;  // 'x' theo cột
                const cellValue = this.gridMap[i][j]; 
                
        
                let color = 0xffffff; 
        
                // Gán màu sắc dựa trên giá trị của ô (0, 1, 2, 3,...)
                switch (cellValue) {
                    case 0: // Cỏ
                        color = 0x86D293;
                        break;
                    case 1: // Đường
                        color = 0xFDFAD9;
                        break;
                    case 2: // Tháp
                        color = 0x664343;
                        break;
                    case 3: // Vật thể khác
                        color = 0xF5F5F5;
                        break;
                }
        
                // Vẽ ô với màu tương ứng
                grap.fill(color);
                grap.rect(x, y, cellSize, cellSize);  // Đổi thứ tự 'x' và 'y'
            }
        }
        this.addChild(grap);
    }
}