import { TowerType } from './TowerType';
import { Tower } from './Tower';
import { Texture } from 'pixi.js';

export class CannonTower extends Tower {
    constructor(id: number) {
        const damage = 5;
        const range = 130;
        const attackSpeed = 1;
        const towerDetail = "Canon Tower";
        const towerName = TowerType.Cannon.toString();

        // ID và loại tower là Mag
        super(id, TowerType.Cannon, damage, range, attackSpeed,towerName, towerDetail);
    }
}
