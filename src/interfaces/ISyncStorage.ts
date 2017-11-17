
export interface ISyncStorage {
    /** basic Storage interface functions */

    // Clear/remove all data in the storage
    clear(): void
    // get an element into the storage
    // tslint:disable-next-line:ban-types
    getItem(key: string): Object
    // get a key in a specific position
    key(position: number): string
    // remove a item from storage
    removeItem(key: string): void
    // set an element into the storage
    // tslint:disable-next-line:ban-types
    setItem(key: string, value: Object): void

    /** Additional Storage functions */
    // Get all values using the set of keys
    // tslint:disable-next-line:ban-types
    getDenseBatch(keys: string[]): Object[]
    // Get all values from the storage
    // tslint:disable-next-line:ban-types
    getAll(): Object[]
}
