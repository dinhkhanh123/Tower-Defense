import { TowerType } from './TowerType';
import { Tower } from './Tower';
import { Texture } from 'pixi.js';

export class CannonTower extends Tower {
    constructor(id: number) {
        const damage = 5;
        const range = 120;
        const attackSpeed = 1.5;

        // ID và loại tower là Mage
        super(id, TowerType.Cannon, damage, range, attackSpeed);
    }
}
