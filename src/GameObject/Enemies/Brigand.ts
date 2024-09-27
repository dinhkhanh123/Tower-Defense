import { Enemy } from "./Enemy";
import { EnemyType } from "./EnemyType";

export class Brigand extends Enemy{
    constructor(id:number){
        const hp = 25;
        const speed = 3;
        const damage = 5;

        super(id,EnemyType.Brigand,hp,speed,damage);
    }
}