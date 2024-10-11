import { Enemy } from "../Enemy";
import { EnemyType } from "../EnemyType";

export class Brigand extends Enemy {
    constructor(id: number) {
        const hp = 50;
        const speed = .6;
        const damage = 5;
        const money = 25;

        super(id, EnemyType.Brigand, hp, speed, damage, money);
    }
}