import { TowerType } from './TowerType';
import { Tower } from './Tower';
import { Texture } from 'pixi.js';


export class TechTower extends Tower {
    constructor(id: number) {
        const damage = 8;
        const range = 90;
        const attackSpeed = 2;
        const towerDetail = "tech tower";

        // ID và loại tower là Tech
        super(id, TowerType.Tech, damage, range, attackSpeed, towerDetail);
    }
}
