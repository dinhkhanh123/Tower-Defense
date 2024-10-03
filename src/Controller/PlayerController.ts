import { RightPanel } from "../GameScene/UIRight/RightPanel";

export class PlayerController {
    public static instance: PlayerController;
    public cointPlayer: number;
    public hpPlayer: number;
    public waveAttack: number;

    public isGameStart:boolean;
    public isGameOver:boolean;

    constructor(coint:number,hp:number,wave:number) {
        if (!PlayerController.instance) {
            PlayerController.instance = this;
        }

        this.cointPlayer = coint;
        this.hpPlayer = hp;
        this.waveAttack = wave;

        this.isGameStart = false;
        this.isGameOver = false;
    
    }

    public addMoney(amount: number) {
        this.cointPlayer += amount;
        RightPanel.instance.updateCoinDisplay();
        console.log(`Money added: ${amount}. Total money: ${this.cointPlayer}`);
    }

    public subtractMoney(amount: number) {
        if (this.cointPlayer >= amount) {
            this.cointPlayer -= amount;
            console.log(`Money subtracted: ${amount}. Total money: ${this.cointPlayer}`);
            RightPanel.instance.updateCoinDisplay();

        } else {
            console.log("Not enough money.");
        }
    }

    public takeDamage(damage: number): void {
        this.hpPlayer -= damage;
        if (this.hpPlayer <= 0) {
            this.hpPlayer = 0;
            this.isGameOver = true;
        
        }
        RightPanel.instance.updateCoinDisplay();
        console.log(`Took damage: ${damage}. Remaining HP: ${this.hpPlayer}`);
    }

    public heal(amount: number): void {
        this.hpPlayer += amount;
        console.log(`Healed: ${amount}. Current HP: ${this.hpPlayer}`);
    }

    public nextWave(): void {
        this.waveAttack += 1;
        console.log(`Wave advanced to: ${this.waveAttack}`);
    }
}