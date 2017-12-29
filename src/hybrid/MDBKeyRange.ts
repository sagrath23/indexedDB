import { Helper } from "./Helper";

type RangeType = number | string | Date 
export class MDBKeyRange {

    private lower: RangeType
    private upper: RangeType
    private lowerOpen: boolean
    private upperOpen: boolean

    private static checkInputs(lower: RangeType, upper: RangeType, lowerOpen = false, upperOpen = false){
        if (!Helper.validKey(lower) && lower !== undefined) throw new DOMException('IDBKeyRange: lower must be a valid key (string, number, date) or undefined', 'DataError');
        if (!Helper.validKey(upper) && upper !== undefined) throw new DOMException('IDBKeyRange: upper must be a valid key (string, number, date) or undefined', 'DataError');
        if (typeof lowerOpen !== 'boolean') throw new DOMException('IDBKeyRange: lowerOpen must be boolean', 'DataError');
        if (typeof upperOpen !== 'boolean') throw new DOMException('IDBKeyRange: upperOpen must be boolean', 'DataError');
        if (lower > upper) throw new DOMException('IDBKeyRange: lower must be lower than upper', 'DataError');
    }
    
    constructor(lower: RangeType, upper: RangeType, lowerOpen = false, upperOpen = false){
        //checks
        MDBKeyRange.checkInputs(lower,upper, lowerOpen, upperOpen)

        this.lower = lower
        this.upper = upper
        this.lowerOpen = lowerOpen
        this.upperOpen = upperOpen
    }

    public static bound(lower: RangeType, upper: RangeType, lowerOpen = false, upperOpen = false): MDBKeyRange{
        //checks
        MDBKeyRange.checkInputs(lower,upper, lowerOpen, upperOpen)
        //create new MDBKeyRange
        return new MDBKeyRange(lower, upper, lowerOpen, upperOpen)
    }

    public static only(value: RangeType): MDBKeyRange{
        // Checks.
        if (!Helper.validKey(value)) throw new DOMException('only(): value must be a valid key (string, number, date)', 'DataError');

        // Make an MDBKeyRange and return it.
        return new MDBKeyRange(value, value, false, false);
    }

    public static lowerBound (value: RangeType, open = false): MDBKeyRange {
        // Checks.
        if (!Helper.validKey(value)) throw new DOMException('lowerBound(): value must be a valid key (string, number, date)', 'DataError');
        if (typeof open !== 'boolean') throw new DOMException('lowerBound(): open must be boolean', 'DataError');

        // Make an IDBKeyRange and return it.
        return new MDBKeyRange(value, undefined, open, true);
    }

    public static upperBound (value: RangeType, open = false): MDBKeyRange {
        // Checks.
        if (!Helper.validKey(value)) throw new DOMException('lowerBound(): value must be a valid key (string, number, date)', 'DataError');
        if (typeof open !== 'boolean') throw new DOMException('lowerBound(): open must be boolean', 'DataError');

        // Make an IDBKeyRange and return it.
        return new MDBKeyRange(undefined, value, true , open);
    }

    public includes(key): boolean {
        // Checks.
        if (!Helper.validKey(key)) throw new DOMException('includes(): key must be a valid key (string, number, date)', 'DataError');

        // See if it's in the range.
        if (this.upper !== undefined) {
            if (this.upperOpen) { 
                if (key >= this.upper) return false
            } else { 
                if (key > this.upper) return false
            }
        }
        if (this.lower !== undefined) {
            if (this.lowerOpen) { 
                if (key <= this.lower) return false 
            } else { 
                if (key < this.lower) return false; 
            }
        }
        return true;
    }
}