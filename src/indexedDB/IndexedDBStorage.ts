import { IAsyncStorage } from "../interfaces/IAsyncStorage"

export class IndexedDBStorage implements IAsyncStorage {
    // tslint:disable-next-line:ban-types
    private storage: IDBDatabase
    private objectStore: IDBObjectStore
    private readonly storageName: string
    private readonly version: number = 1

    /**
     * Class Constructor
     * @param storageName  Storage's name
     */
    constructor(storageName: string) {
        this.storageName = storageName
    }

    /**
     * Function used to generate a new instance of IDBDatabase, to store all data
     */
    public async init() {
        this.storage = await this.open()
    }

    /**
     * Function that open a new instance of the database, using a Promise
     */
    private open(): Promise<IDBDatabase> {
        const me = this
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(this.storageName, this.version)

            //resolve the promise with IDBDatabase object 
            request.onsuccess = function(event){
                resolve(this.result)
            }
            /* TODO: check implementation of this behavior */
            request.onupgradeneeded = function(event) {
                //create an objectStore to handle object for this version of database
                me.objectStore = this.result.createObjectStore(me.storageName, { keyPath: "id"})

                resolve(this.result)
            }
            // if an error happened, reject the promise
            request.onerror = function(event){
                reject(event)
            }
        })
    }

    /**
     * Function that return an object Store to execute all operations
     * @param storageName 
     * @param mode 
     */
    private getObjectStore(storageName: string, mode: IDBTransactionMode): IDBObjectStore {
        const transaction:IDBTransaction = this.storage.transaction(storageName, mode)
        return transaction.objectStore(storageName)
    }

    public createStoreIndex(indexName: string, keyPath: string|string[]) {
        if(this.objectStore){
            this.objectStore.createIndex(indexName, keyPath)
        }
    }

    /**
     * Function that clear objectStore, in async mode
     * @param storageName 
     * @param mode 
     */
    private clearObjectStore(storageName: string, mode: IDBTransactionMode) {
        const store = this.getObjectStore(this.storageName,'readwrite')
        return new Promise((resolve,reject) =>{
            const request = store.clear()
            request.onsuccess = function(event){
                resolve(event)
            }

            request.onerror = function(error){
                reject(error)
            }
        })
    }
    
    /**
     * public interface to clear indexedDBStorage
     */
    public async clear() {
        try{
            await this.clearObjectStore(this.storageName, 'readwrite')
        } catch(error) {
            console.warn(error)
        }
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
