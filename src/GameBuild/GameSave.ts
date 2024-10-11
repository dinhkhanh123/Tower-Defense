export class GameSave {
    private static STORAGE_KEY = 'gameData_key';
    private static SOUND_KEY = 'soundEnabled';
    private static VOLUME_KEY = 'volumeLevel';

    private static hashKey(key: string, length: number = 10): string {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash << 5) - hash + key.charCodeAt(i);
            hash |= 0; // Chuyển đổi sang 32-bit integer
        }
        // Chuyển thành chuỗi base 16 (hex) và cắt theo độ dài yêu cầu
        return Math.abs(hash).toString(16).substring(0, length);
    }

    // Phương thức để lưu dữ liệu game vào localStorage
    static saveGame(soundEnabled: boolean, volume: number): void {
        const gameData = {
            soundEnabled: soundEnabled,
            volume: volume // Lưu âm lượng
        };
        const dataString = JSON.stringify(gameData);
        localStorage.setItem(GameSave.STORAGE_KEY, dataString);
    }

    // Phương thức để tải dữ liệu game từ localStorage
    static loadGame(): { soundEnabled: boolean, volume: number } | null {
        const savedData = localStorage.getItem(GameSave.STORAGE_KEY);
        if (savedData) {
            return JSON.parse(savedData);
        }
        return null;
    }

    // Phương thức để lưu thiết lập âm thanh
    static saveSoundSetting(soundEnabled: boolean): void {
        const hashedKey = GameSave.SOUND_KEY + GameSave.hashKey(GameSave.SOUND_KEY);
        localStorage.setItem(hashedKey, JSON.stringify(soundEnabled));
    }

    // Phương thức để tải thiết lập âm thanh
    static loadSoundSetting(): boolean {
        const hashedKey = GameSave.SOUND_KEY + GameSave.hashKey(GameSave.SOUND_KEY);
        const savedSoundSetting = localStorage.getItem(hashedKey);
        return savedSoundSetting ? JSON.parse(savedSoundSetting) : true; // Mặc định bật âm thanh nếu không có dữ liệu
    }

    // Phương thức để lưu mức âm lượng
    static saveVolumeSetting(volume: number): void {
        const hashedKey = GameSave.VOLUME_KEY + GameSave.hashKey(GameSave.VOLUME_KEY);
        localStorage.setItem(hashedKey, JSON.stringify(volume));
    }

    // Phương thức để tải mức âm lượng
    static loadVolumeSetting(): number {
        const hashedKey = GameSave.VOLUME_KEY + GameSave.hashKey(GameSave.VOLUME_KEY);
        const savedVolumeSetting = localStorage.getItem(hashedKey);
        return savedVolumeSetting ? JSON.parse(savedVolumeSetting) : 1.0;
    }
}
