import { Helper } from "./Helper"
import {READ_ONLY, READ_WRITE, VERSION_CHANGE} from "../constants/constants"
import { MDBDatabase } from "./MDBDatabase"
import { MDBObjectStore } from "./MDBObjectStore"
import { MDBRequest } from "./MDBRequest";

export class MDBTransaction {

    private db: MDBDatabase
    private mode: string
    private objectStoreNames: Array<string>
    private error: Error
    private _finished: boolean
    private aborted: boolean
    private active: MDBRequest
    private _data: any
    private queue: Array<MDBRequest>

    constructor(db: MDBDatabase, storeNames: string | string[], mode: string = READ_ONLY){
        // Check params.
        if (!(db instanceof IDBDatabase)) throw new TypeError('MDBTransaction: db must be an IDBDatabase');
        if (!(storeNames instanceof Array)) throw new TypeError('MDBTransaction: storeNames must be array');
        for (let i = 0; i < storeNames.length; i++)
            if (!Helper.validIdentifier(storeNames[i])) throw new TypeError('MDBTransaction: storeNames must only include valid identifiers');
        if (mode !== READ_ONLY && mode !== READ_WRITE && mode !== VERSION_CHANGE) throw new TypeError('MDBTransaction: mode must be readwrite, readonly, or versionchange');

        //TODO: figure out how to use proxy object to error, _finished and _data

    }

    
    // Get object store.
    public objectStore(storeName: string): MDBObjectStore {
        // Check params.
        if (!Helper.validIdentifier(storeName)) throw new TypeError('MDBTransaction.objectStore(): storeName must be valid identifier');

        // Check state.
        if (this._finished) throw new DOMException('MDBTransaction.objectStore(): Transaction has already finished', 'InvalidStateError');
        if (this.objectStoreNames.indexOf(storeName) < 0) throw new DOMException('MDBTransaction.objectStore(): Object store is not in this transaction\'s scope', 'NotFoundError');
        if (!this._data[storeName]) throw new DOMException('MDBTransaction.objectStore(): Object store \'' + storeName + '\' does not exist', 'NotFoundError');

        // Make a new IDBObjectStore instance.
        // Add it to the list of instantiated object stores and return it.
        //TODO: Make stores variable global
        if (!stores[storeName]) stores[storeName] = new MDBObjectStore(this, storeName);
        return stores[storeName];
    }

    // Abort this transaction.
    // Means that changes made by this transaction won't be committed.
    public abort(): void {
        // Checks.
        if (this._finished) throw new DOMException('MDBTransaction.abort(): Transaction has already finished', 'InvalidStateError');

        // Aborted.
        this._finished = true;
        this.aborted = true;
    }

    // Add a request to this transaction.
    public _request(input, callback): MDBRequest {
        // Checks.
        if (this._finished) throw new DOMException('MDBTransaction: Cannot create request when transaction has already finished', 'InvalidStateError');

        // New or existing request.
        if (input instanceof MDBRequest) {
            // Existing request.
            this.queue.push(input);
            return input;
        } else {
            // Create request, add to queue, and return it.
            const request = new MDBRequest(input, callback);
            this.queue.push(request);
            return request;
        }
    }

    // Run this transaction.
    public _run() {
        // Check state.
        if (this._finished) throw new DOMException('MDBTransaction._run(): Transaction has already finished', 'InvalidStateError');
        if (this.active) throw new DOMException('MDBTransaction._run(): Transaction is currently running', 'InvalidStateError');

        // Make a clone of data.
        const original = this._data;
        this._data = {};
        for (const store in original) {
            // Clone the records Map (manually).
            this._data[store] = Object.assign({}, original[store], {
                records: new Map(original[store].records),
                indexes: Object.assign({}, original[store].indexes),
            });
        }

        // Run each request in the request queue.
        while (!this.aborted && this.queue.length) {
            // Activate and run.
            this.active = this.queue.shift();
            this.active._run();
            this.active = false;
        }

        // Finished.
        this._finished = true;

        // Was it aborted?
        if (this.aborted) {
            // Abort any pending queue.
            while (this.queue.length) this.queue.shift()._abort();
        } else {
            // Commit the changes back into the database.
            for (const store in original) delete original[store];
            for (const store in this._data) original[store] = this._data[store];
        }
    }
}
