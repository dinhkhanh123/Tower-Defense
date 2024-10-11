import { TowerType } from './TowerType';
import { Tower } from './Tower';
import { Texture } from 'pixi.js';

export class MageTower extends Tower {
    constructor(id: number) {
        const damage = 3;
        const range = 100;
        const attackSpeed = 1;
        const towerDetail = "Mage Tower";
        const towerName = TowerType.Mage.toString();
        const price = 110;
        const upgradeCosts = {
            2: 150,  
            3: 200  
        };
        // ID và loại tower là Mage
        super(id, TowerType.Mage, damage, range, attackSpeed, towerName, towerDetail, price,upgradeCosts);
    }
}