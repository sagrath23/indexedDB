import { IAsyncStorage } from "../interfaces/IAsyncStorage"
import {IIndexDBSpec,IObjectStoreSpec} from "../interfaces/IObjectStoreSpec"

//transaction modes
const READ_ONLY = 'readonly'
const READ_WRITE = 'readwrite'
const VERSION_CHANGE = 'versionchange'

export class IndexedDBStorage implements IAsyncStorage {
    
    private window: any
    private databaseCreated: boolean
    private databaseName: string
    private databaseVersion: number
    private database: IDBDatabase
    private objectStoreSpec: IObjectStoreSpec[]

    /**
     * Function that return a promise of a IDBDatabase instance
     * @param databaseName 
     * @param databaseVersion 
     * @param objectStoreSpec 
     */
    private openIndexedDB(databaseName: string, databaseVersion: number, objectStoreSpec: IObjectStoreSpec[]): Promise<IDBDatabase>{

        const me = this
        
        me.databaseCreated = false
        me.databaseName = databaseName
        me.databaseVersion = databaseVersion
        me.objectStoreSpec = objectStoreSpec

        return new Promise((resolve, reject) => {
            //start to open the database
            let request
            if(me.window){
                request = me.window.indexedDB.open(me.databaseName, me.databaseVersion)
            } else{
                request = window.indexedDB.open(me.databaseName, me.databaseVersion)
            }
            
            // this callback is executed, when a new Database is created
            request.onupgradeneeded = function(event) {
                me.databaseCreated = true
                me.database = this.result
                //now, create a objectStore object
                for(const i in me.objectStoreSpec) {
                    //and add the new objectStore to our objectStores object
                    me.createObjectStore(me.database, me.objectStoreSpec[i]);
                }
            }
    
            // this callback is executed when the database exists an it's opened
            // if the database doesn't exist, then execute onupgradeneeded callback first, and this later
            request.onsuccess = function(event) {
                if(!me.databaseCreated){
                    me.database = this.result
                }
                resolve()
            }
    
            // this callback is executed when the database is open
            request.onblocked = function(event) {
                reject(event)
            }
    
            // if an error happened, reject the promise
            request.onerror = function(event){
                reject(event)
            }
        })
    }

    /**
     * Function that create a new IDBObjectStore in the specified database
     * @param database 
     * @param objectStoreSpec 
     */
    private createObjectStore(database: IDBDatabase, objectStoreSpec: IObjectStoreSpec): void{     
        //create objectStore
        const objectStore = database.createObjectStore(objectStoreSpec.objectStoreName,objectStoreSpec.objectStoreSettings)
        //and create index if are defined
        if(objectStoreSpec.objectStoreIndexes){
            for (const i in objectStoreSpec.objectStoreIndexes) {
                objectStore.createIndex(objectStoreSpec.objectStoreIndexes[i].indexName, objectStoreSpec.objectStoreIndexes[i].keyPath, objectStoreSpec.objectStoreIndexes[i].optionalParams)
            }
        }
    }

    /**
     * Function that open an existing IDBObjectStore i the specified database
     * @param objectStoreSpec 
     */
    private getObjectStore(objectStoreName: string, transactionMode?: IDBTransactionMode): IDBObjectStore{
        try{
            //open the object Store from IndexedDB instance
            //create a transaction in the database
            const transaction = this.database.transaction(objectStoreName, transactionMode)
            //and return the objectStore specified
            return transaction.objectStore(objectStoreName)
        } catch(error){
            throw error
        }
    }

    /**
     * Function that adds an item to an specific objectStore in the opened database,
     * returning a Promise of an IDBRequest object that contain the result of the transaction
     * @param objectStoreName 
     * @param item 
     */
    private addItemToObjectStore(objectStoreName: string, item: any, keyValue: IDBKeyRange | IDBValidKey): Promise<IDBRequest> {
        const me = this
        return new Promise((resolve,reject) => {
            //get ObjectStore to store data
            const objectStore = me.getObjectStore(objectStoreName, READ_WRITE)
            try{
                //and try to add it 
                let request
                request = objectStore.add(item, keyValue)

                //hendling when insertion is success
                request.onsuccess = function (event) {
                    resolve()
                }
                //and when 
                request.onerror = function(event) {
                    reject(event)
                }

            } catch(error){
                if (error.name == 'DataCloneError'){
                    console.error("This engine doesn't know how to clone a Blob, use Firefox or Chrome")
                }

                throw error
            }
        })
    }

