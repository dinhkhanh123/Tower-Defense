import { Projectile } from '../GameObject/Projectiles/Projectile';
import { EventHandle } from '../GameBuild/EventHandle';
import { ObjectPool } from '../ObjectPool/ObjectPool';
import { Tower } from '../GameObject/Towers/Tower';
import { Enemy } from '../GameObject/Enemies/Enemy';
import { PointData } from 'pixi.js';
export class ProjectileController {
    projectiles: Projectile[] = [];

    constructor() {
        
    }

    createProjectile(tower: Tower){
        const projectile = ObjectPool.instance.getProjectileFromPool(tower.type);
        projectile.sprite.position.set(tower.spriteTower.x,tower.spriteTower.y);
      

    }

    removeProjectile(projectile: Projectile){
        const index = this.projectiles.indexOf(projectile);
        if (index !== -1) {
            this.projectiles.splice(index, 1);
            // Xóa viên đạn khỏi màn hình
            projectile.sprite.destroy();
        }
    }

    listenEvenHandle(){
        EventHandle.on('create_projectile',(tower:Tower,posEnemy:PointData)=>{

        });
        EventHandle.on('projectile_hit', (projectile: Projectile) => {
            this.removeProjectile(projectile);
        });
    }

    update(delta:number){
        this.projectiles.forEach((projectile)=>{
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