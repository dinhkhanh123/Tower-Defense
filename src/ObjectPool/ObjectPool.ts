import { Tower } from "../GameObject/Towers/Tower";
import { TowerType } from "../GameObject/Towers/TowerType";
import { TowerFactory } from "../TowerFactory/TowerFactory";

export class ObjectPool {
    public static instance: ObjectPool;
    private _towerPool: { [towerType: string]: Tower[] } = {};

    constructor() {
        ObjectPool.instance = this;

        // Khởi tạo pool cho mỗi loại tháp dựa trên các giá trị của enum TowerType
        Object.values(TowerType).forEach((towerType) => {
            this._towerPool[towerType] = [];
            for (let i = 0; i < 5; i++) {
                const tower = TowerFactory.createTower(towerType);
                this._towerPool[towerType].push(tower);
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
}