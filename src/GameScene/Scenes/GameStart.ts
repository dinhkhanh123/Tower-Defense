import { Container, Sprite, Texture } from "pixi.js";
import { GameConst } from "../../GameBuild/GameConst";
import { EventHandle } from "../../GameBuild/EventHandle";
import { SoundManager } from "../../Controller/SoundController";

export class GameStart extends Container {
    private progressBar!: Sprite; // Sprite thanh tiến trình
    private startButton!: Sprite; // Nút Start Game
    private loadingTime: number = 2000; // Thời gian tải trong milliseconds
    private loadingAnimation: number = 0; // Biến để theo dõi hoạt ảnh thanh loading

    constructor() {
        super();
        this.init();
        this.progressBar.width = 300;
        this.startLoadingAnimation(); // Bắt đầu hoạt ảnh thanh loading
    }

    init() {
        this.width = GameConst.GAME_WIDTH;
        this.height = GameConst.GAME_HEIGHT;

        const bg_load = new Sprite(Texture.from('loading_bg'));
        bg_load.scale.set(1, 1.2);
        this.addChild(bg_load);

        // Khởi tạo thanh loader là một Sprite
        this.progressBar = new Sprite(Texture.from('loading_bar'));
        this.progressBar.anchor.set(0, 0.5); // Đặt anchor để thanh mở rộng từ trái sang phải
        this.progressBar.position.set(GameConst.GAME_WIDTH / 4, GameConst.GAME_HEIGHT / 2 + 105); // Vị trí của thanh loader
        this.progressBar.width = 0; // Bắt đầu với độ dài 0 (0%)
        this.addChild(this.progressBar);

        // Khởi tạo nút start nhưng ẩn nó đi
        this.startButton = new Sprite(Texture.from('btn_start_game'));
        this.startButton.anchor.set(0.5);
        this.startButton.position.set(GameConst.GAME_WIDTH / 2, GameConst.GAME_HEIGHT / 2 + 200);
        this.startButton.interactive = true;
        this.startButton.eventMode = 'static';
        this.startButton.cursor = 'pointer';
        this.startButton.on('pointerdown', this.onStartButtonClick.bind(this));
        this.startButton.visible = false; // Ẩn nút cho đến khi tải xong
        this.addChild(this.startButton);

    }

    // Phương thức để bắt đầu hoạt ảnh thanh loading
    startLoadingAnimation() {
        const maxWidth = GameConst.GAME_WIDTH / 2; // Chiều rộng tối đa của thanh loader
        const frameTime = 1000 / 60; // Thời gian giữa mỗi khung hình (60 FPS)
        const totalFrames = this.loadingTime / frameTime; // Tổng số khung hình cho toàn bộ quá trình tải
        const increment = maxWidth/ totalFrames; // Tăng chiều rộng mỗi khung hình

        // Hàm cập nhật hoạt ảnh
        const update = () => {
            if (this.progressBar.width  < maxWidth) {
                this.progressBar.width += increment; // Tăng chiều rộng của thanh
                this.loadingAnimation = requestAnimationFrame(update); // Gọi lại hàm cập nhật
            } else {
                this.onLoadComplete(); // Khi thanh đầy, gọi hàm hoàn tất
            }
        };

        update(); // Bắt đầu hoạt ảnh
    }

    // Khi việc tải hoàn tất, hiển thị nút Start Game
    onLoadComplete() {
        SoundManager.getInstance().play('game-sound',{sprite:'gametitle',loop: true,volume:.8});
        this.startButton.visible = true; // Hiển thị nút Start Game
    }

    // Xử lý khi người dùng nhấn nút Start Game
    onStartButtonClick() {
        SoundManager.getInstance().stop('game-sound');
        EventHandle.emit('startGame');
    }
}
