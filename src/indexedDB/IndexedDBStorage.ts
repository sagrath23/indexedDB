import { IAsyncStorage } from "../interfaces/IAsyncStorage"
//interface to create an index in an objectStore
interface IIndexDB {
    indexName: string,
    keyPath: string| string[],
    optionalParams: Object
}

interface IObjectStoreSpec {
    objectStoreName: string,
    objectStoreSettings: IDBObjectStoreParameters
    objectStoreIndexes?: IIndexDB | IIndexDB[]
}

const READ_ONLY = 'readonly'
const READ_WRITE = 'readwrite'
const VERSION_CHANGE = 'versionchange'
export class IndexedDBStorage {

    private databaseName: string
    private databaseVersion: number
    private database: IDBDatabase
    private objectStores: Object
    private objectStoreSpec: IObjectStoreSpec | IObjectStoreSpec[]

    /**
     * Class constructor
     * @param databaseSettings 
     */
    constructor() {
    }

    public async openIDB(databaseName: string, databaseVersion: number, objectStoreSpec: IObjectStoreSpec | IObjectStoreSpec[]){
        const me = this
        console.log("start to open the IDB...", "IndexedDBStorage.openIDB")
        await this.openIndexedDB(databaseName, databaseVersion, objectStoreSpec)
    }

    private openIndexedDB(databaseName: string, databaseVersion: number, objectStoreSpec: IObjectStoreSpec | IObjectStoreSpec[]): Promise<IDBDatabase>{
        const me = this
        let databaseCreated = false

        me.databaseName = databaseName
        me.databaseVersion = databaseVersion

        me.objectStoreSpec = objectStoreSpec

        console.log("creating promise...", "IndexedDBStorage.openIndexedDB")
        return new Promise(me.promiseHandler)
    }

    private promiseHandler(resolve:Function, reject: Function) {
        const me = this
        let databaseCreated = false

        console.log("opening IDB Database...", "IndexedDBStorage.promiseHandler ")
        //start to open the database
        const request = window.indexedDB.open(me.databaseName, me.databaseVersion)
        
        // this callback is executed, when a new Database is created
        request.onupgradeneeded = function(event) {
            databaseCreated = true
            me.database = this.result
            console.info("Database successfully created")
            //now, create a objectStore object
            for(const i in me.objectStoreSpec) {
                me.createObjectStore(this.result, me.objectStoreSpec[i]);
            }
            resolve(this.result)
        }

        // this callback is executed when the database exists an it's opened
        // if the database doesn't exist, then execute onupgradeneeded callback first, and this later
        request.onsuccess = function(event) {
            console.info("Database is Open")
            if(!databaseCreated){
                me.database = this.result
                //if database exist in window, then load objectStores to our objectStores Object
                for(const i in me.objectStoreSpec) {
                    me.objectStores[me.objectStoreSpec[i].objectStoreName] = me.getObjectStore(me.objectStoreSpec[i]);
                }
            }
            resolve(this.result)
        }

        // this callback is executed when the database is open
        request.onblocked = function(event) {
            console.warn("Database is opened")
            reject(event)
        }

        // if an error happened, reject the promise
        request.onerror = function(event){
            console.error("Database couldn't be opened")
            reject(event)
        }
    }
    
    private createObjectStore(database: IDBDatabase, objectStoreSpec: IObjectStoreSpec){
        console.log("creating objectStore "+objectStoreSpec.objectStoreName, "IndexedDBStorage.createObjectStore")
        //create objectStore
        const objectStore = database.createObjectStore(objectStoreSpec.objectStoreName,objectStoreSpec.objectStoreSettings)
        //and create index if are defined
        if(objectStoreSpec.objectStoreIndexes){
            for (const i in objectStoreSpec.objectStoreIndexes) {
                //create index
                console.log("creating index "+objectStoreSpec.objectStoreIndexes[i].indexName+" for objectStore "+objectStoreSpec.objectStoreName, "IndexedDBStorage.createObjectStore")
                objectStore.createIndex(objectStoreSpec.objectStoreIndexes[i].indexName, objectStoreSpec.objectStoreIndexes[i].keyPath, objectStoreSpec.objectStoreIndexes[i].optionalParams)
            }
        }
        //and add the new objectStore to our objectStores object
        this.objectStores[objectStoreSpec.objectStoreName] = objectStore
    }

    private getObjectStore(objectStoreSpec: IObjectStoreSpec): IDBObjectStore{
        //create a transaction in the database
        const transaction = this.database.transaction(this.databaseName, READ_WRITE)
        //and return the objectStore specified
        return transaction.objectStore(objectStoreSpec.objectStoreName)
    }
}
