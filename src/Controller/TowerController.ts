import { Container, Sprite } from "pixi.js";
import { Tower } from "../GameObject/Towers/Tower";
import { TowerType } from "../GameObject/Towers/TowerType";
import { ObjectPool } from "../ObjectPool/ObjectPool";
import { GameConst } from "../GameBuild/GameConst";
import { EventHandle } from "../GameBuild/EventHandle";
import { BottomPanel } from "../GameScene/UIBottom/BottomPanel";
import { Enemy } from "../GameObject/Enemies/Enemy";
import { EnemySpawner } from "./SpawnEnemy";
import { Projectile } from "../GameObject/Projectiles/Projectile";
import Asset from "../GameBuild/Asset";

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
    }

    public createTower(type: TowerType, baseSprite: Sprite) {
        const tower = this.objectPool.getTowerFromPool(type);

        baseSprite.removeAllListeners();
        tower.baseTower = baseSprite;
        tower.spriteTower.position = baseSprite.position;
        this.towers.push(tower);

        baseSprite.on('pointerdown', () => {
            EventHandle.emit('tower_clicked', tower);
            BottomPanel.instance.setVisibleSystem('infor');
        });

        this.map.addChild(tower.spriteTower);
    }

    public update(deltaTime: number) {
        const currentTime = performance.now() / 1000;
        // Cập nhật tất cả các tháp
        this.towers.forEach(tower => {
            // Kiểm tra xem có kẻ địch nào trong tầm bắn
            const enemiesInRange = this.enemySpawner.getEnemies().filter(enemy =>
                tower.isInRange(enemy.getUpdatePositionEnemy())
            );

            enemiesInRange.forEach(enemy => {
                if (!tower.target.includes(enemy)) {
                    tower.target.push(enemy);
                }
            });

            if (tower.target.length > 0) {
                let currentTarget = tower.target[0];
                if (!tower.isInRange(currentTarget.getUpdatePositionEnemy())) {
                    tower.target.shift();
                } else {
                    tower.Attack(currentTarget.id, currentTarget.getUpdatePositionEnemy(), currentTime);
                }
            }
        });
    }
}
