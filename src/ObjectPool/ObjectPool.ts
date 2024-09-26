import { Sprite } from "pixi.js";
import { Projectile } from "../GameObject/Projectiles/Projectile";
import { Tower } from "../GameObject/Towers/Tower";
import { TowerType } from "../GameObject/Towers/TowerType";
import { TowerFactory } from "../TowerFactory/TowerFactory";
import Asset from "../GameBuild/Asset";

export class ObjectPool {
    public static instance: ObjectPool;
    private _towerPool: { [towerType: string]: Tower[] } = {};
    private _projectilePool: { [towerType: string]: Projectile[] } = {};
    
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
            for (let i = 0; i < 10; i++) {
                const projectile = this.createProjectile(towerType);
                this._projectilePool[towerType].push(projectile);
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

    // Hàm tạo viên đạn dựa trên loại tháp
    private createProjectile(towerType: TowerType): Projectile {
        // Tạo viên đạn với texture hoặc thuộc tính khác nhau tùy theo loại tháp
        //const sprite = new Sprite(Asset.getTexture(`Projectile_${towerType}`)); // Texture tùy vào loại tháp
        const sprite = new Sprite(Asset.getTexture('slot_tower')); 

        return new Projectile(sprite,towerType);
    }

        // Hàm lấy Projectile từ pool
        public getProjectileFromPool(towerType: TowerType): Projectile {
            if (this._projectilePool[towerType]?.length <= 0) {
                return this.createProjectile(towerType); 
            } else {
                return this._projectilePool[towerType].pop() as Projectile;
            }
        }
    
        // Hàm trả Projectile về pool
        public returnProjectileToPool(towerType: TowerType, projectile: Projectile) {
            this._projectilePool[towerType].push(projectile);
        }
}