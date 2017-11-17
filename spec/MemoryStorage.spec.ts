import {MemoryStorage} from "../src/memory/MemoryStorage"

describe("MemoryStorage: Class", () => {
  const key1 = "key1"
  const key2 = "key2"
  const value1 = "value1"
  const value2 = "value2"

  function init(): MemoryStorage {
    const storage = new MemoryStorage("testStorage")
    return storage
  }

  it("should create empty storage", (() => {
    const storage = init()
    expect(storage).toBeDefined()
  }))

  it("should save one item", (() => {
    const storage = init()
    storage.setItem(key1, value1)
    expect(storage.getAll().length).toEqual(1)
  }))

  it("should save/get one item", (() => {
    const storage = init()
    storage.setItem(key1, value1)
    expect(storage.getAll().length).toEqual(1)
    const result = storage.getItem(key1)
    expect(result).toEqual(value1)
  }))

  it("should save/get two items", (() => {
    const storage = init()
    const values = [ value1 , value2 ]
    const keys = [ key1 , key2 ]
    storage.setItem(key1, value1)
    storage.setItem(key2, value2)
    storage.getDenseBatch(keys).forEach((element, index) => { expect(element).toEqual(values[index])})
  }))

  it("should clear saved items", (() => {
    const storage = init()

    storage.setItem(key1, value1)
    storage.setItem(key2, value2)

    storage.clear()
    expect(storage.getAll().length).toEqual(0)
  }))

  it("should remove one item", (() => {
    const storage = init()

    storage.setItem(key1, value1)
    storage.setItem(key2, value2)

    storage.removeItem(key2)

    expect(storage.getItem(key2)).toBeUndefined()
    expect(storage.getItem(key1)).toEqual(value1)
  }))

  it("should try to remove one item, that doesn't exist", (() => {
    const storage = init()
    const key3 = "key3"

    storage.setItem(key1, value1)
    storage.setItem(key2, value2)

    storage.removeItem(key3)

    expect(storage.getAll().length).toEqual(2)
    expect(storage.getItem(key2)).toEqual(value2)
    expect(storage.getItem(key1)).toEqual(value1)
  }))

  it("should save an item with empty key", (() => {
    const storage = init()
    storage.setItem("", value1)
    expect(storage.getAll().length).toEqual(0)
    const result = storage.getItem("")
    expect(result).toBeUndefined()
  }))

  it("should return a key in a specific position", (() => {
    const storage = init()
    storage.setItem(key1, value1)
    storage.setItem(key2, value2)
    expect(storage.key(0)).toEqual(key1)
    expect(storage.key(1)).toEqual(key2)
  }))

  it("should return a empty string when a key is not found in a specific position", (() => {
    const storage = init()
    storage.setItem(key1, value1)
    storage.setItem(key2, value2)
    expect(storage.key(3)).toEqual("")
  }))

})
