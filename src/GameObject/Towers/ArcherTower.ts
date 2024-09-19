import { TowerType } from '../../GameBuild/TowerType';
import { Tower } from './Tower';
import { Texture } from 'pixi.js';

export class ArcherTower extends Tower {
    constructor(id: number) {
        const texture = Texture.from('archer_tower_texture');
        const damage = 10;
        const range = 100;
        const attackSpeed = 1;

        // ID và loại tower là Archer
        super(id, TowerType.Archer, texture, damage, range, attackSpeed);
    }

    attack() {
        console.log('Archer Tower shooting arrows!');
        super.attack();
    }
}