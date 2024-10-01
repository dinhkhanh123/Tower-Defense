import { Container, Sprite } from "pixi.js";
import { Tower } from "../GameObject/Towers/Tower";
import { TowerType } from "../GameObject/Towers/TowerType";
import { ObjectPool } from "../ObjectPool/ObjectPool";
import { EventHandle } from "../GameBuild/EventHandle";
import { BottomPanel } from "../GameScene/UIBottom/BottomPanel";
import { EnemySpawner } from "./SpawnEnemy";


export class TowerController {
    public static instance: TowerController;
    private map: Container;
    private towers: Tower[] = [];
    private objectPool: ObjectPool;
    private enemySpawner: EnemySpawner;

    constructor(map: Container, enemySpawner: EnemySpawner) {
        TowerController.instance = this;
        this.objectPool = new ObjectPool();
        this.map = map;
        this.enemySpawner = enemySpawner;

       // this.listenEventHandle();
    }

    listenEventHandle(){
        EventHandle.on('create_tower',(type:TowerType,sprite:Sprite) => this.createTower(type,sprite));
    }

    public createTower(type: TowerType, baseSprite: Sprite) {
        const tower = this.objectPool.getTowerFromPool(type);

        baseSprite.removeAllListeners();
        tower.baseTower = baseSprite;
        tower.spriteTower.position = baseSprite.position;
        this.towers.push(tower);

        baseSprite.on('pointerdown', () => {
            const optionTower = {
                id:tower.id,
                level: tower.level,
                towerName: tower.towerName,
                towerDetail: tower.towerDetail,
                damage: tower.damage,
                speedAttack: tower.attackSpeed,
                sprite: tower.imageTower,
                range: {
                    range: tower.range,
                    x: tower.baseTower.position.x,
                    y: tower.baseTower.position.y
                }
            };
            EventHandle.emit('tower_clicked', optionTower);
            BottomPanel.instance.setVisibleSystem('infor');
        });

        this.map.addChild(tower.spriteTower);
    }

    public update(deltaTime: number) {
        // Cập nhật tất cả các tháp
        this.towers.forEach(tower => {
            // Kiểm tra xem có kẻ địch nào trong tầm bắn
            const enemiesInRange = this.enemySpawner.getEnemies().filter(enemy =>
                enemy.isAlive && tower.isInRange(enemy.getUpdatePositionEnemy())
            );

            enemiesInRange.forEach(enemy => {
                if (!tower.target.includes(enemy)) {
                    tower.target.push(enemy);
                }
            });

            if (tower.target.length > 0) {
                let currentTarget = tower.target[0];
                if (!currentTarget.isAlive || !tower.isInRange(currentTarget.getUpdatePositionEnemy())) {
                    tower.target.shift();
                } else {
                    tower.Attack(currentTarget.id, currentTarget.getUpdatePositionEnemy(), deltaTime);
                }
            }
        });
    }
}
