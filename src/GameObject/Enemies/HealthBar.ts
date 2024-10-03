import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { Enemy } from "./Enemy";

export class HealthBar {
    public background: Sprite;
    public bar: Sprite;
  

    constructor(enemy: Enemy) {


        // Tạo nền của thanh máu
        this.background = new Sprite(Texture.from('healthbar_bg'));
        this.background.width = 30;
        this.background.height = 6;

        // Đặt vị trí của nền thanh máu theo vị trí của kẻ địch
        this.background.x = enemy.sprite.x - this.background.width / 2;
        this.background.y = enemy.sprite.y - 20;

        // Tạo thanh máu chính
        this.bar = new Sprite(Texture.from('healthbar_fg'));
        this.bar.width = 28;
        this.bar.height = 4;
        this.bar.x = this.background.x + 1;
        this.bar.y = this.background.y + 1;

        enemy.sprite.addChild(this.background);
        enemy.sprite.addChild(this.bar);
    }

    // Cập nhật thanh máu theo tỷ lệ phần trăm máu còn lại
    updateHealthBar(healthPercent: number) {
        if (healthPercent < 0) healthPercent = 0;
        if (healthPercent > 1) healthPercent = 1;

        this.bar.width = 28 * healthPercent;
    }
}