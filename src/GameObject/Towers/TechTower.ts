
import { Texture } from 'pixi.js';
import { Tower } from './Tower';
import { TowerType } from './TowerType';


export class TechTower extends Tower {
    constructor(id: number) {
        const damage = 8;
        const range = 120;
        const attackSpeed = 3;
        const towerDetail = "Tech Tower";
        const towerName = TowerType.Tech.toString();
        const price = 200;
        const upgradeCosts = {
            2: 240,
            3: 300
        };

        super(id, TowerType.Tech, damage, range, attackSpeed, towerName, towerDetail, price,upgradeCosts);


    }
}
