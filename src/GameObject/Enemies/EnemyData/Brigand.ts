import { Enemy } from "../Enemy";
import { EnemyType } from "../EnemyType";

export class Brigand extends Enemy {
    constructor(id: number) {
        const hp = 25;
        const speed = 2;
        const damage = 4;
        const money = 8;

        super(id, EnemyType.Brigand, hp, speed, damage, money);
    }
}