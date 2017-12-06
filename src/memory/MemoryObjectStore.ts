
export class MemoryObjectStore{
    indexNames: string[]
    keyPath: string | string[]
    name: string;
    autoIncrement: boolean
    objects: Object
    currentKey: number

    constructor(name: string, objectStoreSpec: IDBObjectStoreParameters) {
        this.name = name
        //create object to handle objects to store
        this.objects = {}
        this.keyPath = objectStoreSpec.keyPath? objectStoreSpec.keyPath: null
        this.autoIncrement = objectStoreSpec.autoIncrement? objectStoreSpec.autoIncrement: false
    }

    add(value: any, key?: string | number | IDBKeyRange | Date | IDBArrayKey): void {
        //if aren't provided a key and autoIncrement is false, raise an exception
        if(!this.autoIncrement && !key){
            throw new Error("Failed to execute 'add' on 'MemoryObjectStore': The object store uses out-of-line keys and has no key generator and the key parameter was not provided.")
        }
        //now, if 
        //this.objects[key]
    }

    clear(): IDBRequest {
        throw new Error("Method not implemented.");
    }

    count(key?: string | number | IDBKeyRange | Date | IDBArrayKey): IDBRequest {
        throw new Error("Method not implemented.");
    }

    createIndex(name: string, keyPath: string | string[], optionalParameters?: IDBIndexParameters): IDBIndex {
        throw new Error("Method not implemented.");
    }

    delete(key: string | number | IDBKeyRange | Date | IDBArrayKey): IDBRequest {
        throw new Error("Method not implemented.");
    }

    deleteIndex(indexName: string): void {
        throw new Error("Method not implemented.");
    }

    get(key: any): IDBRequest {
        throw new Error("Method not implemented.");
    }

    index(name: string): IDBIndex {
        throw new Error("Method not implemented.");
    }

    openCursor(range?: string | number | IDBKeyRange | Date | IDBArrayKey, direction?: IDBCursorDirection): IDBRequest {
        throw new Error("Method not implemented.");
    }

    put(value: any, key?: string | number | IDBKeyRange | Date | IDBArrayKey): IDBRequest {
        throw new Error("Method not implemented.");
    }
}