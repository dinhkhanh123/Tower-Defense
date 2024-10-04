import { AnimatedSprite, Application, Assets, Spritesheet, Texture } from 'pixi.js';
import { GameConst } from './GameBuild/GameConst';
import { GameBoard } from './GameScene/Scenes/GameBoard';
import { GameStart } from './GameScene/Scenes/GameStart';
import Asset from './GameBuild/Asset';
import bundles from '../assetBundle.json';
import { EventHandle } from './GameBuild/EventHandle';

(async () =>
{
    const app = new Application();
    await app.init({ background: '#1099bb', width: GameConst.GAME_WIDTH, height: GameConst.GAME_HEIGHT});

    await Assets.init({ manifest: {bundles} });

    await Assets.loadBundle('load-scene');
    //load atlas
    await Asset.loadAtlas([
        './atlas/ui_atlas.json',
        './atlas/map_atlas.json',
        './atlas/towers_atlas.json',
         './atlas/enemies_atlas.json',    
         './atlas/projectile_atlas.json', 
    ]);
    //load bitmap
    await Asset.loadBitmap('./atlas/GoldPeaberry.xml');
    await Asset.loadBitmap('./atlas/GoldPeaberry.fnt');
    await Asset.loadBitmap('./atlas/Peaberry.xml');
    await Asset.loadBitmap('./atlas/Peaberry.fnt');
    //load animation
    await Asset.loadAnimations('./atlas/orc_sprites_atlas.json');
    // const atlasData = await Assets.load('./atlas/orc_sprites_atlas.json');
    // await atlasData.parse();

 
    const gameStart = new GameStart();
    const gameBoard = new GameBoard();

    
    app.stage.addChild(gameBoard);
    EventHandle.on('startGame', () => {
        app.stage.removeChild(gameStart); 
        app.stage.addChild(gameBoard); 
    });
 
    app.ticker.add((time)=>{
        gameBoard.update(time.deltaTime);
    });
    document.body.appendChild(app.canvas);
})();


