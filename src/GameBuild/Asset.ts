import { Assets, Texture } from 'pixi.js';

export default class Asset {
    static texture: Record<string, Texture> = {};

    // Hàm để load các file atlas JSON và lưu các texture
    static async loadAtlas(atlasFiles: string[]) {
        for (const atlasFile of atlasFiles) {
            // Load file atlas JSON
            const atlas = await Assets.load(atlasFile);

            // Lấy tên của các textures từ atlas JSON
            const textureNames = Object.keys(atlas.textures);

            // Lưu các texture vào Asset.texture
            textureNames.forEach(name => {
                Asset.texture[name] = atlas.textures[name];
            });
        }
        
    }

    static async loadBitmap(bitmapFile: string){
        await Assets.load(bitmapFile);
    }

    // Hàm để lấy texture theo tên
    static getTexture(name: string): Texture {
        const texture = this.texture[name];
        if (!texture) {
            throw new Error(`Texture ${name} not found in atlas.`);
        }
        return texture;
    }
}