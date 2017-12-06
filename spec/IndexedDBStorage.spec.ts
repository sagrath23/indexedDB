// required to get window.indexedDB object
import * as fs from "fs-js"
import * as puppeteer from "puppeteer"


import { IndexedDBStorage } from "../src/indexedDB/IndexedDBStorage"

describe("IndexedDBStorage: Creation", () => {
  let browser
  let page
  let window
  
  afterEach(async ()=>{
    //delete IndexedDB 
    try {
      await page.evaluate(async function(){
        await indexedDB.deleteDatabase("dbTest");
      })

      await browser.close()

    } catch (err) {
      await browser.close()
    }

  })

  beforeEach(async()=>{
    //open the browser, load a page and load scripts to test
    browser = await puppeteer.launch({args: ['--allow-file-access','--allow-file-access-from-files']})

    page = await browser.newPage()
    await page.goto("https://www.google.com");
    //get window object from puppeteer
    window = await page.evaluate(async ()=>{
      return Promise.resolve(window)
    })

    console.log(window, "Window")
  })

  it("should create & open an empty IndexedDBStorage", (async (done) => {
    try {

      const database = new IndexedDBStorage()

      //try to open the database
      await database.openIDB("dbTest", 1, [{objectStoreName: "objectStoreTest"}])

      expect(database).toBeDefined()

      done()

    } catch (err) {
      done.fail(err)
    }
  }))

  
  xit("should create & open an empty IndexedDBStorage, without kepyPath & autoIncrement", (async (done) => {

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

  xit("should create & open an empty IndexedDBStorage, with keyPath & autoIncrement ", (async (done) => {
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

  xit("should create & open an empty IndexedDBStorage, with keyPath & autoIncrement & indexed values", (async (done) => {
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

  xit("add an element", (async (done) => {
    const browser = await puppeteer.launch({args: ['--allow-file-access','--allow-file-access-from-files']})
    
    try {
      const page = await browser.newPage()

      await page.goto("https://www.google.com");
      
      // to pass __awaiter function
      await page.addScriptTag({path: "./tslib.js", content: "text/javascript"})

      // to pass __awaiter function
      await page.addScriptTag({path: "./bundle.js", content: "text/javascript"})

      page.on('console', msg => {
        console.log(msg.text)
        //console.log(msg)
        for (let i = 0; i < msg.args.length; ++i){
          if(msg.args[i] instanceof IndexedDBStorage){
            console.log("Yeah!!!!!")
          } else{
            console.log(`${i}: ${msg.args[i]}`);
          }
        }
      });

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
            }
          },{
            objectStoreName: "objectStoreTest2", 
            objectStoreSettings: {
              keyPath: "id", 
              autoIncrement: true
            }
          }])
        
        await database.add("objectStoreTest",{name:"Test 1",value: 123})

        console.log(database)

        return database
      })

      expect(database).toBeDefined()

      //

      await browser.close()
      done()

    } catch (err) {
      await browser.close()
      done.fail(err)
    }
  }))
})

