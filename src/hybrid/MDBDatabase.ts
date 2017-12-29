import { Helper } from "./Helper";
import { MDBTransaction } from "./MDBTransaction";
import { MDBObjectStore } from "./MDBObjectStore"
import {READ_ONLY, READ_WRITE, VERSION_CHANGE} from "../constants/constants"



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

        //TODO: figure out how to use a proxy to avoid direct access to _data & objectStoreNames
        this._data = data
    }

    // Create a transaction on this database that accesses one or more stores.
    public transaction(storeNames, mode) {
        // Check params.
        if (typeof storeNames === 'string') storeNames = [storeNames];
        if (!(storeNames instanceof Array)) throw new TypeError('MDBDatabase.transaction(): storeNames must be string or array');
        if (!storeNames.length) throw new TypeError('MDBDatabase.transaction(): storeNames cannot be empty');
        for (let i = 0; i < storeNames.length; i++)
            if (!Helper.validIdentifier(storeNames[i])) throw new TypeError('MDBDatabase.transaction(): storeNames must only include valid identifiers');
        if (!('length' in storeNames) || !storeNames.length) throw new TypeError('MDBDatabase.transaction(): storeNames must be an identifier or non-empty array of identifiers');
        if (mode !== READ_ONLY && mode !== READ_WRITE) throw new TypeError('MDBDatabase.transaction(): mode must be readwrite or readonly');

        // Check state.
        if (this.closed) throw new DOMException('MDBDatabase.transaction(): Database connection is closed', 'InvalidStateError');
        if (this.closing) throw new DOMException('MDBDatabase.transaction(): Database connection is closing', 'InvalidStateError');

        //TODO: figure out if it's necessary define a timeout to 
        //run all the transactions stored in queue

        // In 20ms run the database, to run this pending transaction.
        //if (!timeout) setTimeout(run, 20);

        // Return new transaction.
        const transaction = new MDBTransaction(this, storeNames, mode);
        this.queue.push(transaction);
        return transaction;
    }

    // Create a VERSION_CHANGE transaction on this database.
    public  _upgradeTransaction() {
        // Check state.
        if (this.closed) throw new DOMException('MDBDatabase._upgradeTransaction(): Database connection is closed', 'InvalidStateError');
        if (this.closing) throw new DOMException('MDBDatabase._upgradeTransaction(): Database connection is closing', 'InvalidStateError');
        if (this.queue.length) throw new DOMException('MDBDatabase._upgradeTransaction(): Database connection already has transactions', 'InvalidStateError');

        // Return new transaction.
        const transaction = new MDBTransaction(this, [], VERSION_CHANGE);
        this.queue.push(transaction);
        return transaction;
    }

    // Create object store.
    public createObjectStore(storeName, { keyPath = null, autoIncrement = false } = { keyPath: null, autoIncrement: false }) {
        // Check params.
        if (!Helper.validIdentifier(storeName)) throw new TypeError('MDBDatabase.createObjectStore(): storeName must be valid identifier');
        if (!Helper.validKeyPath(keyPath) && keyPath !== null) throw new TypeError('MDBDatabase.createObjectStore(): keyPath must be a valid keyPath or null');
        if (typeof autoIncrement !== 'boolean') throw new TypeError('MDBDatabase.createObjectStore(): autoIncrement must be boolean');

        // Check state.
        if (this.closed) throw new DOMException('MDBDatabase.transaction(): Database connection is closed', 'InvalidStateError');
        if (!this.active) throw new DOMException('MDBDatabase.createObjectStore(): Can only be used used when a transaction is running', 'InvalidStateError');
        if (this.active.mode !== VERSION_CHANGE) throw new DOMException('MDBDatabase.createObjectStore(): Can only be used used within an active \'versionchange\' transaction, not \'' + active.mode + '\'', 'InvalidStateError');
        if (this.active._data[storeName]) throw new DOMException('MDBDatabase.createObjectStore(): Object store \'' + storeName + '\' already exists', 'ConstraintError');

        // Create a plain data template for this object store.
        this.active._data[storeName] = { records: new Map, indexes: {}, key: 0, keyPath, autoIncrement };

        // Make and return the new IDBObjectStore.
        return new MDBObjectStore(this.active, storeName);
    }

    // Delete object store.
    public deleteObjectStore(storeName) {
        // Check params.
        if (!Helper.validIdentifier(storeName)) throw new TypeError('MDBDatabase.deleteObjectStore(): storeName must be valid identifier');

        // Check state.
        if (this.closed) throw new DOMException('MDBDatabase.deleteObjectStore(): Database connection is closed', 'InvalidStateError');
        if (!this.active) throw new DOMException('MDBDatabase.deleteObjectStore(): Can only be used used within an active \'versionchange\' transaction', 'InvalidStateError');
        if (this.active.mode !== VERSION_CHANGE) throw new DOMException('MDBDatabase.deleteObjectStore(): Can only be used used within an active \'versionchange\' transaction', 'InvalidStateError');
        if (!this.active._data[storeName]) throw new DOMException('MDBDatabase.deleteObjectStore(): Object store \'' + storeName + '\' does not exist', 'NotFoundError');

        // Delete the object store on the transaction.
        delete this.active._data[storeName];
    }

    // Close the connection to this database.
    // This will block any more transactions from being opened.
    public close() {
        // Check state.
        if (this.closed) throw new DOMException('MDBDatabase.close(): Database connection is closed', 'InvalidStateError');
        if (this.closing) return; // Already closing.

        // Close is pending.
        // Blocks any new transactions from being made.
        this.closing = true;

        // Run any remaining transactions before we close.
        this._run();

        // Closed.
        closed = true;

        // Remove this connection from connections list.
        //TODO: make connections as a global object 
        connections[dbName] = connections[dbName].filter(connection => connection !== this);
    }

    // Run any pending transactions.
    public _run(): void {
        // Check state.
        if (this.closed) throw new DOMException('MDBDatabase._run(): Database connection is closed', 'InvalidStateError');

        // Run each transaction.
        while (this.queue.length) {
            // Activate and run.
            this.active = this.queue.shift();
            this.active._run();
            this.active = null;
        }
    }
}