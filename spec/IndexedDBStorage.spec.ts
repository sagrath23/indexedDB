// required to get window.indexedDB object
import * as puppeteer from "puppeteer"
import * as fs from "fs-js"

// tslint:disable-next-line:no-var-requires
// const tslib = require("../tslib.js")

import { IndexedDBStorage } from "../src/indexedDB/IndexedDBStorage"

describe("IndexedDBStorage: Class", () => {
  const key1 = "key1"
  const key2 = "key2"
  const value1 = "value1"
  const value2 = "value2"

  xit("should create empty storage", (async (done) => {
    const browser = await puppeteer.launch({args: ['--allow-file-access-from-files']})

    try {
      const page = await browser.newPage()

      //to pass __awaiter function
      await page.addScriptTag({path: "./tslib.js", content: "text/javascript"})
      //to pass IndexedDB Class definition
      await page.addScriptTag({path: "./bundle.js", content: "text/javascript"})

      //load external file to evaluate
      //const externalFile = fs.readFileSync('./spec/buildStorage.js', 'utf8');
      //const store = await page.evaluate(externalFile);
      const spec = {
        objectStoreName: 'testObjectStore',
        objectStoreSettings: { keyPath: 'idbId', autoIncrement: true}
      }

      const store = await page.evaluate(async function() {
        const store = new IndexedDBStorage()
        await store.openIDB("testDatabase", 1, spec)
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
})

function init(): IndexedDBStorage {
  const storage = new IndexedDBStorage()
  return storage
}
