import { IAsyncStorage } from "../interfaces/IAsyncStorage"

export interface IDBDatabaseSettings {
    databaseName: string,
    databaseVersion: number,
    readonly usingKeyPath: boolean,
    usingKeyGenerator: boolean
}
export class IndexedDBStorage implements IAsyncStorage {

    private databaseSettings: IDBDatabaseSettings
    private database: IDBDatabase
    private objectStore: IDBObjectStore

    constructor(databaseSettings: IDBDatabaseSettings) {
        this.databaseSettings = databaseSettings
    }

    /**
     * Function used to generate a new instance of IDBDatabase, to store all data
     */
    public async init() {
        this.database = await this.open()
    }

    /**
     * Function that open a new instance of the database, using a Promise
     */
    private open(): Promise<IDBDatabase> {
        const me = this
        return new Promise((resolve, reject) => {
            // open an IndexedDB instance
            const request = window.indexedDB.open(this.databaseSettings.databaseName, this.databaseSettings.databaseVersion)
            
            // this callback is executed when the database exists an it's opened
            // if the database doesn't exist, then execute onupgradeneeded callback first, and this later
            request.onsuccess = function(event) {
                console.info("Database is Open")
                resolve(this.result)
            }

            // this callback is executed when the database is open
            request.onblocked = function(event) {
                console.warn("Database is opened")
                reject(event)
            }

            // this callback is executed, when a new Database is created
            request.onupgradeneeded = function(event) {
                console.info("Database successfully created")
                resolve(this.result)
            }
            // if an error happened, reject the promise
            request.onerror = function(event){
                console.error("Database couldn't be opened")
                reject(event)
            }
        })
    }

    public async createDatabaseTable(objectStoreName: string, indexObject: IDBKeyPath | IDBKeyRange ){
        if(this.databaseSettings.usingKeyPath){
            //create an objectStore using a keyPath to 
            await this.createObjectStore(objectStoreName, indexObject)
        }
    }

    private createObjectStore(objectStoreName: string, indexObject: IDBKeyPath | IDBKeyRange): Promise<IDBObjectStore> {
        return new Promise((resolve,reject) => {

        })
    }

    /**
     * Function that return an object Store to execute all operations
     * @param storageName 
     * @param mode 
     */
    private getObjectStore(storageName: string, mode: IDBTransactionMode): IDBObjectStore {
        const transaction:IDBTransaction = this.database.transaction(storageName, mode)
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
        const store = this.getObjectStore(this.databaseSettings.databaseName,'readwrite')
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
            await this.clearObjectStore(this.databaseSettings.databaseName, 'readwrite')
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
        return this.database
    }
}
