import { Enemy } from "../Enemy";
import { EnemyType } from "../EnemyType";

export class Brigand extends Enemy {
    constructor(id: number) {
        const hp = 30;
        const speed = .7;
        const damage = 4;
        const money = 8;

        super(id, EnemyType.Brigand, hp, speed, damage, money);
    }
}