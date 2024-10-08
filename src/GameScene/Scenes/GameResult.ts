import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { GameConst } from "../../GameBuild/GameConst";
import Asset from "../../GameBuild/Asset";
import { sound } from "@pixi/sound";
import { SoundManager } from "../../Controller/SoundController";

export class GameResult extends Container {
    public static instance: GameResult;
    private exitButton: Sprite;

    constructor() {
        super();
        if (!GameResult.instance) {
            GameResult.instance = this;
        }
        // Tạo background cho màn hình kết quả
        const background = new Sprite(Texture.from('bg_info'));
        background.width = 500;
        background.height = 300;
        background.x = 800 / 2;
        background.y = 600 / 2;
        background.anchor.set(0.5);

        this.addChild(background);

        // nút "Thoát"
        this.exitButton = this.createButton(600, 200);
        this.exitButton.interactive = true;
        this.exitButton.eventMode = 'static';
        this.exitButton.on('pointerdown', () => this.onExit());
        this.addChild(this.exitButton);

        // Ẩn màn hình kết quả lúc khởi tạo
        this.visible = false;
    }

    private createButton(x: number, y: number): Sprite {
        const button = new Sprite(Texture.from('btn_close'));
        button.anchor.set(0.5);
        button.scale.set(0.5);
        button.position.set(x, y);

        return button;
    }

    // Phương thức hiển thị màn hình thắng
    public showWinScreen(): void {
        const win_sprite = new Sprite(Texture.from('win_info'));
        win_sprite.anchor.set(0.5);
        win_sprite.x = 400;
        win_sprite.y = 180;

        this.addChild(win_sprite);
        this.visible = true;

        SoundManager.getInstance().play('game-sound', { sprite: 'win', loop: false });
    }

    // Phương thức hiển thị màn hình thua
    public showLoseScreen(): void {
        const lose_sprite = new Sprite(Texture.from('lost_info'));
        lose_sprite.anchor.set(0.5);
        lose_sprite.x = 400;
        lose_sprite.y = 180;

        this.addChild(lose_sprite);
        this.visible = true;

        SoundManager.getInstance().play('game-sound', { sprite: 'gamelose', loop: false });
    }


    public displayResult(isWin: boolean): void {
        this.visible = false;
        if (isWin) {
            this.showWinScreen();
        } else {
            this.showLoseScreen();
        }
    }


    // // Phương thức để thêm màn hình vào stage của game
    // public addToStage(stage: Container): void {
    //   //  stage.addChild(this.resultContainer);
    // }

    // // Phương thức xử lý khi nhấn nút "Chơi lại"
    // private onReplay(): void {
    //     console.log("Replay game");
    //     // Thực hiện các thao tác để khởi động lại game
    //     // Ví dụ: reset trạng thái game và ẩn màn hình kết quả
    //    // this.resultContainer.visible = false;
    // }

    // // Phương thức xử lý khi nhấn nút "Thoát"
    private onExit(): void {
        console.log("Exit game");
        this.visible = false;
    }
}
        // // Thêm event listener cho nút chơi lại
        // this.replayButton.interactive = true;
        // this.replayButton.buttonMode = true;
        // this.replayButton.on('pointerdown', () => this.onReplay());

        // // Thêm event listener cho nút thoát
