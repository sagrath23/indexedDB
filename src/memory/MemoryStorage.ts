import {Observable} from "rxjs"
import { ISyncStorage } from "../interfaces/ISyncStorage"

export class MemoryStorage implements ISyncStorage {
    // tslint:disable-next-line:ban-types
    private storage: Object
    private readonly storageName: string

    constructor(name?: string) {
        this.storage = {}
        this.storageName = name
    }

    public clear(): void {
        this.storage = {}
    }

    public key(position: number): string {
        let i = 0
        for (const key in this.storage ) {
            if (i === position ) {
                return key
            } else {
                i++
            }
        }
        return ""
    }

    public removeItem(key: string): void {
        if (key && this.storage[key]) {
            this.storage[key] = undefined
        }
    }

    // tslint:disable-next-line:ban-types
    public setItem(key: string, value: Object): void {
        if (key) {
            this.storage[key] = value
        }
    }

    // tslint:disable-next-line:ban-types
    public getItem(key: string): Object {
        return this.storage[key]
    }

    // tslint:disable-next-line:ban-types
    public getDenseBatch(keys: string[]): Object[] {
        return keys.map((x) => this.storage[x])
    }

    // tslint:disable-next-line:ban-types
    public getAll(): Object[] {
        return Object.keys(this.storage).map((x) => this.storage[x])
    }
}
