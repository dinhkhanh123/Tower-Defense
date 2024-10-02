import { PointData, Sprite } from "pixi.js";
import { TowerType } from "./TowerType";
import Asset from "../../GameBuild/Asset";
import { Enemy } from "../Enemies/Enemy";
import { EventHandle } from "../../GameBuild/EventHandle";
import { TowerController } from "../../Controller/TowerController";
import { PlayerController } from "../../Controller/PlayerController";

export class Tower {
    public id: number;
    public type: TowerType;
    public towerName: string;
    public towerDetail: string;
    public levelTower: { initLevel: number, level: number };
    public spriteTower: { initSprite: Sprite, sprite: Sprite };
    public imageTower: { initImage: Sprite, image: Sprite };
    public damageTower: { initDamage: number, damage: number };
    public rangeTower: { initRange: number, range: number };
    public attackSpeed: { initSpeed: number, speed: number };
    public priceTower: { initPrice: number, price: number }
    public baseTower!: Sprite;
    public target: Enemy[] = [];


    private cooldownTime: number;
    private attackTime: number;

    constructor(id: number, type: TowerType, damage: number, range: number, attackSpeed: number, towerName: string, towerDetail: string, price: number) {
        this.id = id;
        this.type = type;
        this.towerName = towerName;
        this.towerDetail = towerDetail;
        this.levelTower = { initLevel: 1, level: 1 };
        this.damageTower = { initDamage: damage, damage: damage };
        this.rangeTower = { initRange: range, range: range };
        this.attackSpeed = { initSpeed: attackSpeed, speed: attackSpeed };
        this.spriteTower = { initSprite: new Sprite(Asset.getTexture(`${type}_${this.levelTower.initLevel}`)), sprite: new Sprite(Asset.getTexture(`${type}_${this.levelTower.initLevel}`)) };
        this.imageTower = { initImage: new Sprite(Asset.getTexture(`${type}_Img_${this.levelTower.initLevel}`)), image: new Sprite(Asset.getTexture(`${type}_Img_${this.levelTower.initLevel}`)) };
        this.priceTower = { initPrice: price, price: price };

        this.cooldownTime = 50 / this.attackSpeed.speed;
        this.attackTime = 0;

        this.listenEventHandle();
    }

    public resetTower() {
        this.levelTower.level = this.levelTower.initLevel;
        this.attackSpeed.speed = this.attackSpeed.initSpeed;
        this.damageTower.damage = this.damageTower.initDamage;
        this.rangeTower.range = this.rangeTower.initRange;
        this.spriteTower.sprite.texture = this.spriteTower.initSprite.texture;
        this.imageTower.image.texture = this.imageTower.initImage.texture;
        this.priceTower.price = this.priceTower.initPrice;
    }

    public Attack(enemyId: number, enemyPosition: PointData, detatime: number) {

        this.attackTime += detatime;
        if (this.attackTime >= this.cooldownTime) {
            EventHandle.emit('create_projectile', this, enemyId, enemyPosition);
            this.attackTime = 0;
        }
    }

    private Uprade(idTower: number) {
        if (idTower === this.id && this.levelTower.level < 3) {
            this.levelTower.level++;
            this.spriteTower.sprite.texture = Asset.getTexture(`${this.type}_${this.levelTower.level}`);
            this.imageTower.image.texture = Asset.getTexture(`${this.type}_Img_${this.levelTower.level}`);
            this.damageTower.damage += 2;
            this.attackSpeed.speed += .5;
            this.rangeTower.range += 10;

            const optionTower = {
                id: this.id,
                level: this.levelTower.level,
                towerName: this.towerName,
                towerDetail: this.towerDetail,
                damage: this.damageTower.damage,
                speedAttack: this.attackSpeed.speed,
                sprite: this.imageTower.image,
                range: {
                    range: this.rangeTower.range,
                    x: this.spriteTower.sprite.position.x,
                    y: this.spriteTower.sprite.position.y
                }
            };
            EventHandle.emit('tower_clicked', optionTower);
        }
    }

    private Sell(idTower: number) {
        if (idTower === this.id) {

            TowerController.instance.removeTower(this);
        }
    }

    private Buy(idTower: number) {
        if (idTower === this.id && PlayerController.instance) {

            PlayerController.instance.subtractMoney(this.priceTower.price);
        }

    }

    public isInRange(enemyPosition: PointData): boolean {
        const distance = Math.sqrt(
            Math.pow(enemyPosition.x - this.spriteTower.sprite.x, 2) +
            Math.pow(enemyPosition.y - this.spriteTower.sprite.y, 2)
        );
        return distance <= this.rangeTower.range;
    }


    listenEventHandle() {
        EventHandle.on('uprade_tower', (idTower: number) => this.Uprade(idTower));
        EventHandle.on('sell_tower', (idTower: number) => this.Sell(idTower));
        EventHandle.on('buy_tower', (idTower: number) => this.Buy(idTower));

    }
}