    /**
     * 
     * @param objectStoreName 
     * @param keyValue 
     */
    private getItemFromObjectStore(objectStoreName: string, keyValue: IDBKeyRange | IDBValidKey): Promise<IDBRequest>{
        const me = this
        return new Promise((resolve,reject) => {
            //get ObjectStore to store data
            const objectStore = me.getObjectStore(objectStoreName, READ_ONLY)
            try{
                //and try to delete it 
                const request = objectStore.get(keyValue)
                //hendling when insertion is success
                request.onsuccess = function (event) {
                    resolve(this.result)
                }
                //and when 
                request.onerror = function(event) {
                    reject(event)
                }
            } catch(error){
                throw error
            }
        })
    }

    /**
     * Function that updates an item in an specific objectStore for the opened database,
     * returning a Promise of an IDBRequest object that contain the result of the transaction
     * @param objectStoreName 
     * @param item 
     * @param keyValue 
     */
    private putItemToObjectStore(objectStoreName: string, item: any, keyValue: IDBKeyRange | IDBValidKey): Promise<IDBRequest> {
        const me = this
        return new Promise((resolve,reject) => {
            //get ObjectStore to store data
            const objectStore = me.getObjectStore(objectStoreName, READ_WRITE)
            try{
                //and try to add it 
                let request
                request = objectStore.put(item, keyValue)
                //hendling when insertion is success
                request.onsuccess = function (event) {
                    resolve()
                }
                //and when 
                request.onerror = function(event) {
                    reject(event)
                }
            } catch(error){
                throw error
            }
        })
    }

    /**
     * Function that delete a record in a specific objectStore using his key
     * returning a promise of a IDBRequest object, containing the result of the request
     * @param objectStoreName 
     * @param keyValue 
     */
    private deleteItemFromObjectStore(objectStoreName: string, keyValue: IDBKeyRange | IDBValidKey): Promise<IDBRequest>{
        const me = this
        return new Promise((resolve,reject) => {
            //get ObjectStore to store data
            const objectStore = me.getObjectStore(objectStoreName, READ_WRITE)
            try{
                //and try to delete it 
                const request = objectStore.delete(keyValue)
                //hendling when insertion is success
                request.onsuccess = function (event) {
                    resolve()
                }
                //and when 
                request.onerror = function(event) {
                    reject(event)
                }
            } catch(error){
                throw error
            }
        })
    }

    /**
     * 
     * @param objectStoreName 
     * @param cursorRange 
     * @param cursorDirection 
     */
    private openCursorInObjectStore(objectStoreName: string, cursorRange?: IDBKeyRange | IDBValidKey, cursorDirection?: IDBCursorDirection): Promise<Object[]>{
        const me = this
        return new Promise((resolve,reject)=>{
            //get ObjectStore to store data
            const objectStore = me.getObjectStore(objectStoreName, READ_WRITE)
            try{
                //and try to delete it 
                const request = objectStore.openCursor(cursorRange, cursorDirection)
                let retrieveObjects = []
                //hendling when insertion is success
                request.onsuccess = function (event) {
                    let cursor = this.result

                    if(cursor){
                        if(cursor.value){
                            retrieveObjects.push(cursor.value)
                            cursor.continue()
                        }
                    } else{
                        resolve(retrieveObjects)
                    }
                }
                //and when 
                request.onerror = function(event) {
                    reject(event)
                }
            } catch(error){
                throw error
            }
        })

    }

    /**
     * 
     * @param objectStoreName 
     * @param keyName 
     */
    private indexInObjectStore(objectStoreName: string, keyName: string): IDBIndex{
        const me = this
        //get ObjectStore to store data
        const objectStore = me.getObjectStore(objectStoreName, READ_WRITE)
        return objectStore.index(keyName)
    }

    /**
     * 
     * @param objectStoreName 
     */
    private clearObjectStore(objectStoreName: string): Promise<IDBRequest> {
        const me = this
        return new Promise((resolve,reject)=>{
            //get ObjectStore to store data
            const objectStore = me.getObjectStore(objectStoreName)
            try{
                //and try to delete it 
                const request = objectStore.clear()
                //hendling when insertion is success
                request.onsuccess = function (event) {
                    resolve(this.result)
                }
                //and when 
                request.onerror = function(event) {
                    reject(event)
                }
            } catch(error){
                throw error
            }
        })
    }

