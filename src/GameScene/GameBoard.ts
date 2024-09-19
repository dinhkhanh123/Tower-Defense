import { Container, } from "pixi.js";
import { GameConst } from "../GameBuild/GameConst";
import { MapGame } from './Map/MapGame';
import { RightPanel } from "../GameScene/Scenes/RightPanel";
import { BottomPanel } from './Scenes/BottomPanel';
import { Enemy } from "../GameObject/Enemies/Enemy";

export class GameBoard extends Container {
    private mapGame;
    private rightPan;
    private bottomPanel;
    constructor() {
        super();
        this.mapGame = new MapGame();    
        this.rightPan = new RightPanel();
        this.bottomPanel = new BottomPanel();

        this.init();
    }

    init() {
        this.addChild(this.mapGame);
        this.addChild(this.rightPan);
        this.addChild(this.bottomPanel);
    }

    update(time:number){
        this.mapGame.update(time);
    }

}