export class PlayerController {
    public static instance: PlayerController;
    public coint: number;
    public hp: number;
    public wave: number;

    constructor() {
        if (!PlayerController.instance) {
            PlayerController.instance = this;
        }

        // Khởi tạo các thuộc tính
        this.coint = 500;
        this.hp = 100;
        this.wave = 1;
    }

    public addMoney(amount: number) {
        this.coint += amount;
        console.log(`Money added: ${amount}. Total money: ${this.coint}`);
    }

    public subtractMoney(amount: number) {
        if (this.coint >= amount) {
            this.coint -= amount;
            console.log(`Money subtracted: ${amount}. Total money: ${this.coint}`);

        } else {
            console.log("Not enough money.");
        }
    }

    public takeDamage(damage: number): void {
        this.hp -= damage;
        if (this.hp < 0) {
            this.hp = 0;
        }
        console.log(`Took damage: ${damage}. Remaining HP: ${this.hp}`);
    }

    public heal(amount: number): void {
        this.hp += amount;
        console.log(`Healed: ${amount}. Current HP: ${this.hp}`);
    }


    public nextWave(): void {
        this.wave += 1;
        console.log(`Wave advanced to: ${this.wave}`);
    }
}