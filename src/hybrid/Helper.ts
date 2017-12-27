
export class Helper {
    public static validIdentifier(identifier: string): boolean {
        const identifierPattern = /^[a-z_][a-zA-Z0-9_\-\$]*$/
        const result = typeof identifier === 'string' && identifier.match(identifierPattern) ? true: false
        return result
    }

    public static validVersion(version: number | boolean): boolean{
        const result = typeof version === 'number' && version > 0 && isFinite(version) && version === Math.round(version)? true: false
        return result
    }
}