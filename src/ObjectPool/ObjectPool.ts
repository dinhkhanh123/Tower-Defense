import { Sprite } from "pixi.js";
import { Projectile } from "../GameObject/Projectiles/Projectile";
import { Tower } from "../GameObject/Towers/Tower";
import { TowerType } from "../GameObject/Towers/TowerType";
import { TowerFactory } from '../TowerFactory/TowerFactory';
import Asset from "../GameBuild/Asset";
import { Enemy } from "../GameObject/Enemies/Enemy";
import { EnemyType } from "../GameObject/Enemies/EnemyType";

export class ObjectPool {
    public static instance: ObjectPool;
    private _towerPool: { [towerType: string]: Tower[] } = {};
    private _projectilePool: { [towerType: string]: Projectile[] } = {};
    private _enemyPool: { [enemyType: string]: Enemy[] } = {};

    constructor() {
        ObjectPool.instance = this;

        // Khởi tạo pool cho mỗi loại tháp dựa trên các giá trị của enum TowerType
        Object.values(TowerType).forEach((towerType) => {
            this._towerPool[towerType] = [];
            for (let i = 0; i < 5; i++) {
                const tower = TowerFactory.createTower(towerType);
                this._towerPool[towerType].push(tower);
            }

            this._projectilePool[towerType] = [];
            for (let i = 0; i < 5; i++) {
                const projectile = TowerFactory.createProjectile(towerType);
                this._projectilePool[towerType].push(projectile);
            }
        });

        Object.values(EnemyType).forEach((enemyType)=>{
            this._enemyPool[enemyType] = [];
            for(let i = 0; i < 5; i++){
                const enemy = TowerFactory.createEnemy(enemyType);
                this._enemyPool[enemyType].push(enemy);
            }
        });

    }

    public getTowerFromPool(towerType: TowerType): Tower {
        if (this._towerPool[towerType] ?.length <= 0) {
            const tower = TowerFactory.createTower(towerType);
            return tower;
        } else {
            return this._towerPool[towerType].pop() as Tower;
        }
    }

    public returnTowerToPool(towerType: TowerType, tower: Tower) {
        this._towerPool[towerType].push(tower);
    }

    // Hàm lấy Enemy từ pool
    public getEnemyFromPool(enemyType: EnemyType): Enemy {
        if (this._enemyPool[enemyType]?.length <= 0) {
            const enemy = TowerFactory.createEnemy(enemyType);
            return enemy;
        } else {
            return this._enemyPool[enemyType].pop() as Enemy;
        }
    }

    // Hàm trả Enemy về pool
    public returnEnemyToPool(enemyType: EnemyType, enemy: Enemy) {
        
        this._enemyPool[enemyType].push(enemy);
    }

   // Hàm lấy Projectile từ pool
    public getProjectileFromPool(towerType: TowerType): Projectile {
        if (this._projectilePool[towerType] ?.length <= 0) {
            return TowerFactory.createProjectile(towerType);
        } else {
            return this._projectilePool[towerType].pop() as Projectile;
        }
    }

    // Hàm trả Projectile về pool
    public returnProjectileToPool(towerType: TowerType, projectile: Projectile) {
        this._projectilePool[towerType].push(projectile);
    }
}