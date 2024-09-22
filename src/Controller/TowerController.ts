import { Container, Sprite } from "pixi.js";
import { Tower } from "../GameObject/Towers/Tower";
import { TowerType } from "../GameObject/Towers/TowerType";
import { ObjectPool } from "../ObjectPool/ObjectPool";
import { GameConst } from "../GameBuild/GameConst";
import { EventHandle } from "../GameBuild/EventHandle";
import { BottomPanel } from "../GameScene/UIBottom/BottomPanel";


export class TowerController {
    public static instance: TowerController;
    private towers: Tower[] = [];
    private map: Container;
    private objectPool: ObjectPool;

    constructor(map: Container) {
        TowerController.instance = this;
        this.objectPool = new ObjectPool();
        this.map = map;
    }

    public createTower(type: TowerType, x: number, y: number) {
        const tower = this.objectPool.getTowerFromPool(type);
        tower.spriteTower.position.set(x * GameConst.SQUARE_SIZE, y * GameConst.SQUARE_SIZE);
        this.towers.push(tower);

        tower.spriteTower.interactive = true;
        tower.spriteTower.on('pointerdown', () => {
            EventHandle.emit('tower_clicked', tower);
            BottomPanel.instance.setVisibleSystem('infor');
        });
        this.map.addChild(tower.spriteTower);
    }

}