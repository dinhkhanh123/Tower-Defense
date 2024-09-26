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
    private projectiles: Projectile[] = [];
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

    public addProjectile(projectile: Projectile) {
        this.projectiles.push(projectile);
        this.map.addChild(projectile.sprite);
    }

    public update(deltaTime: number) {
        const currentTime = performance.now() / 1000;
        // Cập nhật tất cả các tháp
        this.towers.forEach(tower => {
            // Kiểm tra xem có kẻ địch nào trong tầm bắn
            const enemies = this.enemySpawner.getEnemies().filter(enemy => tower.isInRange(enemy));

            if (enemies.length > 0) {
                // Tấn công kẻ địch đầu tiên trong tầm
                tower.Attack(enemies[0], currentTime);
            }
        });

        // Cập nhật vị trí của các viên đạn
        this.projectiles.forEach((projectile, index) => {
            projectile.move(deltaTime);

            // Nếu viên đạn đã "destroy", xóa nó khỏi mảng
            if (projectile.sprite.destroyed) {
                this.projectiles.splice(index, 1);
            }
        });
    }


}
