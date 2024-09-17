import { Application, Assets, AssetsBundle, Sprite, Texture,  } from 'pixi.js';
import { GameConst } from './GameConst';
import Asset from './Asset';
import { GameBoard } from './GameScene/GameBoard';
import { GameStart } from './GameScene/GameStart';
import { EventHandle } from './EventHandle';

// Asynchronous IIFE
(async () =>
{
    const app = new Application();

    await app.init({ background: '#1099bb', width: GameConst.GAME_WIDTH, height: GameConst.GAME_HEIGHT});

    new Asset();
    await Asset.loadAssets();

    const gameStart = new GameStart();
    const gameBoard = new GameBoard();

    app.stage.addChild(gameBoard);

    // EventHandle.on('startGame', () => {
    //     app.stage.removeChild(gameStart); 
    //     app.stage.addChild(gameBoard); 
    // });

    document.body.appendChild(app.canvas);
})();


