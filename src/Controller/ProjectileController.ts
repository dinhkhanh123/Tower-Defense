import { Projectile } from '../GameObject/Projectiles/Projectile';
import { EventHandle } from '../GameBuild/EventHandle';
import { ObjectPool } from '../ObjectPool/ObjectPool';
import { Tower } from '../GameObject/Towers/Tower';
import { Enemy } from '../GameObject/Enemies/Enemy';
import { AnimatedSprite, Container, PointData } from 'pixi.js';
import { GameConst } from '../GameBuild/GameConst';
import { TowerType } from '../GameObject/Towers/TowerType';
import AssetLoad from '../GameBuild/Asset';

export class ProjectileController {
    private map: Container;
    private projectiles: Projectile[] = [];
    private enemyPos!: PointData;

    constructor(map: Container) {
        this.map = map;

        this.listenEvenHandle();
    }

    listenEvenHandle() {
        EventHandle.on('create_projectile', (tower: Tower, enemyId: number, enemyPosition: PointData) => {
            this.createProjectile(tower, enemyId, enemyPosition);
            this.enemyPos = enemyPosition;
        });
        EventHandle.on('projectile_hit', (towerType: TowerType, projectile: Projectile) => {
            this.removeProjectile(towerType, projectile);
        });
    }

    createProjectile(tower: Tower, enemyId: number, enemyPosition: PointData) {
        const projectile = ObjectPool.instance.getProjectileFromPool(tower.type);

        projectile.sprite.x = tower.spriteAniTower.x;
        projectile.sprite.y = tower.spriteAniTower.y;

        projectile.sprite.scale.set(0.5);
        projectile.sprite.anchor.set(0.5);

        projectile.setTarget(enemyId, enemyPosition, tower.attackSpeed.speed, tower.damageTower.damage);

        this.projectiles.push(projectile);

        projectile.sprite.zIndex = 3;
        this.map.addChild(projectile.sprite);
    }

    removeProjectile(towerType: TowerType, projectile: Projectile) {
        const index = this.projectiles.indexOf(projectile);

        if (index !== -1) {
            // Xóa viên đạn khỏi danh sách projectiles
            this.projectiles.splice(index, 1);

            ObjectPool.instance.returnProjectileToPool(towerType, projectile);

            this.map.removeChild(projectile.sprite);

            // Tạo animation khi đạn trúng mục tiêu
            const weaponAni = new AnimatedSprite(AssetLoad.getAnimation(`${towerType}_weapon_ani`));

            // Đặt vị trí của animation tại vị trí mà viên đạn trúng mục tiêu
            weaponAni.x = projectile.sprite.x;
            weaponAni.y = projectile.sprite.y - 10;


            this.map.addChild(weaponAni);
            weaponAni.animationSpeed = 0.5;
            weaponAni.loop = false;
            // weaponAni._anchor.set(0.5);
            weaponAni.zIndex = 5;
            weaponAni.play();

            // Kiểm tra khi animation đến frame cuối cùng
            weaponAni.onFrameChange = () => {
                if (weaponAni.currentFrame === weaponAni.totalFrames - 1) {
                    this.map.removeChild(weaponAni);
                    weaponAni.destroy();
                }
            };

        }
    }

    update(delta: number) {
        this.projectiles.forEach((projectile) => {
            projectile.update(delta);
        });
    }
}