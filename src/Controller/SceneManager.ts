import { Application, Container } from 'pixi.js';
import { GameStart } from '../GameScene/Scenes/GameStart';
import { GameBoard } from '../GameScene/Scenes/GameBoard';
import { GameResult } from '../GameScene/Scenes/GameResult';
import { EventHandle } from '../GameBuild/EventHandle';
import { ObjectPool } from '../ObjectPool/ObjectPool';


export class SceneManager {
    private static instance: SceneManager;
    private app: Application;
    private currentScene: Container | null;

    private constructor(app: Application) {
        this.app = app;
        this.currentScene = null;
    }


    // Phương thức lấy instance của SceneManager (Singleton)
    public static getInstance(app?: Application): SceneManager {
        if (!SceneManager.instance && app) {
            SceneManager.instance = new SceneManager(app);
        }
        return SceneManager.instance;
    }

    // Phương thức chuyển đổi cảnh
    public changeScene(newScene: Container): void {
        if (this.currentScene) {
            this.app.stage.removeChild(this.currentScene);
        }
        this.currentScene = newScene;
        this.app.stage.addChild(newScene);
    }

    // Phương thức khởi tạo cảnh ban đầu (ví dụ: GameStart)
    public startScene(): void {
       const gameStart = new GameStart();
        this.changeScene(gameStart);

        // Lắng nghe sự kiện bắt đầu trò chơi
       gameStart.on('startGame', () => {
            this.loadGameScene();
      });
    }

    // Phương thức để chuyển sang cảnh trò chơi (GameBoard)
    private loadGameScene(): void {
        const gameBoard = new GameBoard();
        const gameResult = new GameResult();

        this.changeScene(gameBoard);

        this.app.stage.addChild(gameResult);

        // Chạy update liên tục cho GameBoard
        this.app.ticker.add((time) => {
            gameBoard.update(time.deltaTime);
        });

        // Lắng nghe sự kiện kết thúc trò chơi để hiển thị kết quả
        gameBoard.on('gameEnd', (isWin: boolean) => {
            gameResult.displayResult(isWin);
        });

    }

}
