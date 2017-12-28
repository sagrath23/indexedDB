import { MDBKeyRange } from './MDBKeyRange'

import * as structuredClone from 'realistic-structured-clone'
export class Helper {

    public static validIdentifier(identifier: string): boolean {
        const identifierPattern = /^[a-z_][a-zA-Z0-9_\-\$]*$/
        const result = typeof identifier === 'string' && identifier.match(identifierPattern) ? true: false
        return result
    }

    public static validKeyPath(keyPath: string): boolean {
        //TODO: use a regexp instead
        if (typeof keyPath === 'string') {
            // Can be either 'abc' or 'abc.def'.
            const keyPathParts = keyPath.split('.');
            for (let i = 0; i < keyPathParts.length; i++)
                if (!Helper.validIdentifier(keyPathParts[i])) return false;
            return true;
        } else return false;
    }

    public static validMultiKeyPath(keyPath: Array<string>) {
        if (keyPath instanceof Array) {
            // An array of otherwise valid single key paths.
            if (keyPath.length < 1) return false;
            for (let i = 0; i < keyPath.length; i++)
                if (!Helper.validKeyPath(keyPath[i])) return false;
            return true;
        } else return false;
    }

    public static validVersion(version: number | boolean): boolean{
        const result = typeof version === 'number' && version > 0 && isFinite(version) && version === Math.round(version)? true: false
        return result
    }

    public static validKey(key: number | string | Date): boolean {
        // Simple keys.
        if (typeof key === 'number' && isFinite(key)) return true;
        else if (typeof key === 'string') return true;
        else if (key instanceof Date) return true;
        return false;
    }

    public static validKeyRange(key: Array<number | string | Date> | number | string | Date): boolean {
        if (key instanceof Array) {
            if (key.length < 1) return false;
            for (let i = 0; i < key.length; i++)
                if (!Helper.validKey(key[i]) && !Helper.validKeyRange(key[i])) return false;
            return true;
        }
        if (key instanceof MDBKeyRange) return true;
        return false;
    }

    public static keyInRange(key: number | string, range: Array<number | string | Date> | MDBKeyRange): boolean {
        // Primitive ranges use simple comparisons.
        if (typeof range === 'number' || typeof range === 'string') return key === range;
    
        // Array ranges just test existance.
        if (range instanceof Array) {
            for (let i = 0; i < range.length; i++)
                if (Helper.keyInRange(key, range[i])) return true;
            return false;
        }
    
        // IDBKeyRanges test the key being inside the higher and lower range.
        if (range instanceof MDBKeyRange) return range.includes(key);
    
        // Anything else is false.
        return false;
    }

    public static clone(value: any): any {
        // Return a cloned value.
        return structuredClone(value);
    }
}