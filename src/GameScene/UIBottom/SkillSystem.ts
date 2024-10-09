import { Container, Sprite, Texture, Graphics, Ticker } from 'pixi.js';

export class SkillSystem extends Container {
    public static instance: SkillSystem;
    public isHeroSelected: boolean = false;
    private skillCooldown: boolean = false; // Biến để kiểm tra trạng thái cooldown của kỹ năng
    private skill1!: Sprite; // Biểu tượng kỹ năng
    private cooldownMask!: Graphics; // Mask cho thời gian hồi

    constructor() {
        super();
        if (!SkillSystem.instance) {
            SkillSystem.instance = this;
        }
        this.init();
    }

    init() {
        const skillPan = new Sprite(Texture.from('ui_bar_buttom'));
        skillPan.y = 600;
        this.addChild(skillPan);

        const hero = this.createSprite(100, 660, 50, 50, 'hero_avatar');
        hero.on('pointerdown', () => {
            this.isHeroSelected = true;
            hero.scale.set(1.2);
            console.log("Hero selected. Click on map to move.");
        });

        // Khởi tạo biểu tượng kỹ năng
        this.skill1 = this.createSprite(500, 660, 50, 50, 'skill_1_A');
        this.skill1.on('pointerdown', () => {
            if (!this.skillCooldown) {
                this.useSkill();
            }
        });

        // Tạo mask cho thời gian hồi
        this.cooldownMask = new Graphics();
        this.cooldownMask.circle(0, 0, 50); // Kích thước bằng biểu tượng kỹ năng
        this.cooldownMask.fill(0xFFFFFF);
        this.cooldownMask.visible = false; // Ẩn mask lúc bắt đầu

        this.addChild(this.cooldownMask);
        this.skill1.mask = this.cooldownMask; // Gán mask cho biểu tượng kỹ năng
    }

    useSkill() {
        // Bắt đầu thời gian hồi kỹ năng
        this.skillCooldown = true;
        this.skill1.texture = Texture.from('skill_1_U'); // Đổi thành texture không khả dụng

        // Hiện mask và bắt đầu thu nhỏ
        this.cooldownMask.visible = true;
        this.cooldownMask.scale.set(1); // Đặt kích thước ban đầu cho mask
        this.startCooldown();

        // Đặt thời gian hồi (ví dụ: 5 giây)
        setTimeout(() => {
            this.skillCooldown = false;
            this.skill1.texture = Texture.from('skill_1_A'); // Đổi lại thành texture khả dụng
            this.resetSkillIcon(); // Dừng mask
        }, 5000); // 5000ms = 5 giây
    }

    startCooldown() {
        const cooldownDuration = 5000; // 5 giây
        const maskScaleTween = new Ticker(); // Ticker để cập nhật mask

        maskScaleTween.add(() => {
            if (this.skillCooldown) {
                const scale = this.cooldownMask.scale.x; // Lấy kích thước hiện tại của mask
                const newScale = scale - (1 / (cooldownDuration / Ticker.shared.deltaMS)); // Tính toán kích thước mới
                this.cooldownMask.scale.set(Math.max(newScale, 0)); // Đảm bảo không nhỏ hơn 0
            } else {
                maskScaleTween.stop(); // Dừng nếu không còn cooldown
            }
        });

        maskScaleTween.start(); // Bắt đầu cập nhật mask
    }

    resetSkillIcon() {
        // Ẩn mask khi kết thúc cooldown
        this.cooldownMask.visible = false;
        this.cooldownMask.scale.set(1); // Reset kích thước mask
    }

    createSprite(x: number, y: number, w: number, h: number, texture: string): Sprite {
        const sprite = new Sprite(Texture.from(texture));
        sprite.anchor.set(0.5);
        sprite.position.set(x, y);
        sprite.width = w;
        sprite.height = h;

        sprite.interactive = true;
        sprite.eventMode = 'static';
        sprite.cursor = 'pointer';

        this.addChild(sprite);
        return sprite;
    }

    // Reset trạng thái chọn hero
    resetHeroSelection() {
        this.isHeroSelected = false;
    }
}
