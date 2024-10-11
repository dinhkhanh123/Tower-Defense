import { EnemyType } from "../GameObject/Enemies/EnemyType";

export namespace GameConst {
    export const GAME_WIDTH = 1024;
    export const GAME_HEIGHT = 720;
    export const SQUARE_SIZE = 40;

    export const SPAWN_DELAY = 2000;

    export const SPEED_ANI = 0.5;
    export const Z_INDEX_1 = 1000;
    export const Z_INDEX_2 = 100;
    export const Z_INDEX_3 = 10;
    export const Z_INDEX_4 = 5;
    export const Z_INDEX_5 = 1;



    export const WAVE_1 = {
        spawnPoints: { x: 0, y: 2 },
        goad: { x: 0, y: 13 },
        enemySpawnNumber: 10,
        typeEnemy: [EnemyType.Goblin,EnemyType.Ogre],
    }

    export const WAVE_2 = {
        spawnPoints: { x: 19, y: 2 },
        goad: { x: 0, y: 13 },
        enemySpawnNumber: 15,
        typeEnemy: [EnemyType.Goblin,EnemyType.Ogre,EnemyType.Shaman],
    }

    export const WAVE_3 = {
        spawnPoints: { x: 0, y: 2 },
        goad: { x: 0, y: 13 },
        enemySpawnNumber: 15,
        typeEnemy: [EnemyType.Goblin,EnemyType.Ogre,EnemyType.Brigand,EnemyType.Shaman],
    }

    export const WAVE_4 = {
        spawnPoints: { x: 19, y: 2 },
        goad: { x: 0, y: 13 },
        enemySpawnNumber: 20,
        typeEnemy: [EnemyType.Goblin,EnemyType.Bandit,EnemyType.Brigand,EnemyType.Shaman,EnemyType.Ogre],
    }

    export const WAVE_5 = {
        spawnPoints: [{ x: 0, y: 2 }, { x: 19, y: 2 }],
        goad: { x: 0, y: 13 },
        enemySpawnNumber: 15,
        typeEnemy: [EnemyType.Goblin,EnemyType.Bandit,EnemyType.Brigand,EnemyType.Shaman,EnemyType.Ogre],
    }
}