import { Sprite } from "pixi.js";
import { Bandit } from "../GameObject/Enemies/Bandit";
import { Brigand } from "../GameObject/Enemies/Brigand";
import { Enemy } from "../GameObject/Enemies/Enemy";
import { EnemyType } from "../GameObject/Enemies/EnemyType";
import { Goblin } from "../GameObject/Enemies/Goblin";
import Ogre from "../GameObject/Enemies/Ogre";
import { Shaman } from "../GameObject/Enemies/Shaman";
import { Projectile } from "../GameObject/Projectiles/Projectile";
import { ArcherTower } from "../GameObject/Towers/ArcherTower";
import { CannonTower } from "../GameObject/Towers/CannonTower";
import { MageTower } from "../GameObject/Towers/MageTower";
import { TechTower } from "../GameObject/Towers/TechTower";
import { Tower } from "../GameObject/Towers/Tower";
import { TowerType } from '../GameObject/Towers/TowerType';
import Asset from "../GameBuild/Asset";


export class TowerFactory {
    public static instance: TowerFactory;
    private static towerId: number = 0;
    private static enemyId: number = 0;
    private static projectileId:number = 0;


    constructor() {
        TowerFactory.instance = this;
    }

    public static createTower(type: TowerType): Tower {
        const id = this.towerId++;

        switch (type) {
            case TowerType.Archer:
                return new ArcherTower(id);

            case TowerType.Mage:
                return new MageTower(id);

            case TowerType.Tech:
                return new TechTower(id);

            case TowerType.Cannon:
                return new CannonTower(id);

            default:
                throw new Error(`Tower type ${type} is not recognized`);
        }
    }

    public static createEnemy(type: EnemyType): Enemy {
        const id = this.enemyId++;

        switch (type) {
            case EnemyType.Goblin:
                return new Goblin(id);

            case EnemyType.Shaman:
                return new Shaman(id);

            case EnemyType.Brigand:
                return new Brigand(id);

            case EnemyType.Bandit:
                return new Bandit(id);

            case EnemyType.Ogre:
                return new Ogre(id);
            
            default:
                throw new Error(`Enemy type ${type} is not recognized`);
        }
    }

    public static createProjectile(type:TowerType):Projectile{
        const id = this.projectileId++;
        const sprite = new Sprite(Asset.getTexture(`projectile_${type}`));
        
        return new Projectile(id,sprite,type);
    }
}