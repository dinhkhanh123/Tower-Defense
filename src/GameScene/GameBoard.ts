import { Container, } from "pixi.js";
import { GameConst } from "../GameConst";
import { MapGame } from "./Map/MapGame";
import { RightPanel } from "./RightPanel";
import { BottomPanel } from './BottomPanel';

export class GameBoard extends Container {

    constructor() {
        super();
        this.init()
    }

    init() {
        const mapGame = new MapGame();
        this.addChild(mapGame);

        const rightPan = new RightPanel();
        this.addChild(rightPan);

        const bottomPanel = new BottomPanel();
        this.addChild(bottomPanel);
    }
}