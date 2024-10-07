import { Enemy } from "../Enemy";
import { EnemyType } from "../EnemyType";

export class Shaman extends Enemy {
    constructor(id: number) {
        const hp = 20;
        const speed = 2;
        const damage = 2;
        const money = 10;

        super(id, EnemyType.Shaman, hp, speed, damage, money);
    }
}