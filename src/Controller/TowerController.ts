import { Container, Sprite } from "pixi.js";
import { Tower } from "../GameObject/Towers/Tower";
import { TowerType } from "../GameObject/Towers/TowerType";
import { ObjectPool } from "../ObjectPool/ObjectPool";
import { EventHandle } from "../GameBuild/EventHandle";
import { BottomPanel } from "../GameScene/UIBottom/BottomPanel";
import { EnemySpawner } from "./SpawnEnemy";
import Asset from "../GameBuild/Asset";


export class TowerController {
    public static instance: TowerController;
    private map: Container;
    private towers: Tower[] = [];
    private objectPool: ObjectPool;

    constructor(map: Container) {
        TowerController.instance = this;
        this.objectPool = new ObjectPool();
        this.map = map;
    }

    public createTower(type: TowerType, baseSprite: Sprite) {
        const tower = this.objectPool.getTowerFromPool(type);
        tower.resetTower();

        baseSprite.removeAllListeners();
        tower.baseTower = baseSprite;
        tower.spriteTower.sprite.position = baseSprite.position;
        this.towers.push(tower);

        baseSprite.on('pointerdown', () => {
            const optionTower = {
                id: tower.id,
                level: tower.levelTower.level,
                towerName: tower.towerName,
                towerDetail: tower.towerDetail,
                damage: tower.damageTower.damage,
                speedAttack: tower.attackSpeed.speed,
                sprite: tower.imageTower.image,
                range: {
                    range: tower.rangeTower.range,
                    x: tower.baseTower.position.x,
                    y: tower.baseTower.position.y
                }
            };
            EventHandle.emit('tower_clicked', optionTower);
            BottomPanel.instance.setVisibleSystem('infor');
        });

        tower.spriteTower.sprite.zIndex = 1;
        this.map.addChild(tower.spriteTower.sprite);
    }

    public removeTower(tower: Tower) {
        const index = this.towers.indexOf(tower);
        if (index !== -1) {
            this.towers.splice(index, 1);
            this.map.removeChild(tower.spriteTower.sprite);
            ObjectPool.instance.returnTowerToPool(tower.type, tower);
        }


        const slotSprite = new Sprite(Asset.getTexture('build'));
        tower.baseTower.texture = slotSprite.texture;
        slotSprite.position = tower.baseTower.position;
        slotSprite.eventMode = 'static';
        slotSprite.cursor = 'pointer';
        slotSprite.interactive = true;
        slotSprite.on('pointerdown', () => EventHandle.emit('tower_slot_clicked', (slotSprite)));
        this.map.addChild(slotSprite);
        BottomPanel.instance.setVisibleSystem('skill');
    }

    public update(deltaTime: number) {
        // Cập nhật tất cả các tháp
        this.towers.forEach(tower => {
            // Kiểm tra xem có kẻ địch nào trong tầm bắn
            const enemiesInRange = EnemySpawner.instance.getEnemies().filter(enemy =>
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
