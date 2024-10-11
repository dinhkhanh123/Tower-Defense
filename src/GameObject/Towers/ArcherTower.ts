import { TowerType } from './TowerType';
import { Tower } from './Tower';
import { Texture } from 'pixi.js';

export class ArcherTower extends Tower {
    constructor(id: number) {
        const damage = 2;
        const range = 90;
        const attackSpeed = 0.8;
        const towerDetail = "Archer Tower";
        const towerName = TowerType.Archer.toString();
        const price = 70;
        const upgradeCosts = {
            2: 110,  
            3: 160  
        };
 
        // ID và loại tower là Archer
        super(id, TowerType.Archer, damage, range, attackSpeed, towerName, towerDetail, price,upgradeCosts);
    }
}
