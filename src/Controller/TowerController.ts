import { Container, Sprite } from "pixi.js";
import { Tower } from "../GameObject/Towers/Tower";
import { TowerType } from "../GameObject/Towers/TowerType";
import { ObjectPool } from "../ObjectPool/ObjectPool";
import { GameConst } from "../GameBuild/GameConst";
import { EventHandle } from "../GameBuild/EventHandle";
import { BottomPanel } from "../GameScene/UIBottom/BottomPanel";
import { Enemy } from "../GameObject/Enemies/Enemy";
import { EnemySpawner } from "./SpawnEnemy";


export class TowerController {
    public static instance: TowerController;
    private map: Container;
    private towers: Tower[] = [];
    private objectPool: ObjectPool;
    private enemySpawner: EnemySpawner;

    constructor(map: Container,enemySpawner: EnemySpawner) {
        TowerController.instance = this;
        this.objectPool = new ObjectPool();
        this.map = map;
        this.enemySpawner = enemySpawner;
    }

    public createTower(type: TowerType,baseSprite:Sprite) {
        const tower = this.objectPool.getTowerFromPool(type);
        baseSprite.removeAllListeners();
        tower.baseTower = baseSprite;
        tower.spriteTower.position = baseSprite.position;
        this.towers.push(tower);

        // const option = { sprite: tower.spriteTower, }
        baseSprite.on('pointerdown', () => {
            EventHandle.emit('tower_clicked', tower);
            BottomPanel.instance.setVisibleSystem('infor');
        });

        this.map.addChild(tower.spriteTower);
    }
    
    public update(deltaTime: number){
        this.towers.forEach(tower => {
            this.enemySpawner.getEnemies().forEach(enemy => {
                if (tower.isInRange(enemy)) {
                    console.log('enemy'+`${tower.id}`);
                }
            });
        });
    }
}