import { TowerType } from './TowerType';
import { Tower } from './Tower';
import { Texture } from 'pixi.js';

export class CannonTower extends Tower {
    constructor(id: number) {
        const damage = 5;
        const range = 120;
        const attackSpeed = 1;
        const towerDetail = "Canon Tower";
        const towerName = TowerType.Cannon.toString();
        const price = 250;
        const upgradeCosts = {
            2: 300,  
            3: 350  
        };
        // ID và loại tower là Mag
        super(id, TowerType.Cannon, damage, range, attackSpeed, towerName, towerDetail, price,upgradeCosts);
    }
}
