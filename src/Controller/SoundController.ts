import { sound } from "@pixi/sound";
import { GameSave } from "../GameBuild/GameSave";
import { Sprite, Texture } from "pixi.js";
import AssetLoad from "../GameBuild/Asset";

export class SoundManager {
    private static instance: SoundManager;
    private isMuted: boolean;
    private volume: number;
    public soundButton!: Sprite; 
    
    private constructor() {
        this.isMuted = GameSave.loadSoundSetting();
        this.volume = GameSave.loadVolumeSetting();
        this.createSoundButton(); 

    }

    public static getInstance(): SoundManager {
        if (!SoundManager.instance) {
            SoundManager.instance = new SoundManager();
        }
        return SoundManager.instance;
    }

    // Phát âm thanh với cài đặt hiện tại
    public play(soundKey: string, options?: { sprite?: string, loop?: boolean, volume?: number }): void {
        if (this.isMuted) return; 
        
        sound.play(soundKey, {
            sprite: options?.sprite,
            loop: options?.loop ?? false,
            volume: 1
        });
    }

    // Dừng âm thanh
    public stop(soundKey: string): void {
        sound.stop(soundKey);
    }

    // Bật hoặc tắt âm thanh và thay đổi hình ảnh nút âm thanh
    public toggleSound(): void {
        this.isMuted = !this.isMuted;
        GameSave.saveSoundSetting(this.isMuted);
        this.updateSoundButtonTexture(); 
        if(!this.isMuted){
            this.play('game-sound', { sprite: 'battlemusic',loop:true,volume:.8});
        }else{
            this.stop('game-sound');
        }
    }

    // Điều chỉnh âm lượng
    public setVolume(newVolume: number): void {
        this.volume = Math.max(0, Math.min(1, newVolume));
        GameSave.saveVolumeSetting(this.volume);
    }

    // Tạo sprite cho nút âm thanh
    private createSoundButton(): void {
        this.soundButton = new Sprite(Texture.from(this.isMuted ? 'mute' : 'sound'));
        this.soundButton.interactive = true;
        this.soundButton.eventMode = 'static';
        this.soundButton.scale.set(.6); 
        this.soundButton.position.set(760,5);

        
        // Khi người dùng nhấn vào nút, bật/tắt âm thanh
        this.soundButton.on('pointerdown', () => this.toggleSound());
    }

    // Cập nhật hình ảnh của nút âm thanh
    private updateSoundButtonTexture(): void {
        this.soundButton.texture = AssetLoad.getTexture(this.isMuted ? 'mute' : 'sound');
    }

    // Lấy sprite nút âm thanh để thêm vào map
    public getSoundButton(): Sprite {
        return this.soundButton;
    }
}
