import { Application } from 'pixi.js';
import { GameConst } from './GameBuild/GameConst';
import { GameBoard } from './GameScene/Scenes/GameBoard';
import { GameStart } from './GameScene/Scenes/GameStart';
import Asset from './GameBuild/Asset';

(async () =>
{
    const app = new Application();
    await app.init({ background: '#1099bb', width: GameConst.GAME_WIDTH, height: GameConst.GAME_HEIGHT});

    await Asset.loadAtlas([
         './atlas/enemies_atlas.json',    
        './atlas/map_atlas.json',
         './atlas/towers_atlas.json'       
    ]);

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


