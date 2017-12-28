import { NEXT } from "../constants/constants"
import { MDBRequest } from "./MDBRequest"
import { MDBObjectStore } from "./MDBObjectStore"
import { Helper } from "./Helper";



export class MDBCursor {
    
    constructor(request: MDBRequest, range = undefined, direction = NEXT, withValue = false){
        // Check params.
        if (!(request instanceof MDBRequest)) throw new TypeError('MDBCursor: request must be an MDBRequest');
        if (!(request.source instanceof MDBObjectStore) && !(request.source instanceof IDBIndex)) throw new TypeError('MDBCursor: request must have a source that must be an IDBObjectStore or an IDBIndex');
        if (direction !== 'next' && direction !== 'nextunique' && direction !== 'prev' && direction !== 'prevunique') throw new TypeError('MDBCursor: direction must be one of \'next\', \'nextunique\', \'prev\', \'prevunique\'');
        if (!Helper.validKey(range) && !Helper.validKeyRange(range) && range !== undefined) throw new TypeError('MDBCursor: range must be a valid key (string, number, date), key range (array, MDBKeyRange), or undefined');

    }
}