import { TowerType } from './TowerType';
import { Tower } from './Tower';
import { Texture } from 'pixi.js';

export class MageTower extends Tower {
    constructor(id: number) {
        const damage = 5;
        const range = 100;
        const attackSpeed = 1.5;
        const towerDetail = "Mage Tower";
        const towerName = TowerType.Mage.toString();
        const price = 150;
        const upgradeCosts = {
            2: 160,  
            3: 210  
        };
        // ID và loại tower là Mage
        super(id, TowerType.Mage, damage, range, attackSpeed, towerName, towerDetail, price,upgradeCosts);

  
    }
}