    /**
     * 
     * @param objectStoreName 
     * @param key 
     */
    private countElementsInObjectStore(objectStoreName, key?): Promise<number>{
        const me = this
        return new Promise((resolve,reject)=>{
            //get ObjectStore to store data
            const objectStore = me.getObjectStore(objectStoreName, READ_ONLY)
            try{
                const request = objectStore.count(key)

                request.onsuccess = function (event) {
                    resolve(this.result)
                }
                //and when 
                request.onerror = function(event) {
                    reject(event)
                }
            } catch(error){
                throw error
            }
        })
    }

    /**
     * Class constructor
     */
    constructor(window?: any) {
        if(window){
            this.window = window
        }
    }

    /**
     * Function that open an IndexedDB instance
     * @param databaseName 
     * @param databaseVersion 
     * @param objectStoreSpec 
     */
    public async openIDB(databaseName: string, databaseVersion: number, objectStoreSpec: IObjectStoreSpec[]){
        try{
            await this.openIndexedDB(databaseName, databaseVersion, objectStoreSpec)
        } catch(error){
            throw error
        }
    }

    /**
     * Function that add an element in a specific objectStore 
     * in the database handled by one instance of this class
     * @param objectStoreName 
     * @param item 
     */
    public async add(objectStoreName: string, item: any, keyValue?: IDBKeyRange | IDBValidKey){
        try{
            await this.addItemToObjectStore(objectStoreName, item, keyValue)
        } catch(error){
            throw error
        }
    }

    /**
     * Function that return an item contained in a specific objectStore
     * in the database handled by one instance of this class
     * @param objectStoreName 
     * @param keyValue 
     */
    public async get(objectStoreName: string, keyValue: IDBKeyRange | IDBValidKey) : Promise<Object> {
        try{
            const item = await this.getItemFromObjectStore(objectStoreName, keyValue)
            return item
        } catch(error){
            throw error
        }
    }

    /**
     * Function that update an item contained in a specific objectStore
     * in the database handled by one instance of this class
     * @param objectStoreName 
     * @param item 
     */
    public async put(objectStoreName: string, item: any, keyValue?: IDBKeyRange | IDBValidKey){
        try{
            await this.putItemToObjectStore(objectStoreName, item, keyValue)
        } catch(error){
            throw error
        }
    }
    
    /**
     * 
     * @param objectStoreName 
     * @param keyValue 
     */
    public async delete(objectStoreName: string, keyValue: IDBKeyRange | IDBValidKey){
        try{
            await this.deleteItemFromObjectStore(objectStoreName, keyValue)
        } catch(error){
            throw error
        }
    }
    
    /**
     * 
     * @param objectStoreName 
     */
    public async clear(objectStoreName: string): Promise<IDBRequest> {
        try{
            const request = await this.clearObjectStore(objectStoreName)
            return request
        } catch(error){
            throw error
        }
    }

    /**
     * 
     * @param objectStoreName 
     * @param key 
     */
    public async count(objectStoreName: string, key?: string | number | IDBKeyRange | Date | IDBArrayKey): Promise<number> {
        try{
            const count = await this.countElementsInObjectStore(objectStoreName, key)
            return count
        }catch(error){
            throw error
        }
    }
    
    /**
     * 
     * @param objectStoreName 
     * @param keyName 
     * @param keyValue 
     */
    public async getItemByIndex(objectStoreName: string, keyName: string, keyValue: IDBKeyRange | IDBValidKey): Promise<Object> {
        const index = this.indexInObjectStore(objectStoreName, keyName)
        //create a promise to get the value
        const value = await new Promise((resolve, reject) => {
            const request = index.get(keyValue)

            request.onsuccess = (response) => {
                resolve(request.result)
            }

            request.onerror = (error) => {
                reject(error)
            }
        })
        return value
    }

    public async getItemsByCursor(objectStoreName: string, cursorRange?: IDBKeyRange | IDBValidKey, cursorDirection?: IDBCursorDirection): Promise<Object[]>{
        try{
            const objects = await this.openCursorInObjectStore(objectStoreName, cursorRange, cursorDirection)
            return objects

        } catch(error){
            throw error
        }
    }
}
