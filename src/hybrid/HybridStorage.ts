import {IndexedDBStorage} from '../indexedDB/IndexedDBStorage'
import {MemoryStorage} from '../memory/MemoryStorage'
import { ISyncStorage } from '../interfaces/ISyncStorage';
import { IAsyncStorage } from '../interfaces/IAsyncStorage';

export class HybridStorage {
    private memoryStorage: MemoryStorage
    private dbStorage: IndexedDBStorage

    constructor(){
        this.memoryStorage = new MemoryStorage("Memory")
        this.dbStorage = new IndexedDBStorage()
        //start to open database 
        this.dbStorage.openIDB("Memory",1,[{objectStoreName: "objectStoreTest", objectStoreSettings: {keyPath: "id", autoIncrement: true}}])
    }

    public add()
}
