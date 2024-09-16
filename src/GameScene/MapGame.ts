import { Container, Graphics, Rectangle } from "pixi.js";
import { GameConst } from "../GameConst";

export class MapGame extends Container{
    private gridMap:number[][] = [];
    constructor(){
        super();
        this.init();
     
    }

    init(){
        this.width = 800;
        this.height = 600;

        const mapGrap = new Graphics();
        mapGrap.rect(0, 0, 800, 600); 
        mapGrap.fill(0xff0000);

        this.addChild(mapGrap);
        this.LoadMap();
    }

    LoadMap(){
        const grap = new Graphics();

        const cellSize = GameConst.SQUARE_SIZE;
        // const rows = GameConst.GAME_HEIGHT/ cellSize;
        // const cols = GameConst.GAME_WIDTH/ cellSize;
        
         this.gridMap = [
            [0, 1, 0, 0, 1, 0, 0, 2, 0, 3, 0, 1, 0, 0, 1, 0, 0, 2, 0, 3], // Hàng 1
            [1, 1, 0, 0, 1, 0, 0, 2, 0, 3, 1, 1, 0, 0, 1, 0, 0, 2, 0, 3], // Hàng 2
            [0, 0, 0, 0, 1, 0, 0, 2, 0, 3, 0, 0, 0, 0, 1, 0, 0, 2, 0, 3], // Hàng 3
            [0, 0, 1, 1, 1, 1, 1, 2, 0, 3, 0, 0, 1, 1, 1, 1, 1, 2, 0, 3], // Hàng 4
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3], // Hàng 5
            [0, 1, 0, 0, 1, 0, 0, 2, 0, 3, 0, 1, 0, 0, 1, 0, 0, 2, 0, 3], // Hàng 6
            [1, 1, 0, 0, 1, 0, 0, 2, 0, 3, 1, 1, 0, 0, 1, 0, 0, 2, 0, 3], // Hàng 7
            [0, 0, 0, 0, 1, 0, 0, 2, 0, 3, 0, 0, 0, 0, 1, 0, 0, 2, 0, 3], // Hàng 8
            [0, 0, 1, 1, 1, 1, 1, 2, 0, 3, 0, 0, 1, 1, 1, 1, 1, 2, 0, 3], // Hàng 9
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3], // Hàng 10
            [0, 1, 0, 0, 1, 0, 0, 2, 0, 3, 0, 1, 0, 0, 1, 0, 0, 2, 0, 3], // Hàng 11
            [1, 1, 0, 0, 1, 0, 0, 2, 0, 3, 1, 1, 0, 0, 1, 0, 0, 2, 0, 3], // Hàng 12
            [0, 0, 0, 0, 1, 0, 0, 2, 0, 3, 0, 0, 0, 0, 1, 0, 0, 2, 0, 3], // Hàng 13
            [0, 0, 1, 1, 1, 1, 1, 2, 0, 3, 0, 0, 1, 1, 1, 1, 1, 2, 0, 3], // Hàng 14
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3]  // Hàng 15
        ];

        for (let i = 0; i < this.gridMap.length; i++) {
            for (let j = 0; j < this.gridMap[i].length; j++) {
                const cellValue = this.gridMap[i][j];
                let color = 0xffffff; // Màu mặc định

                // Gán màu sắc dựa trên giá trị của ô (0, 1, 2, 3,...)
                switch (cellValue) {
                    case 0: // Ô màu bất kỳ
                        color = 0xcccccc;
                        break;
                    case 1: // Đường
                        color = 0x00ff00;
                        break;
                    case 2: // Tháp
                        color = 0x0000ff;
                        break;
                    case 3: // Vật thể khác
                        color = 0xff0000;
                        break;
                }

                // Vẽ ô với màu tương ứng
                grap.fill(color);
                grap.rect(j * cellSize, i * cellSize, cellSize, cellSize); 
               
            }
        }
        this.addChild(grap);
    }
}