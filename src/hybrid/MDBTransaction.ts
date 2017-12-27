import {READ_ONLY, READ_WRITE, VERSION_CHANGE} from '../constants/constants'
import { MDBDatabase } from './MDBDatabase'

export class MDBTransaction {

    constructor(db: MDBDatabase, storeNames: string | string[], mode: string = READ_ONLY){

    }
}