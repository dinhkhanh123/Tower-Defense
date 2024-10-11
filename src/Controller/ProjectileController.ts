import { Projectile } from '../GameObject/Projectiles/Projectile';
import { EventHandle } from '../GameBuild/EventHandle';
import { ObjectPool } from '../ObjectPool/ObjectPool';
import { Tower } from '../GameObject/Towers/Tower';
import { Enemy } from '../GameObject/Enemies/Enemy';
import { AnimatedSprite, Container } from 'pixi.js';
import { TowerType } from '../GameObject/Towers/TowerType';
import AssetLoad from '../GameBuild/Asset';
import { GameConst } from '../GameBuild/GameConst';

export class ProjectileController {
    private map: Container;
    private projectiles: Projectile[] = [];

    constructor(map: Container) {
        this.map = map;

        this.listenEvenHandle();
    }

    //lắng nghe các sự kiện tạo và va chạm của đạn
    listenEvenHandle() {
        EventHandle.on('create_projectile', (tower: Tower, target: Enemy) => {
            this.createProjectile(tower, target);
        });
        EventHandle.on('projectile_hit', (towerType: TowerType, projectile: Projectile) => {
            this.removeProjectile(towerType, projectile);
        });
    }

    //tạo viên đạn mới khi tháp bắn vào mục tiêu
    createProjectile(tower: Tower, target: Enemy) {
        const projectile = ObjectPool.instance.getProjectileFromPool(tower.type);

        projectile.sprite.x = tower.spriteAniTower.x;
        projectile.sprite.y = tower.spriteAniTower.y;

        projectile.sprite.scale.set(0.5);
        projectile.sprite.anchor.set(0.5);

        projectile.setTarget(target, tower.attackSpeed.speed, tower.damageTower.damage);

        this.projectiles.push(projectile);

        projectile.sprite.zIndex = GameConst.Z_INDEX_3;
        this.map.addChild(projectile.sprite);
    }

    //xử lý khi viên đạn trúng mục tiêu
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
            weaponAni.x = projectile.sprite.x - 30;
            weaponAni.y = projectile.sprite.y - 30;


            this.map.addChild(weaponAni);
            weaponAni.animationSpeed = GameConst.SPEED_ANI;
            weaponAni.loop = false;
            weaponAni.zIndex = GameConst.Z_INDEX_1;
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