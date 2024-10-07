import { AnimatedSprite, Application, Assets, Spritesheet, Texture } from 'pixi.js';
import { GameConst } from './GameBuild/GameConst';
import { GameBoard } from './GameScene/Scenes/GameBoard';
import { GameStart } from './GameScene/Scenes/GameStart';
import AssetLoad from './GameBuild/Asset';
import bundles from '../assetBundle.json';
import { EventHandle } from './GameBuild/EventHandle';
import { GameResult } from './GameScene/Scenes/GameResult';
import { sound } from '@pixi/sound';

(async () => {
    const app = new Application();
    await app.init({ background: '#1099bb', width: GameConst.GAME_WIDTH, height: GameConst.GAME_HEIGHT });

    await Assets.init({ manifest: { bundles } });

    await Assets.loadBundle('load-scene');
    //load atlas
    await AssetLoad.loadAtlas([
        './atlas/ui_atlas.json',
        './atlas/map_atlas.json',
        './atlas/towers_atlas.json',
        './atlas/enemies_atlas.json',
        './atlas/projectile_atlas.json',
    ]);
    //load bitmap
    await AssetLoad.loadBitmap('./atlas/GoldPeaberry.xml');
    await AssetLoad.loadBitmap('./atlas/GoldPeaberry.fnt');
    await AssetLoad.loadBitmap('./atlas/Peaberry.xml');
    await AssetLoad.loadBitmap('./atlas/Peaberry.fnt');
    //load animation
    // Load multiple animation files
    await AssetLoad.loadAnimations([
        './atlas/orc_sprites_atlas.json',
        './atlas/weapon_tower_ani_atlas.json',
        './atlas/ani_weapon_tower_atlas.json',
    ]);
    // const atlasData = await Assets.load('./atlas/weapon_tower_ani_atlas.json');
    // await atlasData.parse();

    const sprites = await AssetLoad.loadSoundSprite('./sounds/game-sounds.json'); 
    
    sound.add('game-sound', {url: Assets.get('game-sound').resources[0], sprites: Assets.get('game-sound').spritemap});
    sound.play('game-sound', {sprite:'win'});
    const gameStart = new GameStart();
    const gameBoard = new GameBoard();
    const gameResult = new GameResult();

    app.stage.addChild(gameBoard);

    app.stage.addChild(gameResult);
    EventHandle.on('startGame', () => {
        app.stage.removeChild(gameStart);
        app.stage.addChild(gameBoard);
    });

    app.ticker.add((time) => {
        gameBoard.update(time.deltaTime);
    });
    document.body.appendChild(app.canvas);
})();


