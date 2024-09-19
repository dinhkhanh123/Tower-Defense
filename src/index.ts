import { Application } from 'pixi.js';
import { GameConst } from './GameBuild/GameConst';
import { GameBoard } from './GameScene/GameBoard';
import { GameStart } from './GameScene/Scenes/GameStart';



// Asynchronous IIFE
(async () =>
{
    const app = new Application();

    await app.init({ background: '#1099bb', width: GameConst.GAME_WIDTH, height: GameConst.GAME_HEIGHT});


    const gameStart = new GameStart();
    const gameBoard = new GameBoard();

    app.stage.addChild(gameBoard);

    // EventHandle.on('startGame', () => {
    //     app.stage.removeChild(gameStart); 
    //     app.stage.addChild(gameBoard); 
    // });

    app.ticker.add((time)=>{
        gameBoard.update(time.deltaTime);
    });
    document.body.appendChild(app.canvas);
})();


