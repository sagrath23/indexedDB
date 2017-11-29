
export interface ISyncStorage {
    add(objectStoreName: string, item: any, keyValue?: IDBKeyRange | IDBValidKey)
    get(objectStoreName: string, keyValue: IDBKeyRange | IDBValidKey) : Promise<Object>
    put(objectStoreName: string, item: any, keyValue?: IDBKeyRange | IDBValidKey)
    delete(objectStoreName: string, keyValue: IDBKeyRange | IDBValidKey)
    openCursor(objectStoreName: string, cursorRange?: IDBKeyRange | IDBValidKey, cursorDirection?: IDBCursorDirection): Promise<IDBCursor>
    index(objectStoreName: string, key: IDBKeyRange | IDBValidKey)
    getItemByIndex(objectStoreName: string, keyName: string, keyValue: IDBKeyRange | IDBValidKey): Object
}
