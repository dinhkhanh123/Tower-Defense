import { Container, Graphics, Sprite, Texture, Text, TextStyle, } from "pixi.js";
import { GameConst } from "../GameBuild/GameConst";
import { EventHandle } from "../GameBuild/EventHandle";

export class GameStart extends Container {

    constructor() {
        super();
        this.init();
    }

    init() {
        this.width = GameConst.GAME_WIDTH;
        this.height = GameConst.GAME_HEIGHT;

        //bacground
        const background = new Sprite(Texture.from('background'));
        background.scale.set(GameConst.GAME_WIDTH / background.width, GameConst.GAME_HEIGHT / background.height);
        this.addChild(background);

        // Create start button
        const startButton = new Graphics();
        startButton.rect(0, 0, 200, 50);
        startButton.fill(0x0000ff);
        startButton.x = (GameConst.GAME_WIDTH - 200) / 2;
        startButton.y = (GameConst.GAME_HEIGHT + 100) / 2;
        startButton.interactive = true;

        startButton.on('pointerdown', this.onStartButtonClick.bind(this));

        this.addChild(startButton);

        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: 0xfffff,
            dropShadow: {
                color: '#000000',
                blur: 4,
                angle: Math.PI / 6,
                distance: 6,
            },
        });
        const startGame = new Text({
            text: 'Start Game',
            style,
        });

        startGame.x = (GameConst.GAME_WIDTH - 200) / 2;
        startGame.y = (GameConst.GAME_HEIGHT + 100) / 2;
        this.addChild(startGame);
    }

    onStartButtonClick() {
        EventHandle.emit('startGame');
    }
}