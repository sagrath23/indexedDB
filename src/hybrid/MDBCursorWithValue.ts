import { NEXT } from "../constants/constants";

import { MDBCursor } from './MDBCursor'



export class MDBCursorWithValue extends MDBCursor {

    constructor(request, range = undefined, direction = NEXT){
        super(request, range, direction, true)
    }
}