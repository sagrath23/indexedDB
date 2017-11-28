//interface to create an index in an objectStore
export interface IIndexDBSpec {
    indexName: string,
    keyPath: string| string[],
    optionalParams: Object
}

export interface IObjectStoreSpec {
    objectStoreName: string,
    objectStoreSettings: IDBObjectStoreParameters
    objectStoreIndexes?: IIndexDBSpec | IIndexDBSpec[]
}