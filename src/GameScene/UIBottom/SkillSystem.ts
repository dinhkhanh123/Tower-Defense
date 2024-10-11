import { Container, Sprite, Texture, Graphics, Ticker } from 'pixi.js';
import { EventHandle } from '../../GameBuild/EventHandle';
import { EnemySpawner } from '../../Controller/SpawnEnemy';
import { GameConst } from '../../GameBuild/GameConst';
import { SoundManager } from '../../Controller/SoundController';
export class SkillSystem extends Container {
    public static instance: SkillSystem;
    public isHeroSelected: boolean = false;
    public isSkillSelected: boolean = false;
    private cooldownInProgress: boolean = false;
    private skill1!: Sprite;
    private heroAvatar!:Sprite;

    constructor() {
        super();
        if (!SkillSystem.instance) {
            SkillSystem.instance = this;
        }
        this.init();
        this.listenEventHandle();
    }

    listenEventHandle() {
        EventHandle.on('skill_used', (position: { x: number, y: number }) => {
            if (this.isSkillSelected && !this.cooldownInProgress) {
                this.createDamageZone(position.x, position.y);
                this.isSkillSelected = false; // Đặt lại trạng thái sau khi chọn kỹ năng
                this.startCooldown(); 
            }
        });
        EventHandle.on('hero_moved', () => {
            this.resetHeroAvatar(); 
        });
    }

    startCooldown() {
        this.cooldownInProgress = true;

        // Đặt lại kích thước của skill1 về bình thường
        this.skill1.scale.set(1);

        // Đổi texture của skill1 thành 'skill_1_U' khi hồi chiêu
        this.skill1.texture = Texture.from('skill_1_U');

        // Đợi 10 giây trước khi cho phép sử dụng lại kỹ năng
        setTimeout(() => {
            this.cooldownInProgress = false;
            // Đổi lại texture của skill1 thành 'skill_1_A' sau khi hồi chiêu kết thúc
            this.skill1.texture = Texture.from('skill_1_A');
        }, 10000); // Thời gian hồi chiêu là 10 giây
    }

    createDamageZone(x: number, y: number) {
        const damageZone = new Graphics();
        damageZone.circle(0, 0, 50); // Vùng tròn có bán kính 50
        damageZone.fill(0xff0000); 
        damageZone.alpha = .3;
        damageZone.position.set(x * GameConst.SQUARE_SIZE, y * GameConst.SQUARE_SIZE);
        this.addChild(damageZone);
        SoundManager.getInstance().play('game-sound',{sprite:'firerain',loop:false});

        // Hàm kiểm tra kẻ địch trong vùng tròn và gây sát thương
        const damageInterval = setInterval(() => {
            this.checkEnemiesInZone(damageZone); 
        }, 1000); // Cứ mỗi giây sẽ kiểm tra và gây sát thương cho kẻ địch

        
        setTimeout(() => {
            clearInterval(damageInterval); 
            this.removeChild(damageZone);  
        }, 3000); 
    }

    checkEnemiesInZone(zone: Graphics) {
        const enemies = EnemySpawner.instance.getEnemies(); // Lấy danh sách kẻ địch
        enemies.forEach(enemy => {
            if (enemy.isAlive) {
                const distance = Math.sqrt(
                    Math.pow(enemy.sprite.x  - zone.x, 2) + Math.pow(enemy.sprite.y - zone.y, 2)
                );
                if (distance <= 50) {
                    enemy.takeDamage(enemy.id, 5); 
                }
            }
        });
    }

    init() {
        const skillPan = new Sprite(Texture.from('ui_bar_buttom'));
        skillPan.y = 600;
        this.addChild(skillPan);

        this.heroAvatar = this.createSprite(100, 660, 50, 50, 'hero_avatar');
        this.heroAvatar.on('pointerdown', () => {
            this.isHeroSelected = true;
            this.heroAvatar.scale.set(1.2);
            SoundManager.getInstance().play('game-sound',{sprite:'button',loop:false});
        });

        // Khởi tạo biểu tượng kỹ năng với texture ban đầu là 'skill_1_A'
        this.skill1 = this.createSprite(500, 660, 50, 50, 'skill_1_A');
        this.skill1.on('pointerdown', () => {
            if (!this.cooldownInProgress) { // Kiểm tra nếu không có hồi chiêu
                this.isSkillSelected = true;
                this.skill1.scale.set(1.2);
                SoundManager.getInstance().play('game-sound',{sprite:'button',loop:false});
            }
        });
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
    resetHeroAvatar() {
        // Reset kích thước avatar hero về bình thường
        if (this.heroAvatar) {
            this.heroAvatar.scale.set(1);
            this.isHeroSelected = false;  
        }
    }
}
