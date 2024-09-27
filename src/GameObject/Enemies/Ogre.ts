import { Enemy } from "./Enemy";
import { EnemyType } from "./EnemyType";

export default class Ogre extends Enemy{
    constructor(id:number){
        const hp = 50;
        const speed = 2;
        const damage = 10;

        super(id,EnemyType.Ogre,hp,speed,damage);
    }
}