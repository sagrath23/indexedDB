import { Helper } from "./Helper";
import { MDBTransaction } from "./MDBTransaction";



export class MDBDatabase {

    private name: string
    private version: number
    private objectStoreNames: Array<string>
    private _data: any
    //Database status variables
    private queue: Array<MDBTransaction>
    private closed: boolean
    private closing: boolean
    private active: MDBTransaction

    private assignObjectStoresNames(data: any): void {
        const names = Object.keys(data)
        names.sort()
        this.objectStoreNames = names
    }

    constructor(dbName: string, version: number, data: any){
        // Check params.
        if (!Helper.validIdentifier(dbName)) throw new TypeError('MDBDatabase: dbName must be a valid identifier');
        if (!Helper.validVersion(version)) throw new TypeError('MDBDatabase: version must be a valid version');
        if (!(data instanceof Object)) throw new TypeError('MDBDatabase: data must be an object');
        if (data.constructor !== Object) throw new TypeError('MDBDatabase: data must be a plain object');

        this.assignObjectStoresNames(data)

        const dataHandler = {
            get: () => {
                if (closed){
                    throw new Error('MDBDatabase: _data cannot be accessed after connection has closed')
                }
                return data;
            },
            set: () => {
                throw new Error('IDBDatabase: _data is read only')
            }
        }

        this._data = new Proxy(this._data, dataHandler)

    }

    // Create a transaction on this database that accesses one or more stores.
    public transaction(storeNames, mode) {
        // Check params.
        if (typeof storeNames === 'string') storeNames = [storeNames];
        if (!(storeNames instanceof Array)) throw new TypeError('IDBDatabase.transaction(): storeNames must be string or array');
        if (!storeNames.length) throw new TypeError('IDBDatabase.transaction(): storeNames cannot be empty');
        for (let i = 0; i < storeNames.length; i++)
            if (!validIdentifier(storeNames[i])) throw new TypeError('IDBDatabase.transaction(): storeNames must only include valid identifiers');
        if (!('length' in storeNames) || !storeNames.length) throw new TypeError('IDBDatabase.transaction(): storeNames must be an identifier or non-empty array of identifiers');
        if (mode !== 'readonly' && mode !== 'readwrite') throw new TypeError('IDBDatabase.transaction(): mode must be readwrite or readonly');

        // Check state.
        if (closed) throw new DOMException('IDBDatabase.transaction(): Database connection is closed', 'InvalidStateError');
        if (closing) throw new DOMException('IDBDatabase.transaction(): Database connection is closing', 'InvalidStateError');

        // In 20ms run the database, to run this pending transaction.
        if (!timeout) setTimeout(run, 20);

        // Return new transaction.
        const transaction = new IDBTransaction(this, storeNames, mode);
        queue.push(transaction);
        return transaction;
    }

    // Create a 'versionchange' transaction on this database.
    public  _upgradeTransaction() {
        // Check state.
        if (closed) throw new DOMException('IDBDatabase._upgradeTransaction(): Database connection is closed', 'InvalidStateError');
        if (closing) throw new DOMException('IDBDatabase._upgradeTransaction(): Database connection is closing', 'InvalidStateError');
        if (queue.length) throw new DOMException('IDBDatabase._upgradeTransaction(): Database connection already has transactions', 'InvalidStateError');

        // Return new transaction.
        const transaction = new IDBTransaction(this, [], 'versionchange');
        queue.push(transaction);
        return transaction;
    }

    // Create object store.
    public createObjectStore(storeName, { keyPath = null, autoIncrement = false } = { keyPath: null, autoIncrement: false }) {
        // Check params.
        if (!validIdentifier(storeName)) throw new TypeError('IDBDatabase.createObjectStore(): storeName must be valid identifier');
        if (!validKeyPath(keyPath) && keyPath !== null) throw new TypeError('IDBDatabase.createObjectStore(): keyPath must be a valid keyPath or null');
        if (typeof autoIncrement !== 'boolean') throw new TypeError('IDBDatabase.createObjectStore(): autoIncrement must be boolean');

        // Check state.
        if (closed) throw new DOMException('IDBDatabase.transaction(): Database connection is closed', 'InvalidStateError');
        if (!active) throw new DOMException('IDBDatabase.createObjectStore(): Can only be used used when a transaction is running', 'InvalidStateError');
        if (active.mode !== 'versionchange') throw new DOMException('IDBDatabase.createObjectStore(): Can only be used used within an active \'versionchange\' transaction, not \'' + active.mode + '\'', 'InvalidStateError');
        if (active._data[storeName]) throw new DOMException('IDBDatabase.createObjectStore(): Object store \'' + storeName + '\' already exists', 'ConstraintError');

        // Create a plain data template for this object store.
        active._data[storeName] = { records: new Map, indexes: {}, key: 0, keyPath, autoIncrement };

        // Make and return the new IDBObjectStore.
        return new IDBObjectStore(active, storeName);
    }

    // Delete object store.
    public deleteObjectStore(storeName) {
        // Check params.
        if (!validIdentifier(storeName)) throw new TypeError('IDBDatabase.deleteObjectStore(): storeName must be valid identifier');

        // Check state.
        if (closed) throw new DOMException('IDBDatabase.deleteObjectStore(): Database connection is closed', 'InvalidStateError');
        if (!active) throw new DOMException('IDBDatabase.deleteObjectStore(): Can only be used used within an active \'versionchange\' transaction', 'InvalidStateError');
        if (active.mode !== 'versionchange') throw new DOMException('IDBDatabase.deleteObjectStore(): Can only be used used within an active \'versionchange\' transaction', 'InvalidStateError');
        if (!active._data[storeName]) throw new DOMException('IDBDatabase.deleteObjectStore(): Object store \'' + storeName + '\' does not exist', 'NotFoundError');

        // Delete the object store on the transaction.
        delete active._data[storeName];
    }

    // Close the connection to this database.
    // This will block any more transactions from being opened.
    public close() {
        // Check state.
        if (closed) throw new DOMException('IDBDatabase.close(): Database connection is closed', 'InvalidStateError');
        if (closing) return; // Already closing.

        // Close is pending.
        // Blocks any new transactions from being made.
        closing = true;

        // Run any remaining transactions before we close.
        run();

        // Closed.
        closed = true;

        // Remove this connection from connections list.
        connections[dbName] = connections[dbName].filter(connection => connection !== this);

        // Event.
        this.dispatchEvent(new Event('close', { bubbles: true }));
    }

    // Run any pending transactions.
    public _run(): void {
        // Check state.
        if (closed) throw new DOMException('IDBDatabase._run(): Database connection is closed', 'InvalidStateError');

        // Stop run() running run again in future.
        clearTimeout(timeout);
        timeout = false;

        // Run each transaction.
        while (queue.length) {
            // Activate and run.
            active = queue.shift();
            active._run();
            active = null;
        }
    }
}