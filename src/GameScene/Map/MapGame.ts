import { Assets, Container, Graphics, Sprite, Texture } from "pixi.js";
import { GameConst } from "../../GameBuild/GameConst";
import { EnemySpawner } from '../../Controller/SpawnEnemy';
import Asset from "../../GameBuild/Asset";
import { EventHandle } from "../../GameBuild/EventHandle";
import { TowerController } from "../../Controller/TowerController";
import { ProjectileController } from "../../Controller/ProjectileController";

export class MapGame extends Container {
    public static instance:MapGame;
    public gridMap: number[][] = [
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

    private towerController: TowerController;
    private enemySpawn: EnemySpawner;
    private projectileController: ProjectileController;
 
    private waveData: any[] = [GameConst.WAVE_1, GameConst.WAVE_2, GameConst.WAVE_3, GameConst.WAVE_4, GameConst.WAVE_5];
    private totalWaves: number = this.waveData.length; 
    private currentWave: number = 0;


    constructor() {
        super();
        MapGame.instance = this;
        this.sortableChildren = true;

        this.towerController = new TowerController(this);
        this.enemySpawn = new EnemySpawner(this);
        this.projectileController = new ProjectileController(this);

        this.init();
        this.SpawnEnemy();
    }

    init() {
        this.width = 800;
        this.height = 600;
        this.LoadMap();
    }
    update(deltaTime: number) {
        this.towerController.update(deltaTime);
        this.enemySpawn.update(deltaTime);
        this.projectileController.update(deltaTime);

        if (!this.enemySpawn.isSpawning && this.enemySpawn.getEnemies().length === 0 && this.currentWave !== 0) {
            if (this.currentWave < this.totalWaves) {
                this.startNextWave();
            }
        }
    }

    SpawnEnemy() {
        const startSpawn = new Sprite(Texture.from('btn_back'));

        startSpawn.width = 50;
        startSpawn.height = 50;
        startSpawn.x = 10;
        startSpawn.y = 50;

        startSpawn.eventMode = 'static';
        startSpawn.cursor = 'pointer';
        startSpawn.interactive = true;

        startSpawn.on('pointerdown', () => {
            this.startSpawn();
            startSpawn.visible = false; 
        });

        this.addChild(startSpawn);
    }

    startSpawn() {
        
        this.currentWave++;

        switch (this.currentWave) {
            case 1:
                EventHandle.emit('startSpawn', GameConst.WAVE_1.spawnPoints, GameConst.WAVE_1.goad, GameConst.WAVE_1.enemySpawnNumber);
                break;
            case 2:
                EventHandle.emit('startSpawn', GameConst.WAVE_2.spawnPoints, GameConst.WAVE_2.goad, GameConst.WAVE_2.enemySpawnNumber);
                break;
            case 3:
                EventHandle.emit('startSpawn', GameConst.WAVE_3.spawnPoints, GameConst.WAVE_3.goad, GameConst.WAVE_3.enemySpawnNumber);
                break;
            case 4:
                EventHandle.emit('startSpawn', GameConst.WAVE_4.spawnPoints, GameConst.WAVE_4.goad, GameConst.WAVE_4.enemySpawnNumber);
                break;
            case 5:
                EventHandle.emit('startSpawn', GameConst.WAVE_5.spawnPoints1, GameConst.WAVE_5.goad, GameConst.WAVE_5.enemySpawnNumber);
                EventHandle.emit('startSpawn', GameConst.WAVE_5.spawnPoints2, GameConst.WAVE_5.goad, GameConst.WAVE_5.enemySpawnNumber);

                break;
            default:
                break;
        }
    }

    startNextWave() {   
        this.startSpawn();
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
                        texturemap = Asset.getTexture('build');
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
                    sprite.on('pointerdown', () => EventHandle.emit('tower_slot_clicked', (sprite) ));
                }

                this.addChild(sprite);
            }
        }
    }
}