import { IAsyncStorage } from "../interfaces/IAsyncStorage"
//interface to create an index in an objectStore
interface IIndexDBSpec {
    indexName: string,
    keyPath: string| string[],
    optionalParams: Object
}

interface IObjectStoreSpec {
    objectStoreName: string,
    objectStoreSettings: IDBObjectStoreParameters
    objectStoreIndexes?: IIndexDBSpec | IIndexDBSpec[]
}

const READ_ONLY = 'readonly'
const READ_WRITE = 'readwrite'
const VERSION_CHANGE = 'versionchange'
export class IndexedDBStorage {

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
            const request = window.indexedDB.open(me.databaseName, me.databaseVersion)
            
            // this callback is executed, when a new Database is created
            request.onupgradeneeded = function(event) {
                me.databaseCreated = true
                me.database = this.result
                console.info("Database successfully created", "callback onupgradeneeded IndexedDBStorage.openIndexedDB")
                //now, create a objectStore object
                for(const i in me.objectStoreSpec) {
                    //and add the new objectStore to our objectStores object
                    me.createObjectStore(me.database, me.objectStoreSpec[i]);
                }
                resolve(this.result)
            }
    
            // this callback is executed when the database exists an it's opened
            // if the database doesn't exist, then execute onupgradeneeded callback first, and this later
            request.onsuccess = function(event) {
                console.info("Database is Open", "callback onsuccess IndexedDBStorage.openIndexedDB")
                if(!me.databaseCreated){
                    me.database = this.result
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
        })
    }

    /**
     * Function that create a new IDBObjectStore in the specified database
     * @param database 
     * @param objectStoreSpec 
     */
    private createObjectStore(database: IDBDatabase, objectStoreSpec: IObjectStoreSpec): void{
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
    }

    /**
     * Function that open an existing IDBObjectStore i the specified database
     * @param objectStoreSpec 
     */
    private getObjectStore(objectStoreName: string): IDBObjectStore{
        try{
            //open the object Store from IndexedDB instance
            //create a transaction in the database
            const transaction = this.database.transaction(objectStoreName, READ_WRITE)
            //and return the objectStore specified
            return transaction.objectStore(objectStoreName)
        } catch(error){
            console.error(error)
            throw error
        }
    }

    private addItemToObjectStore(objectStoreName: string, item: any): Promise<IDBRequest> {
        const me = this
        return new Promise((resolve,reject) => {
            //get ObjectStore to store data
            const objectStore = me.getObjectStore(objectStoreName)
            try{
                //and try to add it 
                const request = objectStore.add(item)
                //hendling when insertion is success
                request.onsuccess = function (event) {
                    console.log("Insertion in DB successful")
                    resolve()
                }
                //and when 
                request.onerror = function() {
                    console.error("addPublication error", this.error);
                    reject()
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
     * Class constructor
     */
    constructor() {
    }

    /**
     * Function that open an IndexedDB instance
     * @param databaseName 
     * @param databaseVersion 
     * @param objectStoreSpec 
     */
    public async openIDB(databaseName: string, databaseVersion: number, objectStoreSpec: IObjectStoreSpec[]){
        console.log("start to open the IDB...", "IndexedDBStorage.openIDB")
        await this.openIndexedDB(databaseName, databaseVersion, objectStoreSpec)
    }

    /**
     * Function that add an element in a specific objectStore 
     * in the database handled by one instance of this class
     * @param objectStoreName 
     * @param item 
     */
    public async add(objectStoreName: string, item: any){
        try{
            await this.addItemToObjectStore(objectStoreName, item)
        } catch(error){
            throw error
        }
    }

}
