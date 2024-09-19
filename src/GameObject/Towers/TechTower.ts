import { TowerType } from '../../GameBuild/TowerType';
import { Tower } from './Tower';
import { Texture } from 'pixi.js';

export class TechTower extends Tower {
    constructor(id: number) {
        const texture = Texture.from('tech_tower_texture');
        const damage = 8;
        const range = 90;
        const attackSpeed = 2;

        // ID và loại tower là Tech
        super(id, TowerType.Tech, texture, damage, range, attackSpeed);
    }

    attack() {
        console.log('Tech Tower firing lasers!');
        super.attack();
    }
}