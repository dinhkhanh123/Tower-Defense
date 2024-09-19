import { TowerType } from '../../GameBuild/TowerType';
import { Tower } from './Tower';
import { Texture } from 'pixi.js';

export class CannonTower extends Tower {
    constructor(id: number) {
        const texture = Texture.from('mage_tower_texture');
        const damage = 5;
        const range = 120;
        const attackSpeed = 1.5;

        // ID và loại tower là Mage
        super(id, TowerType.Cannon, texture, damage, range, attackSpeed);
    }

    attack() {
        console.log('Cannon Tower casting spells!');
        super.attack();
    }
}