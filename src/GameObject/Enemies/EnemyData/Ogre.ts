import { Enemy } from "../Enemy";
import { EnemyType } from "../EnemyType";

export default class Ogre extends Enemy{
    constructor(id:number){
        const hp = 50;
        const speed = .5;
        const damage = 5;
        const money = 20;

        super(id,EnemyType.Ogre,hp,speed,damage,money);
    }
}