import { TowerType } from './TowerType';
import { Tower } from './Tower';
import { Texture } from 'pixi.js';

export class CannonTower extends Tower {
    constructor(id: number) {
        const damage = 6;
        const range = 120;
        const attackSpeed = 0.9;
        const towerDetail = "Canon Tower";
        const towerName = TowerType.Cannon.toString();
        const price = 200;
        const upgradeCosts = {
            2: 240,  
            3: 290  
        };
        // ID và loại tower là Mag
        super(id, TowerType.Cannon, damage, range, attackSpeed, towerName, towerDetail, price,upgradeCosts);
    }
}
