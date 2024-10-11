import { Enemy } from "../Enemy";
import { EnemyType } from "../EnemyType";

export default class Ogre extends Enemy {
    constructor(id: number) {
        const hp = 10;
        const speed = 0.5;
        const damage = 1;
        const money = 5;

        super(id, EnemyType.Ogre, hp, speed, damage, money);
    }
}