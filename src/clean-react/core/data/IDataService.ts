export interface IDataService {
    get<T>(key: string, params?: unknown): Promise<T>;
    list<T>(key: string, params?: unknown): Promise<T[]>;
    create<T>(key: string, data: unknown): Promise<T>;
    update<T>(key: string, data: unknown): Promise<T>;
    remove(key: string, params?: unknown): Promise<void>;
}
