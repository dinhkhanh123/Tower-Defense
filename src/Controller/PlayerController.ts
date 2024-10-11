import { EventHandle } from "../GameBuild/EventHandle";
import { GameConst } from "../GameBuild/GameConst";
import { TowerSystem } from "../GameScene/UIBottom/TowerSystem";
import { RightPanel } from "../GameScene/UIRight/RightPanel";
import { EnemySpawner } from "./SpawnEnemy";

export class PlayerController {
    public static instance: PlayerController;
    public cointPlayer: number;
    public hpPlayer: number;
    public waveAttack: number;

    public waveData: any[] = [GameConst.WAVE_1, GameConst.WAVE_2, GameConst.WAVE_3, GameConst.WAVE_4, GameConst.WAVE_5];
    public totalWaves: number = this.waveData.length;
    public currentWave: number = 0;

    public isGameStart: boolean;
    public isGameOver: boolean;

    constructor(coint: number, hp: number) {
        if (!PlayerController.instance) {
            PlayerController.instance = this;
        }

        this.cointPlayer = coint;
        this.hpPlayer = hp;
        this.waveAttack = this.waveData.length;

        this.isGameStart = false;
        this.isGameOver = false;

        this.listenEventHandle();

    }

    listenEventHandle() {
        EventHandle.on('start_spawn', () => this.startNextWave());
    }

    //  cộng tiền cho người chơi
    public addMoney(amount: number) {
        this.cointPlayer += amount;
        RightPanel.instance.updateCoinDisplay();
    }

    //  trừ tiền của người chơi
    public subtractMoney(amount: number) {
        if (this.cointPlayer >= amount) {
            this.cointPlayer -= amount;
            RightPanel.instance.updateCoinDisplay();
        }
    }

    //xử lý khi người chơi bị nhận sát thương
    public takeDamage(damage: number): void {
        this.hpPlayer -= damage;
        if (this.hpPlayer <= 0) {
            this.hpPlayer = 0;
            this.isGameOver = true;

        }
        RightPanel.instance.updateCoinDisplay();
    }

    //  bắt đầu đợt tấn công tiếp theo
    startSpawn() {
        this.currentWave++;
        RightPanel.instance.updateCoinDisplay();
        if (this.currentWave <= this.waveData.length) {
            const waveInfo = this.waveData[this.currentWave - 1];

            EnemySpawner.instance.spawnWave(
                Array.isArray(waveInfo.spawnPoints) ? waveInfo.spawnPoints : [waveInfo.spawnPoints],
                waveInfo.goad,
                waveInfo.enemySpawnNumber,
                waveInfo.typeEnemy
            );
        }
    }

    startNextWave() {
        if (this.currentWave < this.waveData.length) {
            this.startSpawn();
        }
    }
}