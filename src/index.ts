import { Application, Assets, AssetsBundle, Sprite, Texture,  } from 'pixi.js';
import { GameConst } from './GameConst';
import Asset from './Asset';



// Asynchronous IIFE
(async () =>
{
    // Khởi tạo PixiJS application.
    const app = new Application();

    // Cài đặt app với một số thuộc tính.
    await app.init({ background: '#1099bb', width: GameConst.GAME_WIDTH, height: GameConst.GAME_HEIGHT});

    new Asset();
    await Asset.loadAssets();
    const sprite = new Sprite(Texture.from('background'));

    const x = GameConst.GAME_WIDTH/sprite.width;
    const y= GameConst.GAME_HEIGHT/sprite.height ;

    sprite.scale.set(x,y);

    // const bundles: AssetsBundle[] = asset;
    // await Assets.init({ manifest: {bundles}});
    // Assets.backgroundLoadBundle(bundles.map(i => i.name));
    // Assets.loadBundle('tupe').then(data => {
    //     console.log(data)
    // });
    

    
  
    app.stage.addChild(sprite);
    // Thả canvas của app vào body của HTML.
    document.body.appendChild(app.canvas);
})();
