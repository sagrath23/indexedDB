import { Helper } from './Helper'

export class MDBOpenDBRequest {

    constructor(dbName: string, version: number | boolean){
        //check inputs
        if (!Helper.validIdentifier(dbName)){
            throw new TypeError('MDBOpenDBRequest: dbName must be valid identifier')
        }
        
        if (!Helper.validVersion(version) && version !== false){
            throw new TypeError('MDBOpenDBRequest: version must be a valid version or false');
        } 



    }
}