import { ArcherTower } from "../GameObject/Towers/ArcherTower";
import { CannonTower } from "../GameObject/Towers/CannonTower";
import { MageTower } from "../GameObject/Towers/MageTower";
import { TechTower } from "../GameObject/Towers/TechTower";
import { Tower } from "../GameObject/Towers/Tower";
import { TowerType } from "../GameObject/Towers/TowerType";


export class TowerFactory {
    public static instance:TowerFactory;
    private static nextId: number = 0; 

    constructor(){
        TowerFactory.instance = this;
    }

    // Phương thức tạo tháp dựa trên loại TowerType
    public static createTower(type: TowerType): Tower {
        const id = this.nextId++;
        
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
}