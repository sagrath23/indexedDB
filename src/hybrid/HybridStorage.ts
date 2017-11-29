import {IndexedDBStorage} from '../indexedDB/IndexedDBStorage'
import {MemoryStorage} from '../memory/MemoryStorage'

export class HybridStorage {
    private memoryStorage: MemoryStorage
    private dbStorage: IndexedDBStorage
}