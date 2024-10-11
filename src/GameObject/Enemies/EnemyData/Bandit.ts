import { Enemy } from "../Enemy";
import { EnemyType } from "../EnemyType";

export class Bandit extends Enemy {
    constructor(id: number) {
        const hp = 30;
        const speed = 0.7;
        const damage = 3;
        const money = 15;

        super(id, EnemyType.Bandit, hp, speed, damage, money);
    }
}