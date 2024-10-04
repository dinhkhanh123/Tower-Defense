import { EnemyType } from "../GameObject/Enemies/EnemyType";

export namespace GameConst {
    export const GAME_WIDTH = 1024;
    export const GAME_HEIGHT = 720;
    export const SQUARE_SIZE = 40;

    export const WAVE_1 = {
        spawnPoints: { x: 0, y: 2 },
        goad: { x: 0, y: 13 },
        enemySpawnNumber: 5,
        typeEnemy: [EnemyType.Goblin,EnemyType.Ogre],
    }

    export const WAVE_2 = {
        spawnPoints: { x: 19, y: 2 },
        goad: { x: 0, y: 13 },
        enemySpawnNumber: 5,
        typeEnemy: [EnemyType.Goblin,EnemyType.Ogre,EnemyType.Shaman],
    }

    export const WAVE_3 = {
        spawnPoints: { x: 0, y: 2 },
        goad: { x: 0, y: 13 },
        enemySpawnNumber: 5,
        typeEnemy: [EnemyType.Goblin,EnemyType.Ogre,EnemyType.Brigand,EnemyType.Shaman],
    }

    export const WAVE_4 = {
        spawnPoints: { x: 19, y: 2 },
        goad: { x: 0, y: 13 },
        enemySpawnNumber: 10,
        typeEnemy: [EnemyType.Goblin,EnemyType.Bandit,EnemyType.Brigand,EnemyType.Shaman,EnemyType.Ogre],
    }

    export const WAVE_5 = {
        spawnPoints: [{ x: 0, y: 2 }, { x: 19, y: 2 }],
        goad: { x: 0, y: 13 },
        enemySpawnNumber: 10,
        typeEnemy: [EnemyType.Goblin,EnemyType.Bandit,EnemyType.Brigand,EnemyType.Shaman,EnemyType.Ogre],
    }
}