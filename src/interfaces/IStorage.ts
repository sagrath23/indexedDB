export interface IItem {
    id: string;
    value: string;
}

export interface IStorage<T extends IItem> {
    // Initial method to create storage
    init(name: string): Observable<IStorage<T>>;

    // Get the value by unique key
    get(key: string): Observable<T>;

    // Clear/remove all data in the storage
    clear(): Observable<T>;

    // Put specific value into the storage
    put(value: T): Observable<T>;

    // Get all values using the set of keys
    getDenseBatch(keys: string[]): Observable<T>;

    // Get all values from the storage
    all(): Observable<T>;
}