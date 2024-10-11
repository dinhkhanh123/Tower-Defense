import { Container, Sprite, Texture } from "pixi.js";
import { Tower } from "../GameObject/Towers/Tower";
import { TowerType } from "../GameObject/Towers/TowerType";
import { ObjectPool } from "../ObjectPool/ObjectPool";
import { EventHandle } from "../GameBuild/EventHandle";
import { BottomPanel } from "../GameScene/UIBottom/BottomPanel";
import { EnemySpawner } from "./SpawnEnemy";
import AssetLoad from "../GameBuild/Asset";
import { PlayerController } from "./PlayerController";
import { GameConst } from "../GameBuild/GameConst";

export class TowerController {
    public static instance: TowerController;
    private map: Container;
    private towers: Tower[] = [];
    private objectPool: ObjectPool;
    private isGameOver: boolean = false;

    constructor(map: Container) {
        TowerController.instance = this;
        this.objectPool = new ObjectPool();
        this.map = map;

        this.listenEvenHandle();
    }

    listenEvenHandle() {
        EventHandle.on('disable_all_interactions', () => {
            this.disableTower();
        });
    }

    //tạo một tháp mới.
    public createTower(type: TowerType, baseSprite: Sprite) {
        const tower = this.objectPool.getTowerFromPool(type);
        tower.resetTower();
        this.map.removeChild(baseSprite);
        baseSprite.removeAllListeners();

        tower.baseTower = baseSprite;
        tower.spriteTower.sprite.position = baseSprite.position;
        tower.spriteAniTower.position.x = baseSprite.position.x + GameConst.SQUARE_SIZE / 2;
        tower.spriteAniTower.position.y = baseSprite.position.y + 5;

        this.towers.push(tower);
        tower.spriteTower.sprite.interactive = true;
        tower.spriteTower.sprite.eventMode = 'static';
        tower.spriteTower.sprite.cursor = 'pointer';
        tower.spriteTower.sprite.on('pointerdown', () => {
            if (this.isGameOver) return;
            const optionTower = {
                id: tower.id,
                level: tower.levelTower.level,
                towerName: tower.towerName,
                towerDetail: tower.towerDetail,
                damage: tower.damageTower.damage,
                speedAttack: tower.attackSpeed.speed,
                sprite: tower.imageTower.image,
                priceTower: tower.priceTower.price,
                upgradePrice: tower.upgradeCosts,
                range: {
                    range: tower.rangeTower.range,
                    x: tower.baseTower.position.x,
                    y: tower.baseTower.position.y
                }
            };

            EventHandle.emit('tower_clicked', optionTower);
            BottomPanel.instance.setVisibleSystem('infor');
        });

        tower.spriteTower.sprite.zIndex = GameConst.Z_INDEX_5;
        tower.spriteAniTower.zIndex = GameConst.Z_INDEX_4;
        this.map.addChild(tower.spriteTower.sprite);
        this.map.addChild(tower.spriteAniTower);
    }

    //xóa tower.
    public removeTower(tower: Tower, price: number) {
        const index = this.towers.indexOf(tower);
        if (index !== -1) {
            this.towers.splice(index, 1);
            this.map.removeChild(tower.spriteTower.sprite);
            this.map.removeChild(tower.spriteAniTower);

            PlayerController.instance.addMoney(price);
            ObjectPool.instance.returnTowerToPool(tower.type, tower);
        }

        const slotSprite = new Sprite(AssetLoad.getTexture('build'));
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
        if (this.isGameOver) return;
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
                    tower.spriteAniTower.gotoAndStop(0);
                } else {
                    tower.Attack(currentTarget, deltaTime);
                    tower.spriteAniTower.play();
                }
            }
        });
    }

    disableTower() {
        this.isGameOver = true;
    }
}
