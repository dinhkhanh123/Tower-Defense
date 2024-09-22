import { Assets, Container, Graphics, Point, Rectangle, Sprite, Texture } from "pixi.js";
import { GameConst } from "../../GameBuild/GameConst";
import { EnemySpawner } from '../Spawn/SpawnEnemy';
import Asset from "../../GameBuild/Asset";
import { EventHandle } from "../../GameBuild/EventHandle";
import { TowerController } from "../../Controller/TowerController";
import { TowerType } from "../../GameObject/Towers/TowerType";

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
    ];

    private enemySpawn: EnemySpawner;
    private towerController: TowerController;

    private towerSlots: { x: number, y: number, hasTower: boolean }[] = [];
    constructor() {
        super();

        this.enemySpawn = new EnemySpawner(this.gridMap);
        this.towerController = new TowerController(this);
        this.init();
    }

    init() {
        this.width = 800;
        this.height = 600;
        this.LoadMap();

        this.addChild(this.enemySpawn);

    }
    update(delta: number) {
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
                        texturemap = Asset.getTexture('grass');
                        break;
                    case 1: // Đường
                        texturemap = Asset.getTexture('road');
                        break;
                    case 2: // Tháp
                        texturemap = Asset.getTexture('slot_tower');
                        break;
                    case 3: // Vật thể khác
                        texturemap = Asset.getTexture('road');
                        break;
                    default:
                        texturemap = Texture.EMPTY;
                }
                const sprite = new Sprite(texturemap);
                sprite.x = x;
                sprite.y = y;
                sprite.width = cellSize;
                sprite.height = cellSize;

                if (cellValue === 2) {

                    sprite.eventMode = 'static';
                    sprite.interactive = true;
                    sprite.on('pointerdown', () => this.onTowerSlotClicked(j, i));
                }

                this.addChild(sprite);
            }
        }
    }

    onTowerSlotClicked(x: number, y: number) {
        console.log(`Tower slot clicked at: (${x}, ${y})`);
        EventHandle.emit('tower_slot_clicked', { x, y });
    }
}