
import { Texture } from 'pixi.js';
import { Tower } from './Tower';
import { TowerType } from './TowerType';


export class TechTower extends Tower {
    constructor(id: number) {
        const damage = 4;
        const range = 100;
        const attackSpeed = 1.2;
        const towerDetail = "Tech Tower";
        const towerName = TowerType.Tech.toString();
        const price = 150;
        const upgradeCosts = {
            2: 190,
            3: 240
        };

        super(id, TowerType.Tech, damage, range, attackSpeed, towerName, towerDetail, price,upgradeCosts);
    }
}
