import { TowerType } from './TowerType';
import { Tower } from './Tower';
import { Texture } from 'pixi.js';

export class ArcherTower extends Tower {
    constructor(id: number) {
        const damage = 10;
        const range = 100;
        const attackSpeed = 1;
        const towerDetail = "archer tower";

        // ID và loại tower là Archer
        super(id, TowerType.Archer, damage, range, attackSpeed, towerDetail);
    }
}
