import { Assets, Texture } from 'pixi.js';

export default class Asset {
    static texture: Record<string, Texture> = {};
    static animations: Record<string, any> = {};

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

    static async loadBitmap(bitmapFile: string) {
        await Assets.load(bitmapFile);
    }

    // Sửa đổi để load nhiều file animation JSON
    static async loadAnimations(animationFiles: string[]) {
        for (const animationFile of animationFiles) {
            const data = await Assets.load(animationFile);

            // Lặp qua từng animation và lưu vào Asset.animations mà không bị ghi đè
            Object.keys(data.animations).forEach(animationName => {
                if (!Asset.animations[animationName]) {
                    Asset.animations[animationName] = data.animations[animationName];
                } else {
                    console.warn(`Animation ${animationName} already exists. Skipping.`);
                }
            });
        }
    }

    // Hàm để lấy texture theo tên
    static getTexture(name: string): Texture {
        const texture = this.texture[name];
        if (!texture) {
            throw new Error(`Texture ${name} not found in atlas.`);
        }
        return texture;
    }

    static getAnimation(name: string) {
        const animation = this.animations[name];
        if (!animation) {
            throw new Error(`Animation ${name} not found.`);
        }
        return animation;
    }
}