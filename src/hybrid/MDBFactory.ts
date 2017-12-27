import { MDBOpenDBRequest } from './MDBOpenDBRequest'

export class MDBFactory {

    constructor(){
    }

    public open (name: string, version: number): MDBOpenDBRequest{
        return new MDBOpenDBRequest(name, version)
    }

    public deleteDatabase(name: string): MDBOpenDBRequest{
        return new MDBOpenDBRequest(name, false)
    }

    public static cmp(a: number, b: number): number{
        if(a < b){
            return -1
        } else if(a > b) {
            return 1
        }
        return 0
    }

}