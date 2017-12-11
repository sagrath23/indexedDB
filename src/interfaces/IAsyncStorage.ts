import {IObjectStoreSpec} from './IObjectStoreSpec'
export interface IAsyncStorage {
    openIDB(databaseName: string, databaseVersion: number, objectStoreSpec: IObjectStoreSpec[])
    add(objectStoreName: string, item: any, keyValue?: IDBKeyRange | IDBValidKey)
    get(objectStoreName: string, keyValue: IDBKeyRange | IDBValidKey) : Promise<Object>
    put(objectStoreName: string, item: any, keyValue?: IDBKeyRange | IDBValidKey)
    delete(objectStoreName: string, keyValue: IDBKeyRange | IDBValidKey)
    getItemByIndex(objectStoreName: string, keyName: string, keyValue: IDBKeyRange | IDBValidKey): Promise<Object>
    getItemsByCursor(objectStoreName: string, cursorRange?: IDBKeyRange | IDBValidKey, cursorDirection?: IDBCursorDirection): Promise<Object[]>
}
