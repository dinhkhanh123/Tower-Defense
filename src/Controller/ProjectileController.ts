import { Projectile } from '../GameObject/Projectiles/Projectile';
import { EventHandle } from '../GameBuild/EventHandle';
import { ObjectPool } from '../ObjectPool/ObjectPool';
import { Tower } from '../GameObject/Towers/Tower';
import { Enemy } from '../GameObject/Enemies/Enemy';
import { Container, PointData } from 'pixi.js';
import { GameConst } from '../GameBuild/GameConst';
import { TowerType } from '../GameObject/Towers/TowerType';

export class ProjectileController {
    private map: Container;
    projectiles: Projectile[] = [];

    constructor(map: Container) {
        this.map = map;
        this.listenEvenHandle();
    }

    createProjectile(tower: Tower, enemyId: number, enemyPosition: PointData) {
        const projectile = ObjectPool.instance.getProjectileFromPool(tower.type);

        projectile.sprite.x = tower.spriteTower.sprite.x;
        projectile.sprite.y = tower.spriteTower.sprite.y;

        projectile.sprite.scale.set(0.5);
        projectile.sprite.anchor.set(0.5);

        projectile.setTarget(enemyId, enemyPosition, tower.attackSpeed.speed * 5, tower.damageTower.damage);

        this.projectiles.push(projectile);

        projectile.sprite.zIndex = 3;
        this.map.addChild(projectile.sprite);
    }

    removeProjectile(towerType: TowerType, projectile: Projectile) {
        const index = this.projectiles.indexOf(projectile);

        if (index !== -1) {
            // Xóa viên đạn khỏi danh sách projectiles
            this.projectiles.splice(index, 1);

            // Trả viên đạn về pool
            ObjectPool.instance.returnProjectileToPool(towerType, projectile);


            // Xóa hình ảnh khỏi game
            this.map.removeChild(projectile.sprite);
        }
    }

    listenEvenHandle() {
        EventHandle.on('create_projectile', (tower: Tower, enemyId: number, enemyPosition: PointData) => {
            this.createProjectile(tower, enemyId, enemyPosition);
        });
        EventHandle.on('projectile_hit', (towerType: TowerType, projectile: Projectile) => {
            this.removeProjectile(towerType, projectile);
        });
    }

    update(delta: number) {
        this.projectiles.forEach((projectile) => {
            projectile.update(delta);
        });
    }
}