// required to get window.indexedDB object
import * as fs from "fs-js"
import * as puppeteer from "puppeteer"
// Require the mock.
const { IDBFactory, IDBKeyRange, reset } = require('shelving-mock-indexeddb');


import { IndexedDBStorage } from "../src/indexedDB/IndexedDBStorage"

describe("IndexedDBStorage: Test with mock", () => {
  // Create an IDBFactory at window.indexedDB so your code can use IndexedDB.
  const window = new Object()
  window["indexedDB"] = new IDBFactory();
  // Make IDBKeyRange global so your code can create key ranges.
  window["IDBKeyRange"] = IDBKeyRange;

  // Reset the IndexedDB mock before/after tests.
  // This will clear all object stores, indexes, and data.
  beforeEach(() => reset());
  afterEach(() => reset());
  
  it("should create & open an empty IndexedDBStorage", (async (done) => {
    try {

      const database = new IndexedDBStorage(window)

      //try to open the database
      await database.openIDB("dbTest", 1, [{objectStoreName: "objectStoreTest"}])

      expect(database).toBeDefined()

      done()

    } catch (err) {
      done.fail(err)
    }
  }))

  it("should create & open an empty IndexedDBStorage, with keyPath & autoIncrement", (async (done) => {
    try {

      const database = new IndexedDBStorage(window)

      //try to open the database
      await database.openIDB("dbTest", 1, [{objectStoreName: "objectStoreTest", objectStoreSettings: {keyPath: "id", autoIncrement: true}}])

      expect(database).toBeDefined()

      done()

    } catch (err) {
      done.fail(err)
    }
  }))

  it("should create & open an empty IndexedDBStorage, with keyPath, autoIncrement & indexes ", (async (done) => {
    try {

      const database = new IndexedDBStorage(window)

      //try to open the database
      await database.openIDB("dbTest", 1, [{
        objectStoreName: "objectStoreTest", 
        objectStoreSettings: {
          keyPath: "id", 
          autoIncrement: true
        },
        objectStoreIndexes: [{
          indexName: "nameIndex",
          keyPath: "name"
        }]
      }])

      expect(database).toBeDefined()

      done()

    } catch (err) {
      done.fail(err)
    }
  }))

  it("should add an element", (async (done) => {
    try {

      const database = new IndexedDBStorage(window)

      //try to open the database
      await database.openIDB("dbTest", 1, [{
        objectStoreName: "objectStoreTest", 
        objectStoreSettings: {
          keyPath: "id", 
          autoIncrement: true
        },
        objectStoreIndexes: [{
          indexName: "nameIndex",
          keyPath: "name"
        }]
      }])

      await database.add("objectStoreTest",{name:"Test 1",value: 123})

      expect(database).toBeDefined()

      const countElements = await database.count("objectStoreTest")

      expect(countElements).toEqual(1)

      done()

    } catch (err) {
      done.fail(err)
    }
  }))

  it("should get an element", (async (done) => {
    try {

      const database = new IndexedDBStorage(window)

      //try to open the database
      await database.openIDB("dbTest", 1, [{
        objectStoreName: "objectStoreTest", 
        objectStoreSettings: {
          keyPath: "id", 
          autoIncrement: true
        },
        objectStoreIndexes: [{
          indexName: "nameIndex",
          keyPath: "name"
        }]
      }])

      const element = {id: 1, name:"Test 1",value: 123}

      await database.add("objectStoreTest",element)

      expect(database).toBeDefined()

      const countElements = await database.count("objectStoreTest")

      expect(countElements).toEqual(1)

      const otherElement = await database.get("objectStoreTest",1)

      expect(otherElement).toEqual(element)

      done()

    } catch (err) {
      done.fail(err)
    }
  }))

  it("should delete an element", (async (done) => {
    try {

      const database = new IndexedDBStorage(window)

      //try to open the database
      await database.openIDB("dbTest", 1, [{
        objectStoreName: "objectStoreTest", 
        objectStoreSettings: {
          keyPath: "id", 
          autoIncrement: true
        },
        objectStoreIndexes: [{
          indexName: "nameIndex",
          keyPath: "name"
        }]
      }])

      const element = {id: 1, name:"Test 1",value: 123}

      await database.add("objectStoreTest",element)

      expect(database).toBeDefined()

      await database.delete("objectStoreTest", 1)

      const countElements = await database.count("objectStoreTest")

      expect(countElements).toEqual(0)

      const otherElement = await database.get("objectStoreTest",1)

      expect(otherElement).toBeUndefined()

      done()

    } catch (err) {
      done.fail(err)
    }
  }))

  it("should update an element", (async (done) => {
    try {

      const database = new IndexedDBStorage(window)

      //try to open the database
      await database.openIDB("dbTest", 1, [{
        objectStoreName: "objectStoreTest", 
        objectStoreSettings: {
          keyPath: "id", 
          autoIncrement: true
        },
        objectStoreIndexes: [{
          indexName: "nameIndex",
          keyPath: "name"
        }]
      }])

      let element = {id: 1, name:"Test 1",value: 123}

      await database.add("objectStoreTest",element)

      expect(database).toBeDefined()

      const countElements = await database.count("objectStoreTest")

      expect(countElements).toEqual(1)

      let otherElement = await database.get("objectStoreTest",1)

      expect(otherElement).toEqual(element)

      otherElement["name"] = "prueba de modificación"

      await database.put("objectStoreTest", otherElement)

      let anotherElement = await database.get("objectStoreTest",1)

      expect(anotherElement).toEqual(otherElement)

      done()

    } catch (err) {
      done.fail(err)
    }
  }))

  it("should open a cursor", (async (done) => {
    try {

      const database = new IndexedDBStorage(window)

      //try to open the database
      await database.openIDB("dbTest", 1, [{
        objectStoreName: "objectStoreTest", 
        objectStoreSettings: {
          keyPath: "id", 
          autoIncrement: true
        },
        objectStoreIndexes: [{
          indexName: "nameIndex",
          keyPath: "name"
        }]
      }])

      expect(database).toBeDefined()

      let elements = []

      for(let i = 0; i < 20; i++){
        let element = {id: i+1, name:`test ${i}`,value: 123+i }
        elements.push(element)
        await database.add("objectStoreTest",element)
      }

      const countElements = await database.count("objectStoreTest")

      expect(countElements).toEqual(20)

      const cursor = await database.openCursor("objectStoreTest")

      expect(cursor).toBeDefined()
      
      let i = 0
      if(cursor){
        expect(cursor.value).toEqual(elements[i])
        i++
        cursor.continue()
      }
      
      done()

    } catch (err) {
      done.fail(err)
    }
  }))

  it("should get an element using an index", (async (done) => {
    try {

      const database = new IndexedDBStorage(window)

      //try to open the database
      await database.openIDB("dbTest", 1, [{
        objectStoreName: "objectStoreTest", 
        objectStoreSettings: {
          keyPath: "id", 
          autoIncrement: true
        },
        objectStoreIndexes: [{
          indexName: "nameIndex",
          keyPath: "name"
        }]
      }])

      expect(database).toBeDefined()

      let elements = []
      for(let i = 0; i < 20; i++){
        let element = {id: i+1, name:`test ${i}`,value: 123+i }
        elements.push(element)
        await database.add("objectStoreTest",element)
      }

      const countElements = await database.count("objectStoreTest")

      expect(countElements).toEqual(20)

      const otherElement = await database.getItemByIndex("objectStoreTest","nameIndex", "test 10")

      console.log(otherElement)
      
      expect(otherElement).toEqual(elements[9])
      
      done()

    } catch (err) {
      done.fail(err)
    }
  }))

})

describe("IndexedDBStorage: Test with Puppeteer", () => {
  let browser
  let page
  let indexedDB
  
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
    //get indexedDB object from puppeteer
    indexedDB = await page.evaluateHandle(() => Promise.resolve(window.indexedDB))

    console.log(indexedDB, "Window")
  })

  xit("should create & open an empty IndexedDBStorage", (async (done) => {
    try {

      const database = new IndexedDBStorage(indexedDB)

      //try to open the database
      await database.openIDB("dbTest", 1, [{objectStoreName: "objectStoreTest"}])

      expect(database).toBeDefined()

      done()

    } catch (err) {
      done.fail(err)
    }
  }))
/*
  
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
  */
})

