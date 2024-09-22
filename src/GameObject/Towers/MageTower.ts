import { TowerType } from './TowerType';
import { Tower } from './Tower';
import { Texture } from 'pixi.js';

export class MageTower extends Tower {
    constructor(id: number) {
        const damage = 5;
        const range = 120;
        const attackSpeed = 1.5;
        const towerDetail = "mage tower";

        // ID và loại tower là Mage
        super(id, TowerType.Mage, damage, range, attackSpeed, towerDetail);
    }

    attack() {
        console.log('Mage Tower casting spells!');
    }
}