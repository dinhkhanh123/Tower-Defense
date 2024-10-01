import { Enemy } from "./Enemy";
import { EnemyType } from "./EnemyType";

export class Goblin extends Enemy{
    constructor(id:number){
        const hp = 30;
        const speed = 1;
        const damage = 5;

        super(id,EnemyType.Goblin,hp,speed,damage);
    }
}