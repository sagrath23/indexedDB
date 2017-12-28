import { MDBObjectStore } from "./MDBObjectStore";
import { Helper } from "./Helper";


export class MDBIndex {

    constructor(store: MDBObjectStore, indexName: string){
        // Check params.
        if (!(store instanceof IDBObjectStore)) throw new TypeError('MDBIndex: store must be an MDBObjectStore');
        if (!Helper.validIdentifier(indexName)) throw new TypeError('MDBIndex: indexName must be a valid identifier');

    }
}