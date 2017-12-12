// required to get window.indexedDB object
import * as fs from "fs-js"
import * as puppeteer from "puppeteer"
import {IDBFactory, IDBKeyRange, reset} from "shelving-mock-indexeddb"


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

      const returnedObjects = await database.getItemsByCursor("objectStoreTest")

      expect(returnedObjects).toBeDefined()
      
      for(let i = 0; i < 20; i++){
        expect(returnedObjects[i]).toEqual(elements[i])
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
      
      expect(otherElement).toEqual(elements[10])
      
      done()

    } catch (err) {
      done.fail(err)
    }
  }))

})
/*
describe("IndexedDBStorage: Test with Puppeteer", () => {
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
    console.log("================================================")
    page = await browser.newPage()
    await page.goto("https://www.google.com");
    //get indexedDB object from puppeteer
    let objectHandler = await page.evaluateHandle(() => Promise.resolve(window))
    //Ugly Hack
    window = objectHandler._remoteObject
    console.log(window.indexedDB, "AHhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
  })

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
})
*/
