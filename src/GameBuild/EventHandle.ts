import { EventEmitter } from 'pixi.js';

export class EventHandle {
    private static _eventEmitter: EventEmitter<string> = new EventEmitter();
    private static eventRegistry: Record<string, number> = {}; // Đối tượng lưu các sự kiện và số lượng listener

    // Kích hoạt một sự kiện event
    public static emit(eventName: string, ...args: any[]): boolean {
        return this._eventEmitter.emit(eventName, ...args);
    }

    // Đăng ký function callback khi có sự kiện event được kích hoạt
    public static on(event: string, fn: EventEmitter.ListenerFn, context?: any): EventHandle {
        this._eventEmitter.on(event, fn, context);

        // Kiểm tra và lưu sự kiện đã được đăng ký vào eventRegistry
        if (this.eventRegistry[event]) {
            this.eventRegistry[event]++; // Tăng số lượng listener cho sự kiện này
        } else {
            this.eventRegistry[event] = 1; // Đăng ký sự kiện lần đầu tiên
        }

        return this;
    }

    // Xóa sự kiện đã đăng ký
    public static off(event: string): EventHandle {
        this._eventEmitter.off(event);

        // Cập nhật eventRegistry khi sự kiện bị hủy đăng ký
        if (this.eventRegistry[event]) {
            this.eventRegistry[event]--;
            if (this.eventRegistry[event] === 0) {
                delete this.eventRegistry[event]; // Xóa sự kiện nếu không còn listener nào
            }
        }

        return this;
    }

    // Xóa tất cả listener
    public static removeAllListeners(): EventHandle {
        this._eventEmitter.removeAllListeners();
        this.eventRegistry = {}; // Xóa sạch eventRegistry
        return this;
    }

    // Kiểm tra các sự kiện hiện đang có listener
    public static listEvents(): Record<string, number> {
        return this.eventRegistry;
    }
}