import { IAsyncStorage } from "../interfaces/IAsyncStorage"
import {IIndexDBSpec,IObjectStoreSpec} from "../interfaces/IObjectStoreSpec"

//transaction modes
const READ_ONLY = 'readonly'
const READ_WRITE = 'readwrite'
const VERSION_CHANGE = 'versionchange'
//transaction types
const ADD = 'add'
const GET = 'get'
const DELETE = 'delete'
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

        console.log("creating promise...", "IndexedDBStorage.openIndexedDB")
        return new Promise((resolve, reject) => {
            console.log("opening IDB Database...", "IndexedDBStorage.openIndexedDB")
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
                console.info("Database successfully created", "callback onupgradeneeded IndexedDBStorage.openIndexedDB")
                //now, create a objectStore object
                for(const i in me.objectStoreSpec) {
                    //and add the new objectStore to our objectStores object
                    me.createObjectStore(me.database, me.objectStoreSpec[i]);
                    /*
                    console.log(`creating objectStore ${objectStoreSpec[i].objectStoreName}`)        
                    //create objectStore
                    const objectStore = me.database.createObjectStore(objectStoreSpec[i].objectStoreName,objectStoreSpec[i].objectStoreSettings)
                    //and create index if are defined
                    if(objectStoreSpec[i].objectStoreIndexes){
                        for (const j in objectStoreSpec[i].objectStoreIndexes) {
                            //create index
                            console.log(`creating index ${objectStoreSpec[i].objectStoreIndexes[j].indexName} for objectStore ${objectStoreSpec[i].objectStoreName}`)
                            objectStore.createIndex(objectStoreSpec[i].objectStoreIndexes[j].indexName, objectStoreSpec[i].objectStoreIndexes[j].keyPath, objectStoreSpec[i].objectStoreIndexes[j].optionalParams)
                        }
                    }
                    */
                }
            }
    
            // this callback is executed when the database exists an it's opened
            // if the database doesn't exist, then execute onupgradeneeded callback first, and this later
            request.onsuccess = function(event) {
                console.info("Database is Open", "callback onsuccess IndexedDBStorage.openIndexedDB")
                if(!me.databaseCreated){
                    me.database = this.result
                }
                resolve()
            }
    
            // this callback is executed when the database is open
            request.onblocked = function(event) {
                console.warn("Database is blocked")
                reject(event)
            }
    
            // if an error happened, reject the promise
            request.onerror = function(event){
                console.error("Database couldn't be opened")
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
        console.log(`creating objectStore ${objectStoreSpec.objectStoreName}`)        
        //create objectStore
        const objectStore = database.createObjectStore(objectStoreSpec.objectStoreName,objectStoreSpec.objectStoreSettings)
        //and create index if are defined
        if(objectStoreSpec.objectStoreIndexes){
            for (const i in objectStoreSpec.objectStoreIndexes) {
                //create index
                console.log(`creating index ${objectStoreSpec.objectStoreIndexes[i].indexName} for objectStore ${objectStoreSpec.objectStoreName}`)
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
            console.error(error, "IndexedDBStore.getObjectStore")
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
                console.log("trying to insert data")
                if(keyValue){
                    request = objectStore.add(item, keyValue)
                } else {
                    request = objectStore.add(item)
                }
                console.log("generate request")
                //hendling when insertion is success
                request.onsuccess = function (event) {
                    console.log("Insertion in DB successful")
                    resolve()
                }
                //and when 
                request.onerror = function() {
                    console.error("Insertion failed", this.error);
                    reject()
                }

            } catch(error){
                if (error.name == 'DataCloneError'){
                    console.error("This engine doesn't know how to clone a Blob, use Firefox or Chrome")
                }
                console.log(error, "IndexedDBStorage.addItemToObjectStore")
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
                    if(this.result){
                        console.log(`object ${keyValue} founded in ${objectStoreName} objectStore`)
                    } else {
                        console.log(`object ${keyValue} not founded in ${objectStoreName} objectStore`)
                    }
                    
                    resolve(this.result)
                }
                //and when 
                request.onerror = function() {
                    console.log(`error trying to get ${keyValue} item in ${objectStoreName} objectStore: `, this.error)
                    reject()
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
                if(keyValue){
                    request = objectStore.put(item, keyValue)
                } else {
                    request = objectStore.put(item)
                }
                //hendling when insertion is success
                request.onsuccess = function (event) {
                    console.log(`object ${item} updated in ${objectStoreName} objectStore`)
                    resolve()
                }
                //and when 
                request.onerror = function() {
                    console.error("Update failed", this.error);
                    reject()
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
                    console.log(`Object ${keyValue} deleted from ${objectStoreName} objectStore`)
                    resolve()
                }
                //and when 
                request.onerror = function() {
                    console.log(`error trying to delete ${keyValue}: `, this.error)
                    reject()
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
    private openCursorInObjectStore(objectStoreName: string, cursorRange?: IDBKeyRange | IDBValidKey, cursorDirection?: IDBCursorDirection): Promise<IDBCursor>{
        const me = this
        return new Promise((resolve,reject)=>{
            //get ObjectStore to store data
            const objectStore = me.getObjectStore(objectStoreName, READ_WRITE)
            try{
                //and try to delete it 
                const request = objectStore.openCursor(cursorRange, cursorDirection)
                //hendling when insertion is success
                request.onsuccess = function (event) {
                    console.log(`cursor opened for ${objectStoreName} objectStore`)
                    resolve(this.result)
                }
                //and when 
                request.onerror = function() {
                    console.log(`error trying to open a cursor on ${objectStoreName} objectStore: `, this.error)
                    reject()
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
                    console.log(`objectStore ${objectStoreName} cleared.`)
                    resolve(this.result)
                }
                //and when 
                request.onerror = function() {
                    console.log(`error trying to clear ${objectStoreName} objectStore`, this.error)
                    reject()
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
                    console.log(`objectStore ${objectStoreName} has ${this.result} elements`)
                    resolve(this.result)
                }
                //and when 
                request.onerror = function() {
                    console.error(`error trying to count elements in ${objectStoreName} objectStore: `, this.error);
                    reject()
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
        console.log("start to open the IDB...", "IndexedDBStorage.openIDB")
        try{
            await this.openIndexedDB(databaseName, databaseVersion, objectStoreSpec)
            console.log("database open finished.", "IndexedDBStorage.openIDB")
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
            console.log("inserting...")
            await this.addItemToObjectStore(objectStoreName, item, keyValue)
        } catch(error){
            console.log(error, "IndexedDBStorage.add")
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
     * @param cursorRange 
     * @param cursorDirection 
     */
    public async openCursor(objectStoreName: string, cursorRange?: IDBKeyRange | IDBValidKey, cursorDirection?: IDBCursorDirection): Promise<IDBCursor> {
        try{
            const cursor = await this.openCursorInObjectStore(objectStoreName, cursorRange, cursorDirection)
            return cursor
        } catch(error){
            throw error
        }
    }

    /**
     * 
     * @param objectStoreName 
     * @param keyName 
     */
    public index(objectStoreName: string, keyName: string): IDBIndex {
        return this.indexInObjectStore(objectStoreName, keyName)
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
        const index = this.index(objectStoreName, keyName)
        return await index.get(keyValue)
    }
}
