// required to get window.indexedDB object
import * as puppeteer from "puppeteer"


import { IndexedDBStorage } from "../src/indexedDB/IndexedDBStorage"

describe("IndexedDBStorage: Class", () => {
  const key1 = "key1"
  const key2 = "key2"
  const value1 = "value1"
  const value2 = "value2"

  it("should create & open an empty IndexedDBStorage", (async (done) => {

    const browser = await puppeteer.launch({args: ['--allow-file-access','--allow-file-access-from-files']})

    try {
      const page = await browser.newPage()

      //TODO: replace for an valid URL in 
      await page.goto('file://D:\\xampp\\htdocs\\idb\\index.html');

      // to pass __awaiter function
      await page.addScriptTag({path: "./tslib.js", content: "text/javascript"})

      // const database = new IndexedDBStorage()
      // await page.evaluate(async function(database){
      //   await database.openIDB("dbTest", 1, [{objectStoreName: "objectStoreTest"}])
      // }, database)

      const database = await page.evaluate(async function(){
        //this is the ugly part of the test
        const database = eval("new IndexedDBStorage()")
        //wait for database to be open
        await database.openIDB("dbTest", 1, [{objectStoreName: "objectStoreTest"}])
        return database
      })

      expect(database).toBeDefined()
      console.log(database)

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
