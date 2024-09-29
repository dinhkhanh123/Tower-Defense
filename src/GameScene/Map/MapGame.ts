import { Assets, Container, Graphics, Sprite, Texture } from "pixi.js";
import { GameConst } from "../../GameBuild/GameConst";
import { EnemySpawner } from '../../Controller/SpawnEnemy';
import Asset from "../../GameBuild/Asset";
import { EventHandle } from "../../GameBuild/EventHandle";
import { TowerController } from "../../Controller/TowerController";
import { ProjectileController } from "../../Controller/ProjectileController";


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
    private projectileController: ProjectileController;
    private spawnPoints: { x: number, y: number }[] = [
        { x: 0, y: 2 },
        { x: 2, y: 2 }
    ];

    private goal: { x: number, y: number } = { x: 0, y: 13 };


    constructor() {
        super();

        this.enemySpawn = new EnemySpawner(this.gridMap);
        this.towerController = new TowerController(this, this.enemySpawn);
        this.projectileController = new ProjectileController(this);
        this.init();
        this.SpawnEnemy();

    }

    init() {
        this.width = 800;
        this.height = 600;
        this.LoadMap();

        this.addChild(this.enemySpawn);

    }
    update(deltaTime: number) {
        const currentTime = performance.now() / 1000;
        this.enemySpawn.update(deltaTime, currentTime);
        this.towerController.update(deltaTime);
        this.projectileController.update(deltaTime);
    }

    SpawnEnemy() {
        const enemiesPerWave = 5;
        const startSpawn = new Sprite(Asset.getTexture('slot_tower'));
        startSpawn.position.x = this.spawnPoints[0].x * GameConst.SQUARE_SIZE;
        startSpawn.position.y = this.spawnPoints[0].y * GameConst.SQUARE_SIZE;

        startSpawn.eventMode = 'static';
        startSpawn.cursor = 'pointer';
        startSpawn.interactive = true;

        startSpawn.on('pointerdown', () => this.startSpawn(this.spawnPoints[0], this.goal, enemiesPerWave));

        this.addChild(startSpawn);
    }

    startSpawn(spawnPoint: { x: number, y: number }, goal: { x: number, y: number }, enemiesPerWave: number) {
        EventHandle.emit('startSpawn', spawnPoint, goal, enemiesPerWave);
        console.log(spawnPoint, goal, enemiesPerWave);
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
                    sprite.cursor = 'pointer'
                    sprite.interactive = true;
                    sprite.on('pointerdown', () => this.onTowerSlotClicked(j, i, sprite));
                }

                this.addChild(sprite);
            }
        }
    }



    onTowerSlotClicked(x: number, y: number, sprite: Sprite) {
        console.log(`Tower slot clicked at: (${x}, ${y})`);
        EventHandle.emit('tower_slot_clicked', { sprite });
    }

}