import { IDataService, NotFoundError, ValidationError } from '../../core';

type Store = Record<string, any[]>;

export class MockDataService implements IDataService {
    private store: Store = {};

    constructor(initialData?: Store) {
        if (initialData) {
            this.store = JSON.parse(JSON.stringify(initialData));
        }
    }

    private ensureCollection(key: string) {
        if (!this.store[key]) {
            this.store[key] = [];
        }
    }

    private async delay(ms = 1000) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async get<T>(key: string, params?: any): Promise<T> {
        this.ensureCollection(key);
        await this.delay();

        const id = params?.id ?? params;
        const item = this.store[key].find((x: any) => x.id === id);

        if (!item) throw new NotFoundError(`${key} with id ${id} not found`);

        return JSON.parse(JSON.stringify(item));
    }

    async list<T>(key: string): Promise<T[]> {
        this.ensureCollection(key);
        await this.delay();

        return JSON.parse(JSON.stringify(this.store[key]));
    }

    async create<T>(key: string, data: any): Promise<T> {
        this.ensureCollection(key);
        await this.delay();

        if (!data || typeof data !== 'object') {
            throw new ValidationError('Invalid data for create()');
        }

        const id = crypto.randomUUID();
        const record = { id, ...data };

        this.store[key].push(record);

        return JSON.parse(JSON.stringify(record));
    }

    async update<T>(key: string, data: any): Promise<T> {
        this.ensureCollection(key);
        await this.delay();

        if (!data?.id) {
            throw new ValidationError('update() requires an id');
        }

        const index = this.store[key].findIndex((x: any) => x.id === data.id);

        if (index === -1) {
            throw new NotFoundError(`${key} with id ${data.id} not found`);
        }

        const updated = { ...this.store[key][index], ...data };
        this.store[key][index] = updated;

        return JSON.parse(JSON.stringify(updated));
    }

    async remove(key: string, params?: any): Promise<void> {
        this.ensureCollection(key);
        await this.delay();

        const id = params?.id ?? params;
        const index = this.store[key].findIndex((x: any) => x.id === id);

        if (index === -1) {
            throw new NotFoundError(`${key} with id ${id} not found`);
        }

        this.store[key].splice(index, 1);
    }
}
