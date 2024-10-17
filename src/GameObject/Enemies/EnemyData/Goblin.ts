import { Enemy } from "../Enemy";
import { EnemyType } from "../EnemyType";

export class Goblin extends Enemy {
    constructor(id: number) {
        const hp = 15;
        const speed = 2;
        const damage = 10;
        const money = 8;

        super(id, EnemyType.Goblin, hp, speed, damage, money);
    }
}