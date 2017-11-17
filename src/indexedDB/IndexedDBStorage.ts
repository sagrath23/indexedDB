import {Observable} from "rxjs"
import { IAsyncStorage } from "../interfaces/IAsyncStorage"

export class IndexedDBStorage implements IAsyncStorage {
    // tslint:disable-next-line:ban-types
    private storage: Object
    private readonly storageName: string
    private readonly version: number = 1

    constructor(storageName: string) {
        this.storageName = storageName
    }

    public async init() {
        this.storage = await this.open()
    }

    public open(): Promise<IDBOpenDBRequest> {
        return new Promise((resolve, reject) => {
            resolve(window.indexedDB.open(this.storageName, this.version))
        })
    }

    public clear(): void {
        throw new Error("Method not implemented")
    }

    public key(position: number): string {
        throw new Error("Method not implemented")
    }

    public removeItem(key: string): void {
        throw new Error("Method not implemented")
    }

    // tslint:disable-next-line:ban-types
    public setItem(key: string, value: Object): void {
        throw new Error("Method not implemented")
    }

    // tslint:disable-next-line:ban-types
    public getItem(key: string): Object {
        throw new Error("Method not implemented")
    }

    // tslint:disable-next-line:ban-types
    public getDenseBatch(keys: string[]): Object[] {
        throw new Error("Method not implemented")
    }

    // tslint:disable-next-line:ban-types
    public getAll(): Object[] {
        throw new Error("Method not implemented")
    }

    public getStorage(): Object {
        return this.storage
    }
}
