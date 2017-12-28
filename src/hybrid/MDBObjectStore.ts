import { MDBTransaction } from './MDBTransaction'
import { Helper } from './Helper';

export class MDBObjectStore {

    private keyPath
    private autoIncrement


    constructor(transaction: MDBTransaction, storeName: string) {
        // Check params.
        if (!(transaction instanceof IDBTransaction)) throw new TypeError('MDBObjectStore: transaction must be a transaction');
        if (!Helper.validIdentifier(storeName)) throw new TypeError('MDBObjectStore: storeName must be valid identifier');

        // Check state.
        if (transaction._finished) throw new DOMException('MDBObjectStore: Transaction has finished', 'InvalidStateError');
        if (!transaction._data[storeName]) throw new DOMException('MDBObjectStore: Object store \'' + storeName + '\' does not exist', 'InvalidStateError');

    }
}