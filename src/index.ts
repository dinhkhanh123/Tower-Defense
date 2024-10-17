import { AnimatedSprite, Application, Assets, } from 'pixi.js';
import { GameConst } from './GameBuild/GameConst';
import { GameBoard } from './GameScene/Scenes/GameBoard';
import { GameStart } from './GameScene/Scenes/GameStart';
import AssetLoad from './GameBuild/Asset';
import bundles from '../assets/assetBundle.json';
import { EventHandle } from './GameBuild/EventHandle';
import { GameResult } from './GameScene/Scenes/GameResult';
import { sound } from '@pixi/sound';
import { SceneManager } from './Controller/SceneManager';

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
    await AssetLoad.loadBitmap(['./atlas/GoldPeaberry.xml', './atlas/GoldPeaberry.fnt', './atlas/Peaberry.xml', './atlas/Peaberry.fnt', './atlas/ShinyPeaberry.fnt', './atlas/ShinyPeaberry.xml', './atlas/RedPeaberry.fnt', './atlas/RedPeaberry.xml']);
    //load animation
    await AssetLoad.loadAnimations([
        './atlas/orc_sprites_atlas.json',
        './atlas/weapon_tower_ani_atlas.json',
        './atlas/ani_weapon_tower_atlas.json',
        './atlas/charactor_atlas.json',
    ]);
    // const atlasData = await Assets.load('./atlas/weapon_tower_ani_atlas.json');
    // await atlasData.parse();

    await AssetLoad.loadSoundSprite('./sounds/game-sounds.json');

    sound.add('game-sound', { url: Assets.get('game-sound').resources[0], sprites: Assets.get('game-sound').spritemap });

    // Khởi tạo SceneManager và chạy màn hình khởi đầu
    const sceneManager = SceneManager.getInstance(app);
    sceneManager.startScene();  // Bắt đầu từ GameStart scene
    const fps = app.ticker.FPS;  // Kiểm tra FPS hiện tại
    console.log("FPS: ", fps);
    console.log("deltaTime: ", app.ticker.deltaTime);
    document.body.appendChild(app.canvas);
})();


