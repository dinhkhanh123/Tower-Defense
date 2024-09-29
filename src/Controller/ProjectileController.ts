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

        projectile.sprite.x = tower.spriteTower.x;
        projectile.sprite.y = tower.spriteTower.y;

        projectile.setTarget(enemyId, enemyPosition, tower.attackSpeed * 5, tower.damage);

        this.projectiles.push(projectile);

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


    //method tao vien dan
    // goi den pool de lay vien dan
    // set target cho vien dan, set id cua dich cho vien dan, set vi tri hien tai cho vien dan, set dame, set toc do

    // method xoa vien dan
    // tim vien dan trong list roi xoa di
    // tra vien dan ve pool
    // xoa hinh anh cua vien dan khoi game

    // EventHandle.on nhan su kien tao vien dan tu tower. no se can vi tri dong cua ene va vi tri hien tai cua tower
    // event on nhan su kien xoa vien dan: id / chinh vien dan
    // const i = this projecttiles.findIndex(pro => pro === chinh vien dan)

    //update
    // update cac projects....
}