import { Assets, Sprite, Texture } from 'pixi.js';
import bundles from '../../assetBundle.json';

export default class Asset {
    static texture: any = {};
    static async loadAssets() {
        // Cập nhật manifest cho Assets
        await Assets.init({ manifest: { bundles } });

        // Hoặc tải tài nguyên trước khi sử dụng với await
        await Assets.loadBundle('game-scene');
        await Assets.loadBundle('load-map');
        await Assets.loadBundle('game-enemy');


    };
}