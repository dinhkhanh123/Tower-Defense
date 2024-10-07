import { Enemy } from "../Enemy";
import { EnemyType } from "../EnemyType";

export class Goblin extends Enemy{
    constructor(id:number){
        const hp = 10;
        const speed = .5;
        const damage = 1;
        const money = 5;

        super(id,EnemyType.Goblin,hp,speed,damage,money);
    }
}