import { Enemy } from "../Enemy";
import { EnemyType } from "../EnemyType";

export class Bandit extends Enemy {
    constructor(id: number) {
        const hp = 15;
        const speed = 2;
        const damage = 3;
        const money = 12;

        super(id, EnemyType.Bandit, hp, speed, damage, money);
    }
}