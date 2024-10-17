import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { GameConst } from "../../GameBuild/GameConst";
import Asset from "../../GameBuild/Asset";
import { sound } from "@pixi/sound";
import { SoundManager } from "../../Controller/SoundController";
import { EventHandle } from "../../GameBuild/EventHandle";
import { GameBoard } from "./GameBoard";
import { SceneManager } from "../../Controller/SceneManager";

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
        this.exitButton = this.createButton(600, 200, 'btn_close');
        this.exitButton.interactive = true;
        this.exitButton.eventMode = 'static';
        this.exitButton.on('pointerdown', () => this.onExit());
        this.addChild(this.exitButton);

        // Ẩn màn hình kết quả lúc khởi tạo
        this.visible = false;

    }

    private createButton(x: number, y: number, texture: string): Sprite {
        const button = new Sprite(Texture.from(texture));
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

        const btn_restart = this.createButton(400, 350, 'btn_restart');
        btn_restart.width = 150;
        btn_restart.height = 60;
        btn_restart.interactive = true;
        btn_restart.eventMode = 'static';
        btn_restart.cursor = 'pointer';
        btn_restart.on('pointerdown', () => {
            this.onRestart();
        });

        this.addChild(lose_sprite);
        this.addChild(btn_restart);
        this.visible = true;

        SoundManager.getInstance().play('game-sound', { sprite: 'gamelose', loop: false });
    }

    private onRestart(): void {
        this.visible = false;
    }


    public displayResult(isWin: boolean): void {
        this.visible = false;
        if (isWin) {
            this.showWinScreen();
        } else {
            this.showLoseScreen();
        }
    }

    // // Phương thức xử lý khi nhấn nút "Thoát"
    private onExit(): void {
        console.log("Exit game");
        this.visible = false;
    }
}
