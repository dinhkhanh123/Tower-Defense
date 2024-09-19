import { TowerType } from '../../GameBuild/TowerType';
import { Tower } from './Tower';
import { Texture } from 'pixi.js';

export class MageTower extends Tower {
    constructor(id: number) {
        const texture = Texture.from('mage_tower_texture');
        const damage = 5;
        const range = 120;
        const attackSpeed = 1.5;

        // ID và loại tower là Mage
        super(id, TowerType.Mage, texture, damage, range, attackSpeed);
    }

    attack() {
        console.log('Mage Tower casting spells!');
        super.attack();
    }
}