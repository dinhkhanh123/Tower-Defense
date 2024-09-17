import { Container, Graphics, Rectangle } from "pixi.js";
import { GameConst } from "../../GameConst";

export class MapGame extends Container {
    private gridMap: number[][] = [];
    constructor() {
        super();
        this.init();
    }

    init() {
        this.width = 800;
        this.height = 600;
        this.pivot.x = this.width / 2;
        this.pivot.y = this.height / 2

        this.LoadMap();

    }

    LoadMap() {
        const grap = new Graphics();
        const cellSize = GameConst.SQUARE_SIZE;
        this.gridMap = [
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
        ];

        for (let i = 0; i < this.gridMap.length; i++) {
            const y = i * cellSize;
            for (let j = 0; j < this.gridMap[i].length; j++) {
                const x = j * cellSize;
                const cellValue = this.gridMap[i][j];

                grap.rect(x, y, cellSize, cellSize);
                let color = 0xffffff;
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
                grap.fill(color);
            }
        }
        this.addChild(grap);
    }
}