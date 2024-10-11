import { Container, Sprite, Texture } from "pixi.js";
import { GameConst } from "../../GameBuild/GameConst";
import { EventHandle } from "../../GameBuild/EventHandle";
import { SoundManager } from "../../Controller/SoundController";
import { SceneManager } from "../../Controller/SceneManager";

export class GameStart extends Container {
    private progressBar!: Sprite; 
    private startButton!: Sprite; 
    private loadingTime: number = 2000; 
    private loadingAnimation: number = 0; 

    constructor() {
        super();
        this.init();
        this.progressBar.width = 300;
        this.startLoadingAnimation(); 
    }

    init() {
        this.width = GameConst.GAME_WIDTH;
        this.height = GameConst.GAME_HEIGHT;

        const bg_load = new Sprite(Texture.from('loading_bg'));
        bg_load.scale.set(1, 1.2);
        this.addChild(bg_load);

        // Khởi tạo thanh loader là một Sprite
        this.progressBar = new Sprite(Texture.from('loading_bar'));
        this.progressBar.anchor.set(0, 0.5); 
        this.progressBar.position.set(GameConst.GAME_WIDTH / 4, GameConst.GAME_HEIGHT / 2 + 105); 
        this.progressBar.width = 0; 
        this.addChild(this.progressBar);

        // Khởi tạo nút start nhưng ẩn nó đi
        this.startButton = new Sprite(Texture.from('btn_start_game'));
        this.startButton.anchor.set(0.5);
        this.startButton.position.set(GameConst.GAME_WIDTH / 2, GameConst.GAME_HEIGHT / 2 + 200);
        this.startButton.interactive = true;
        this.startButton.eventMode = 'static';
        this.startButton.cursor = 'pointer';
        this.startButton.on('pointerdown', this.onStartButtonClick.bind(this));
        this.startButton.visible = false; 
        this.addChild(this.startButton);

    }

    // Phương thức để bắt đầu hoạt ảnh thanh loading
    startLoadingAnimation() {
        const maxWidth = GameConst.GAME_WIDTH / 2; 
        const frameTime = 1000 / 60; 
        const totalFrames = this.loadingTime / frameTime; 
        const increment = maxWidth/ totalFrames;
     
        const update = () => {
            if (this.progressBar.width  < maxWidth) {
                this.progressBar.width += increment; 
                this.loadingAnimation = requestAnimationFrame(update); 
            } else {
                this.onLoadComplete(); 
            }
        };

        update(); 
    }

    // Khi việc tải hoàn tất, hiển thị nút Start Game
    onLoadComplete() {
        SoundManager.getInstance().play('game-sound',{sprite:'gametitle',loop: true,volume:.8});
        this.startButton.visible = true; // Hiển thị nút Start Game
    }

    // Xử lý khi người dùng nhấn nút Start Game
    onStartButtonClick() {
        SoundManager.getInstance().stop('game-sound');
        SoundManager.getInstance().play('game-sound',{sprite:'button',loop:false});
        this.emit('startGame'); 
    }
}
