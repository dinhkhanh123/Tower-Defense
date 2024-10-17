import { Container, } from "pixi.js";
import { MapGame } from '../Map/MapGame';
import { BottomPanel } from '../UIBottom/BottomPanel';
import { RightPanel } from "../UIRight/RightPanel";
import { PlayerController } from "../../Controller/PlayerController";
import { SoundManager } from "../../Controller/SoundController";

export class GameBoard extends Container {
    public static instance: GameBoard;
    private mapGame;
    private rightPan;
    private bottomPanel;
    private playerController;
    public isGameOver = false;

    constructor() {
        super();
        if (!GameBoard.instance) {
            GameBoard.instance = this;
        }
        this.playerController = new PlayerController(200, 10);

        this.mapGame = new MapGame();
        this.rightPan = new RightPanel();
        this.bottomPanel = new BottomPanel();

        const soundManager = SoundManager.getInstance();
        const soundButton = soundManager.getSoundButton();

        this.init();
        this.addChild(soundButton);
    }

    init() {
        this.addChild(this.mapGame);
        this.addChild(this.rightPan);
        this.addChild(this.bottomPanel);
    }

    update(time: number) {
        if (!this.isGameOver) {
            this.mapGame.update(time);
        }
    }
}