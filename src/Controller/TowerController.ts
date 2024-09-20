import { Container, Sprite } from "pixi.js";
import { Tower } from "../GameObject/Towers/Tower";
import { TowerType } from "../GameObject/Towers/TowerType";
import { ObjectPool } from "../ObjectPool/ObjectPool";


export class TowerController {
    private towers: Tower[] = [];

    constructor(){
    }

    public createTower(type: TowerType, x: number, y: number) {
        const tower = ObjectPool.instance.getTowerFromPool(type);


        tower.sprite.position.set(x, y);
           

        this.towers.push(tower);
    }
}