// required to get window.indexedDB object
import * as puppeteer from "puppeteer"

// tslint:disable-next-line:no-var-requires
// const tslib = require("../tslib.js")

import { IndexedDBStorage } from "../src/indexedDB/IndexedDBStorage"

describe("IndexedDBStorage: Class", () => {
  const key1 = "key1"
  const key2 = "key2"
  const value1 = "value1"
  const value2 = "value2"

  fit("should create empty storage", (async (done) => {
    const browser = await puppeteer.launch()

    try {
      const page = await browser.newPage()

      //to pass __awaiter function
      await page.addScriptTag({path: "./tslib.js", content: "text/javascript"})
      //to pass IndexedDB Class definition
      await page.addScriptTag({path: "./bundle.js", content: "text/javascript"})

      // tslint:disable-next-line:only-arrow-functions
      const store = await page.evaluate(async function() {
        const store = new IndexedDBStorage("idbTest")
        await store.init()
        return store
      })

      expect(store).toBeDefined()
      expect(store.getStorage()).toBeDefined()

      await browser.close()
      done()

    } catch (err) {
      await browser.close()
      done.fail(err)
    }
  }))

  xit("should create empty storage (promise)", (async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    const storage = init()
    // await page.goto("index.html")

    const initializedStorage = page.evaluate((storageObject) => {
      console.log("testing in browser")
      return new Promise(storageObject.init())
    }, storage)

    expect(initializedStorage).toBeDefined()
    initializedStorage.then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error, "error")
    })
    // expect(initializedStorage.getStorage()).toBeDefined()
    await browser.close()
  }))

  xit("should save one item", (() => {
    const storage = init()
    storage.setItem(key1, value1)
    expect(storage.getAll().length).toEqual(1)
  }))

  xit("should save/get one item", (() => {
    const storage = init()
    storage.setItem(key1, value1)
    expect(storage.getAll().length).toEqual(1)
    const result = storage.getItem(key1)
    expect(result).toEqual(value1)
  }))

  xit("should save/get two items", (() => {
    const storage = init()
    const values = [value1, value2]
    const keys = [key1, key2]
    storage.setItem(key1, value1)
    storage.setItem(key2, value2)
    storage.getDenseBatch(keys).forEach((element, index) => { expect(element).toEqual(values[index]) })
  }))

  xit("should clear saved items", (() => {
    const storage = init()

    storage.setItem(key1, value1)
    storage.setItem(key2, value2)

    storage.clear()
    expect(storage.getAll().length).toEqual(0)
  }))

  xit("should remove one item", (() => {
    const storage = init()

    storage.setItem(key1, value1)
    storage.setItem(key2, value2)

    storage.removeItem(key2)

    expect(storage.getItem(key2)).toBeUndefined()
    expect(storage.getItem(key1)).toEqual(value1)
  }))

  xit("should try to remove one item, that doesn't exist", (() => {
    const storage = init()
    const key3 = "key3"

    storage.setItem(key1, value1)
    storage.setItem(key2, value2)

    storage.removeItem(key3)

    expect(storage.getAll().length).toEqual(2)
    expect(storage.getItem(key2)).toEqual(value2)
    expect(storage.getItem(key1)).toEqual(value1)
  }))

  xit("should save an item with empty key", (() => {
    const storage = init()
    storage.setItem("", value1)
    expect(storage.getAll().length).toEqual(0)
    const result = storage.getItem("")
    expect(result).toBeUndefined()
  }))

  xit("should return a key in a specific position", (() => {
    const storage = init()
    storage.setItem(key1, value1)
    storage.setItem(key2, value2)
    expect(storage.key(0)).toEqual(key1)
    expect(storage.key(1)).toEqual(key2)
  }))
})

function init(): IndexedDBStorage {
  const storage = new IndexedDBStorage("testStorage")
  return storage
}
