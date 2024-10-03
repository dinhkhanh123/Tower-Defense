import { Container, } from "pixi.js";
import { GameConst } from "../../GameBuild/GameConst";
import { MapGame } from '../Map/MapGame';
import { BottomPanel } from '../UIBottom/BottomPanel';
import { Enemy } from "../../GameObject/Enemies/Enemy";
import { RightPanel } from "../UIRight/RightPanel";
import { PlayerController } from "../../Controller/PlayerController";

export class GameBoard extends Container {
    private mapGame;
    private rightPan;
    private bottomPanel;
    private playerController;
    
    constructor() {
        super();
        this.playerController = new PlayerController(1000,10,1);

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