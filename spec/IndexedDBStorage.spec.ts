// required to get window.indexedDB object
import * as fs from "fs-js"
import * as puppeteer from "puppeteer"


import { IndexedDBStorage } from "../src/indexedDB/IndexedDBStorage"

describe("IndexedDBStorage: Creation", () => {
  
  afterEach(async ()=>{
    //delete IndexedDB 
    const browser = await puppeteer.launch({args: ['--allow-file-access','--allow-file-access-from-files']})
    try {
      const page = await browser.newPage()

      await page.goto("https://www.google.com");

      // to pass __awaiter function
      await page.addScriptTag({path: "./tslib.js", content: "text/javascript"})

      // to pass __awaiter function
      await page.addScriptTag({path: "./bundle.js", content: "text/javascript"})

      await page.evaluate(async function(){
        await indexedDB.deleteDatabase("dbTest");
      })

      await browser.close()

    } catch (err) {
      await browser.close()
    }

  })

  it("should create & open an empty IndexedDBStorage, without kepyPath & autoIncrement", (async (done) => {

    const browser = await puppeteer.launch({args: ['--allow-file-access','--allow-file-access-from-files']})

    try {
      const page = await browser.newPage()

      await page.goto("https://www.google.com");
      
      // to pass __awaiter function
      await page.addScriptTag({path: "./tslib.js", content: "text/javascript"})

      // to pass __awaiter function
      await page.addScriptTag({path: "./bundle.js", content: "text/javascript"})

      const database = await page.evaluate(async function(){
        //this is the ugly part of the test
        const database = eval("new IndexedDBStorage()")
        //wait for database to be open
        await database.openIDB("dbTest", 1, [{objectStoreName: "objectStoreTest"}])
        return database
      })

      expect(database).toBeDefined()

      await browser.close()
      done()

    } catch (err) {
      await browser.close()
      done.fail(err)
    }
  }))

  it("should create & open an empty IndexedDBStorage, with keyPath & autoIncrement ", (async (done) => {
    const browser = await puppeteer.launch({args: ['--allow-file-access','--allow-file-access-from-files']})
    
    try {
      const page = await browser.newPage()

      await page.goto("https://www.google.com");

      // to pass __awaiter function
      await page.addScriptTag({path: "./tslib.js", content: "text/javascript"})

      // to pass __awaiter function
      await page.addScriptTag({path: "./bundle.js", content: "text/javascript"})

      const database = await page.evaluate(async function(){
        //this is the ugly part of the test
        const database = eval("new IndexedDBStorage()")
        //wait for database to be open
        await database.openIDB("dbTest", 1, [{objectStoreName: "objectStoreTest", objectStoreSettings: {keyPath: "id", autoIncrement: true}}])
        return database
      })

      expect(database).toBeDefined()

      await browser.close()
      done()

    } catch (err) {
      await browser.close()
      done.fail(err)
    }
  }))

  it("should create & open an empty IndexedDBStorage, with keyPath & autoIncrement & indexed values", (async (done) => {
    const browser = await puppeteer.launch({args: ['--allow-file-access','--allow-file-access-from-files']})
    
    try {
      const page = await browser.newPage()

      await page.goto("https://www.google.com");
      
      // to pass __awaiter function
      await page.addScriptTag({path: "./tslib.js", content: "text/javascript"})

      // to pass __awaiter function
      await page.addScriptTag({path: "./bundle.js", content: "text/javascript"})

      const database = await page.evaluate(async function(){
        //this is the ugly part of the test
        const database = eval("new IndexedDBStorage()")
        //wait for database to be open
        await database.openIDB("dbTest", 1, [
          {
            objectStoreName: "objectStoreTest", 
            objectStoreSettings: {
              keyPath: "id", 
              autoIncrement: true
            },
            objectStoreIndexes: [{
              indexName: 'testIndex',
              keyPath: 'name'
            }]
          }])
        return database
      })

      expect(database).toBeDefined()

      await browser.close()
      done()

    } catch (err) {
      await browser.close()
      done.fail(err)
    }
  }))

})

