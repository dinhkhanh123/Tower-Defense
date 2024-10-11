import { Enemy } from "../Enemy";
import { EnemyType } from "../EnemyType";

export class Goblin extends Enemy {
    constructor(id: number) {
        const hp = 15;
        const speed = .6;
        const damage = 1;
        const money = 8;

        super(id, EnemyType.Goblin, hp, speed, damage, money);
    }
}