import { TowerType } from './TowerType';
import { Tower } from './Tower';
import { Texture } from 'pixi.js';


export class TechTower extends Tower {
    constructor(id: number) {
        const damage = 8;
        const range = 120;
        const attackSpeed = 3;
        const towerDetail = "Tech Tower";
        const towerName = TowerType.Tech.toString();
        const price = 200;

        // ID và loại tower là Tech
        super(id, TowerType.Tech, damage, range, attackSpeed, towerName, towerDetail, price);
    }
}
