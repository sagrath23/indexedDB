var IndexedDBStorage =
/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdateIndexedDBStorage"];
/******/ 	this["webpackHotUpdateIndexedDBStorage"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = 10000;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "d8a104dd1fc2b1ca90ea"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest().then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate).then(function(result) {
/******/ 				deferred.resolve(result);
/******/ 			}, function(err) {
/******/ 				deferred.reject(err);
/******/ 			});
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(moduleOutdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "accept-errored",
/******/ 								moduleId: moduleId,
/******/ 								dependencyId: moduleOutdatedDependencies[i],
/******/ 								error: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err;
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/***/ (function(module, exports, __webpack_require__) {

var index = __webpack_require__("./src/index.ts")

module.exports = index.IndexedDBStorage;

/***/ }),

/***/ "./src/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__indexedDB_IndexedDBStorage__ = __webpack_require__("./src/indexedDB/IndexedDBStorage.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "IndexedDBStorage", function() { return __WEBPACK_IMPORTED_MODULE_0__indexedDB_IndexedDBStorage__["a"]; });




/***/ }),

/***/ "./src/indexedDB/IndexedDBStorage.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndexedDBStorage; });
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//transaction modes
var READ_ONLY = 'readonly';
var READ_WRITE = 'readwrite';
var VERSION_CHANGE = 'versionchange';
//transaction types
var ADD = 'add';
var GET = 'get';
var DELETE = 'delete';
var IndexedDBStorage = (function () {
    /**
     * Class constructor
     */
    function IndexedDBStorage() {
    }
    /**
     * Function that return a promise of a IDBDatabase instance
     * @param databaseName
     * @param databaseVersion
     * @param objectStoreSpec
     */
    IndexedDBStorage.prototype.openIndexedDB = function (databaseName, databaseVersion, objectStoreSpec) {
        var me = this;
        me.databaseCreated = false;
        me.databaseName = databaseName;
        me.databaseVersion = databaseVersion;
        me.objectStoreSpec = objectStoreSpec;
        console.log("creating promise...", "IndexedDBStorage.openIndexedDB");
        return new Promise(function (resolve, reject) {
            console.log("opening IDB Database...", "IndexedDBStorage.openIndexedDB");
            //start to open the database
            var request = window.indexedDB.open(me.databaseName, me.databaseVersion);
            // this callback is executed, when a new Database is created
            request.onupgradeneeded = function (event) {
                me.databaseCreated = true;
                me.database = this.result;
                console.info("Database successfully created", "callback onupgradeneeded IndexedDBStorage.openIndexedDB");
                //now, create a objectStore object
                for (var i in me.objectStoreSpec) {
                    //and add the new objectStore to our objectStores object
                    //me.createObjectStore(me.database, me.objectStoreSpec[i]);
                    console.log("creating objectStore " + objectStoreSpec[i].objectStoreName);
                    //create objectStore
                    var objectStore = me.database.createObjectStore(objectStoreSpec[i].objectStoreName, objectStoreSpec[i].objectStoreSettings);
                    //and create index if are defined
                    if (objectStoreSpec[i].objectStoreIndexes) {
                        for (var j in objectStoreSpec[i].objectStoreIndexes) {
                            //create index
                            console.log("creating index " + objectStoreSpec[i].objectStoreIndexes[j].indexName + " for objectStore " + objectStoreSpec[i].objectStoreName);
                            objectStore.createIndex(objectStoreSpec[i].objectStoreIndexes[j].indexName, objectStoreSpec[i].objectStoreIndexes[j].keyPath, objectStoreSpec[i].objectStoreIndexes[j].optionalParams);
                        }
                    }
                }
            };
            // this callback is executed when the database exists an it's opened
            // if the database doesn't exist, then execute onupgradeneeded callback first, and this later
            request.onsuccess = function (event) {
                console.info("Database is Open", "callback onsuccess IndexedDBStorage.openIndexedDB");
                if (!me.databaseCreated) {
                    me.database = this.result;
                }
                resolve();
            };
            // this callback is executed when the database is open
            request.onblocked = function (event) {
                console.warn("Database is blocked");
                reject(event);
            };
            // if an error happened, reject the promise
            request.onerror = function (event) {
                console.error("Database couldn't be opened");
                reject(event);
            };
        });
    };
    /**
     * Function that create a new IDBObjectStore in the specified database
     * @param database
     * @param objectStoreSpec
     */
    IndexedDBStorage.prototype.createObjectStore = function (database, objectStoreSpec) {
        console.log("creating objectStore " + objectStoreSpec.objectStoreName);
        //create objectStore
        var objectStore = database.createObjectStore(objectStoreSpec.objectStoreName, objectStoreSpec.objectStoreSettings);
        //and create index if are defined
        if (objectStoreSpec.objectStoreIndexes) {
            for (var i in objectStoreSpec.objectStoreIndexes) {
                //create index
                console.log("creating index " + objectStoreSpec.objectStoreIndexes[i].indexName + " for objectStore " + objectStoreSpec.objectStoreName);
                objectStore.createIndex(objectStoreSpec.objectStoreIndexes[i].indexName, objectStoreSpec.objectStoreIndexes[i].keyPath, objectStoreSpec.objectStoreIndexes[i].optionalParams);
            }
        }
    };
    /**
     * Function that open an existing IDBObjectStore i the specified database
     * @param objectStoreSpec
     */
    IndexedDBStorage.prototype.getObjectStore = function (objectStoreName, transactionMode) {
        try {
            //open the object Store from IndexedDB instance
            //create a transaction in the database
            var transaction = this.database.transaction(objectStoreName, transactionMode);
            //and return the objectStore specified
            return transaction.objectStore(objectStoreName);
        }
        catch (error) {
            console.error(error, "IndexedDBStore.getObjectStore");
            throw error;
        }
    };
    /**
     * Function that adds an item to an specific objectStore in the opened database,
     * returning a Promise of an IDBRequest object that contain the result of the transaction
     * @param objectStoreName
     * @param item
     */
    IndexedDBStorage.prototype.addItemToObjectStore = function (objectStoreName, item, keyValue) {
        var me = this;
        return new Promise(function (resolve, reject) {
            //get ObjectStore to store data
            var objectStore = me.getObjectStore(objectStoreName, READ_WRITE);
            try {
                //and try to add it 
                var request = void 0;
                console.log("trying to insert data");
                if (keyValue) {
                    request = objectStore.add(item, keyValue);
                }
                else {
                    request = objectStore.add(item);
                }
                console.log("generate request");
                //hendling when insertion is success
                request.onsuccess = function (event) {
                    console.log("Insertion in DB successful");
                    resolve();
                };
                //and when 
                request.onerror = function () {
                    console.error("Insertion failed", this.error);
                    reject();
                };
            }
            catch (error) {
                if (error.name == 'DataCloneError') {
                    console.error("This engine doesn't know how to clone a Blob, use Firefox or Chrome");
                }
                console.log(error, "IndexedDBStorage.addItemToObjectStore");
                throw error;
            }
        });
    };
    /**
     *
     * @param objectStoreName
     * @param keyValue
     */
    IndexedDBStorage.prototype.getItemFromObjectStore = function (objectStoreName, keyValue) {
        var me = this;
        return new Promise(function (resolve, reject) {
            //get ObjectStore to store data
            var objectStore = me.getObjectStore(objectStoreName, READ_ONLY);
            try {
                //and try to delete it 
                var request = objectStore.get(keyValue);
                //hendling when insertion is success
                request.onsuccess = function (event) {
                    console.log("object " + keyValue + " founded in " + objectStoreName + " objectStore");
                    resolve(this.result);
                };
                //and when 
                request.onerror = function () {
                    console.log("error trying to get " + keyValue + " item in " + objectStoreName + " objectStore: ", this.error);
                    reject();
                };
            }
            catch (error) {
                throw error;
            }
        });
    };
    /**
     * Function that updates an item in an specific objectStore for the opened database,
     * returning a Promise of an IDBRequest object that contain the result of the transaction
     * @param objectStoreName
     * @param item
     * @param keyValue
     */
    IndexedDBStorage.prototype.putItemToObjectStore = function (objectStoreName, item, keyValue) {
        var me = this;
        return new Promise(function (resolve, reject) {
            //get ObjectStore to store data
            var objectStore = me.getObjectStore(objectStoreName, READ_WRITE);
            try {
                //and try to add it 
                var request = void 0;
                if (keyValue) {
                    request = objectStore.put(item, keyValue);
                }
                else {
                    request = objectStore.put(item);
                }
                //hendling when insertion is success
                request.onsuccess = function (event) {
                    console.log("object " + item + " updated in " + objectStoreName + " objectStore");
                    resolve();
                };
                //and when 
                request.onerror = function () {
                    console.error("Update failed", this.error);
                    reject();
                };
            }
            catch (error) {
                throw error;
            }
        });
    };
    /**
     * Function that delete a record in a specific objectStore using his key
     * returning a promise of a IDBRequest object, containing the result of the request
     * @param objectStoreName
     * @param keyValue
     */
    IndexedDBStorage.prototype.deleteItemFromObjectStore = function (objectStoreName, keyValue) {
        var me = this;
        return new Promise(function (resolve, reject) {
            //get ObjectStore to store data
            var objectStore = me.getObjectStore(objectStoreName, READ_WRITE);
            try {
                //and try to delete it 
                var request = objectStore.delete(keyValue);
                //hendling when insertion is success
                request.onsuccess = function (event) {
                    console.log("Object " + keyValue + " deleted from " + objectStoreName + " objectStore");
                    resolve();
                };
                //and when 
                request.onerror = function () {
                    console.log("error trying to delete " + keyValue + ": ", this.error);
                    reject();
                };
            }
            catch (error) {
                throw error;
            }
        });
    };
    /**
     *
     * @param objectStoreName
     * @param cursorRange
     * @param cursorDirection
     */
    IndexedDBStorage.prototype.openCursorInObjectStore = function (objectStoreName, cursorRange, cursorDirection) {
        var me = this;
        return new Promise(function (resolve, reject) {
            //get ObjectStore to store data
            var objectStore = me.getObjectStore(objectStoreName);
            try {
                //and try to delete it 
                var request = objectStore.openCursor(cursorRange, cursorDirection);
                //hendling when insertion is success
                request.onsuccess = function (event) {
                    console.log("cursor opened for " + objectStoreName + " objectStore");
                    resolve(this.result);
                };
                //and when 
                request.onerror = function () {
                    console.log("error trying to open a cursor on " + objectStoreName + " objectStore: ", this.error);
                    reject();
                };
            }
            catch (error) {
                throw error;
            }
        });
    };
    /**
     *
     * @param objectStoreName
     * @param keyName
     */
    IndexedDBStorage.prototype.indexInObjectStore = function (objectStoreName, keyName) {
        var me = this;
        //get ObjectStore to store data
        var objectStore = me.getObjectStore(objectStoreName);
        return objectStore.index(keyName);
    };
    /**
     *
     * @param objectStoreName
     */
    IndexedDBStorage.prototype.clearObjectStore = function (objectStoreName) {
        var me = this;
        return new Promise(function (resolve, reject) {
            //get ObjectStore to store data
            var objectStore = me.getObjectStore(objectStoreName);
            try {
                //and try to delete it 
                var request = objectStore.clear();
                //hendling when insertion is success
                request.onsuccess = function (event) {
                    console.log("objectStore " + objectStoreName + " cleared.");
                    resolve(this.result);
                };
                //and when 
                request.onerror = function () {
                    console.log("error trying to clear " + objectStoreName + " objectStore", this.error);
                    reject();
                };
            }
            catch (error) {
                throw error;
            }
        });
    };
    /**
     *
     * @param objectStoreName
     * @param key
     */
    IndexedDBStorage.prototype.countElementsInObjectStore = function (objectStoreName, key) {
        var me = this;
        return new Promise(function (resolve, reject) {
            //get ObjectStore to store data
            var objectStore = me.getObjectStore(objectStoreName);
            try {
                var request = objectStore.count(key);
                request.onsuccess = function (event) {
                    console.log("objectStore " + objectStoreName + " has " + key + " elements");
                    resolve(this.result);
                };
                //and when 
                request.onerror = function () {
                    console.error("error trying to count elements in " + objectStoreName + " objectStore: ", this.error);
                    reject();
                };
            }
            catch (error) {
                throw error;
            }
        });
    };
    /**
     * Function that open an IndexedDB instance
     * @param databaseName
     * @param databaseVersion
     * @param objectStoreSpec
     */
    IndexedDBStorage.prototype.openIDB = function (databaseName, databaseVersion, objectStoreSpec) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("start to open the IDB...", "IndexedDBStorage.openIDB");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.openIndexedDB(databaseName, databaseVersion, objectStoreSpec)];
                    case 2:
                        _a.sent();
                        console.log("database open finished.", "IndexedDBStorage.openIDB");
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Function that add an element in a specific objectStore
     * in the database handled by one instance of this class
     * @param objectStoreName
     * @param item
     */
    IndexedDBStorage.prototype.add = function (objectStoreName, item, keyValue) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("inserting...");
                        return [4 /*yield*/, this.addItemToObjectStore(objectStoreName, item, keyValue)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2, "IndexedDBStorage.add");
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Function that return an item contained in a specific objectStore
     * in the database handled by one instance of this class
     * @param objectStoreName
     * @param keyValue
     */
    IndexedDBStorage.prototype.get = function (objectStoreName, keyValue) {
        return __awaiter(this, void 0, void 0, function () {
            var item, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getItemFromObjectStore(objectStoreName, keyValue)];
                    case 1:
                        item = _a.sent();
                        return [2 /*return*/, item];
                    case 2:
                        error_3 = _a.sent();
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Function that update an item contained in a specific objectStore
     * in the database handled by one instance of this class
     * @param objectStoreName
     * @param item
     */
    IndexedDBStorage.prototype.put = function (objectStoreName, item, keyValue) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.putItemToObjectStore(objectStoreName, item, keyValue)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param objectStoreName
     * @param keyValue
     */
    IndexedDBStorage.prototype.delete = function (objectStoreName, keyValue) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.deleteItemFromObjectStore(objectStoreName, keyValue)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        throw error_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param objectStoreName
     * @param cursorRange
     * @param cursorDirection
     */
    IndexedDBStorage.prototype.openCursor = function (objectStoreName, cursorRange, cursorDirection) {
        return __awaiter(this, void 0, void 0, function () {
            var cursor, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.openCursorInObjectStore(objectStoreName, cursorRange, cursorDirection)];
                    case 1:
                        cursor = _a.sent();
                        return [2 /*return*/, cursor];
                    case 2:
                        error_6 = _a.sent();
                        throw error_6;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param objectStoreName
     * @param keyName
     */
    IndexedDBStorage.prototype.index = function (objectStoreName, keyName) {
        return this.indexInObjectStore(objectStoreName, keyName);
    };
    /**
     *
     * @param objectStoreName
     */
    IndexedDBStorage.prototype.clear = function (objectStoreName) {
        return __awaiter(this, void 0, void 0, function () {
            var request, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.clearObjectStore(objectStoreName)];
                    case 1:
                        request = _a.sent();
                        return [2 /*return*/, request];
                    case 2:
                        error_7 = _a.sent();
                        throw error_7;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param objectStoreName
     * @param key
     */
    IndexedDBStorage.prototype.count = function (objectStoreName, key) {
        return __awaiter(this, void 0, void 0, function () {
            var count, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.countElementsInObjectStore(objectStoreName, key)];
                    case 1:
                        count = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _a.sent();
                        throw error_8;
                    case 3: throw new Error("Method not implemented.");
                }
            });
        });
    };
    /**
     *
     * @param objectStoreName
     * @param keyName
     * @param keyValue
     */
    IndexedDBStorage.prototype.getItemByIndex = function (objectStoreName, keyName, keyValue) {
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index = this.index(objectStoreName, keyName);
                        return [4 /*yield*/, index.get(keyValue)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return IndexedDBStorage;
}());



/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/index.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDhhMTA0ZGQxZmMyYjFjYTkwZWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXhlZERCL0luZGV4ZWREQlN0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQTJEO0FBQzNEO0FBQ0E7QUFDQSxXQUFHOztBQUVILG9EQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOzs7O0FBSUE7QUFDQSxzREFBOEM7QUFDOUM7QUFDQSxvQ0FBNEI7QUFDNUIscUNBQTZCO0FBQzdCLHlDQUFpQzs7QUFFakMsK0NBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhDQUFzQztBQUN0QztBQUNBO0FBQ0EscUNBQTZCO0FBQzdCLHFDQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLGdCQUFnQjtBQUNwQztBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBb0IsZ0JBQWdCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBaUIsOEJBQThCO0FBQy9DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQSw0REFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQSxhQUFLO0FBQ0wsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUFrQixjQUFjO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QixVQUE0QixlQUF1QixFQUFFLE9BQWUsRUFBRSxRQUFtQzs7Z0JBQy9GLEtBQUs7Ozs7Z0NBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDO3dCQUMzQyxxQkFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQzs0QkFBaEMsc0JBQU8sU0FBeUI7Ozs7S0FDbkM7SUFDTCx1QkFBQztBQUFELENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHRoaXNbXCJ3ZWJwYWNrSG90VXBkYXRlSW5kZXhlZERCU3RvcmFnZVwiXTtcbiBcdHRoaXNbXCJ3ZWJwYWNrSG90VXBkYXRlSW5kZXhlZERCU3RvcmFnZVwiXSA9IFxyXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcclxuIFx0XHRpZihwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xyXG4gXHR9IDtcclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XHJcbiBcdFx0c2NyaXB0LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xyXG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xyXG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XHJcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gXHRcdFx0aWYodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKVxyXG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XHJcbiBcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcclxuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcclxuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gMTAwMDA7XHJcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcclxuIFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiBcdFx0XHRcdGlmKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xyXG4gXHRcdFx0XHRpZihyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xyXG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcclxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKSk7XHJcbiBcdFx0XHRcdH0gZWxzZSBpZihyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XHJcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxyXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcclxuIFx0XHRcdFx0fSBlbHNlIGlmKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xyXG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcclxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XHJcbiBcdFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xyXG4gXHRcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XHJcbiBcdFx0XHRcdFx0fSBjYXRjaChlKSB7XHJcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XHJcbiBcdFx0XHRcdFx0XHRyZXR1cm47XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fTtcclxuIFx0XHR9KTtcclxuIFx0fVxyXG5cbiBcdFxyXG4gXHRcclxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xyXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcImQ4YTEwNGRkMWZjMmIxY2E5MGVhXCI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XHJcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRpZighbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xyXG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcclxuIFx0XHRcdGlmKG1lLmhvdC5hY3RpdmUpIHtcclxuIFx0XHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xyXG4gXHRcdFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA8IDApXHJcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA8IDApXHJcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcclxuIFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlcXVlc3QgKyBcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgKyBtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcclxuIFx0XHR9O1xyXG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XHJcbiBcdFx0XHRyZXR1cm4ge1xyXG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXHJcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XHJcbiBcdFx0XHRcdH0sXHJcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH07XHJcbiBcdFx0fTtcclxuIFx0XHRmb3IodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmIG5hbWUgIT09IFwiZVwiKSB7XHJcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XHJcbiBcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicmVhZHlcIilcclxuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcclxuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcclxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xyXG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcclxuIFx0XHRcdFx0dGhyb3cgZXJyO1xyXG4gXHRcdFx0fSk7XHJcbiBcdFxyXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xyXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XHJcbiBcdFx0XHRcdGlmKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcclxuIFx0XHRcdFx0XHRpZighaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XHJcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0aWYoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcclxuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9O1xyXG4gXHRcdHJldHVybiBmbjtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHR2YXIgaG90ID0ge1xyXG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxyXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcclxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXHJcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcclxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxyXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXHJcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcclxuIFx0XHJcbiBcdFx0XHQvLyBNb2R1bGUgQVBJXHJcbiBcdFx0XHRhY3RpdmU6IHRydWUsXHJcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcclxuIFx0XHRcdFx0XHRob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XHJcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKVxyXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xyXG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXHJcbiBcdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcclxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XHJcbiBcdFx0XHRcdGVsc2VcclxuIFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xyXG4gXHRcdFx0XHRpZih0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKVxyXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcclxuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxyXG4gXHRcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXHJcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xyXG4gXHRcdFx0XHRlbHNlXHJcbiBcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcclxuIFx0XHRcdFx0aWYoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHJcbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxyXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxyXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxyXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XHJcbiBcdFx0XHRcdGlmKCFsKSByZXR1cm4gaG90U3RhdHVzO1xyXG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcclxuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XHJcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xyXG4gXHRcdFx0XHRpZihpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcclxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxyXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXHJcbiBcdFx0fTtcclxuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XHJcbiBcdFx0cmV0dXJuIGhvdDtcclxuIFx0fVxyXG4gXHRcclxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XHJcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcclxuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XHJcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxyXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xyXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcclxuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xyXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XHJcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xyXG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcclxuIFx0dmFyIGhvdERlZmVycmVkO1xyXG4gXHRcclxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXHJcbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XHJcbiBcdFx0dmFyIGlzTnVtYmVyID0gKCtpZCkgKyBcIlwiID09PSBpZDtcclxuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcclxuIFx0XHRpZihob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcclxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XHJcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoKS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xyXG4gXHRcdFx0aWYoIXVwZGF0ZSkge1xyXG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xyXG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuIFx0XHRcdH1cclxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcclxuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XHJcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XHJcbiBcdFxyXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcclxuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xyXG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXHJcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcclxuIFx0XHRcdFx0fTtcclxuIFx0XHRcdH0pO1xyXG4gXHRcdFx0aG90VXBkYXRlID0ge307XHJcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IDA7XHJcbiBcdFx0XHR7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZS1ibG9ja3NcclxuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cclxuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XHJcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xyXG4gXHRcdH0pO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0aWYoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcclxuIFx0XHRcdHJldHVybjtcclxuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xyXG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcdGlmKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcclxuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuIFx0XHR9XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcclxuIFx0XHRpZighaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcclxuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcclxuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xyXG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcclxuIFx0XHR9XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XHJcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XHJcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XHJcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xyXG4gXHRcdGlmKCFkZWZlcnJlZCkgcmV0dXJuO1xyXG4gXHRcdGlmKGhvdEFwcGx5T25VcGRhdGUpIHtcclxuIFx0XHRcdGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiBcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcclxuIFx0XHRcdH0sIGZ1bmN0aW9uKGVycikge1xyXG4gXHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcclxuIFx0XHRcdH0pO1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XHJcbiBcdFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xyXG4gXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcclxuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcclxuIFx0XHR9XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcclxuIFx0XHRpZihob3RTdGF0dXMgIT09IFwicmVhZHlcIikgdGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xyXG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gXHRcclxuIFx0XHR2YXIgY2I7XHJcbiBcdFx0dmFyIGk7XHJcbiBcdFx0dmFyIGo7XHJcbiBcdFx0dmFyIG1vZHVsZTtcclxuIFx0XHR2YXIgbW9kdWxlSWQ7XHJcbiBcdFxyXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcclxuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xyXG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XHJcbiBcdFxyXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XHJcbiBcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXHJcbiBcdFx0XHRcdFx0aWQ6IGlkXHJcbiBcdFx0XHRcdH07XHJcbiBcdFx0XHR9KTtcclxuIFx0XHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xyXG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XHJcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcclxuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdGlmKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKVxyXG4gXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRpZihtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcclxuIFx0XHRcdFx0XHRyZXR1cm4ge1xyXG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXHJcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXHJcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcclxuIFx0XHRcdFx0XHR9O1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKG1vZHVsZS5ob3QuX21haW4pIHtcclxuIFx0XHRcdFx0XHRyZXR1cm4ge1xyXG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXHJcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXHJcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcclxuIFx0XHRcdFx0XHR9O1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xyXG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcclxuIFx0XHRcdFx0XHRpZighcGFyZW50KSBjb250aW51ZTtcclxuIFx0XHRcdFx0XHRpZihwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcclxuIFx0XHRcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcclxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcclxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcclxuIFx0XHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGlmKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSA+PSAwKSBjb250aW51ZTtcclxuIFx0XHRcdFx0XHRpZihwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcclxuIFx0XHRcdFx0XHRcdGlmKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXHJcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xyXG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcclxuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xyXG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcclxuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcclxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXHJcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcclxuIFx0XHRcdFx0XHR9KTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcclxuIFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcclxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxyXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcclxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXHJcbiBcdFx0XHR9O1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xyXG4gXHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xyXG4gXHRcdFx0XHRpZihhLmluZGV4T2YoaXRlbSkgPCAwKVxyXG4gXHRcdFx0XHRcdGEucHVzaChpdGVtKTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXHJcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxyXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xyXG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xyXG4gXHRcclxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xyXG4gXHRcdFx0Y29uc29sZS53YXJuKFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiKTtcclxuIFx0XHR9O1xyXG4gXHRcclxuIFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XHJcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XHJcbiBcdFx0XHRcdHZhciByZXN1bHQ7XHJcbiBcdFx0XHRcdGlmKGhvdFVwZGF0ZVtpZF0pIHtcclxuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XHJcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXHJcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcclxuIFx0XHRcdFx0XHR9O1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XHJcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XHJcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcclxuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XHJcbiBcdFx0XHRcdGlmKHJlc3VsdC5jaGFpbikge1xyXG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRzd2l0Y2gocmVzdWx0LnR5cGUpIHtcclxuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkRlY2xpbmVkKVxyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxyXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgKyByZXN1bHQubW9kdWxlSWQgKyBjaGFpbkluZm8pO1xyXG4gXHRcdFx0XHRcdFx0YnJlYWs7XHJcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRGVjbGluZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xyXG4gXHRcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXHJcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIiBpbiBcIiArIHJlc3VsdC5wYXJlbnRJZCArIGNoYWluSW5mbyk7XHJcbiBcdFx0XHRcdFx0XHRicmVhaztcclxuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vblVuYWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XHJcbiBcdFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxyXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mbyk7XHJcbiBcdFx0XHRcdFx0XHRicmVhaztcclxuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcclxuIFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25BY2NlcHRlZClcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XHJcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkRpc3Bvc2VkKVxyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XHJcbiBcdFx0XHRcdFx0XHRicmVhaztcclxuIFx0XHRcdFx0XHRkZWZhdWx0OlxyXG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRpZihhYm9ydEVycm9yKSB7XHJcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XHJcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKGRvQXBwbHkpIHtcclxuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XHJcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcclxuIFx0XHRcdFx0XHRmb3IobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XHJcbiBcdFx0XHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0XHRcdFx0aWYoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcclxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcclxuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLCByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYoZG9EaXNwb3NlKSB7XHJcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XHJcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cclxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XHJcbiBcdFx0Zm9yKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcclxuIFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkKVxyXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XHJcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcclxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXHJcbiBcdFx0XHRcdH0pO1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcclxuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XHJcbiBcdFx0XHRpZihob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcclxuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH0pO1xyXG4gXHRcclxuIFx0XHR2YXIgaWR4O1xyXG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xyXG4gXHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XHJcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdGlmKCFtb2R1bGUpIGNvbnRpbnVlO1xyXG4gXHRcclxuIFx0XHRcdHZhciBkYXRhID0ge307XHJcbiBcdFxyXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXHJcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xyXG4gXHRcdFx0Zm9yKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xyXG4gXHRcdFx0XHRjYihkYXRhKTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XHJcbiBcdFxyXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcclxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XHJcbiBcdFxyXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXHJcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFxyXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cclxuIFx0XHRcdGZvcihqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xyXG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XHJcbiBcdFx0XHRcdGlmKCFjaGlsZCkgY29udGludWU7XHJcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSB7XHJcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cclxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcclxuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XHJcbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0aWYobW9kdWxlKSB7XHJcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdFx0Zm9yKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcclxuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcclxuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xyXG4gXHRcdFx0XHRcdFx0aWYoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcclxuIFx0XHJcbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xyXG4gXHRcclxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcclxuIFx0XHRmb3IobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcclxuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xyXG4gXHRcdGZvcihtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XHJcbiBcdFx0XHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xyXG4gXHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XHJcbiBcdFx0XHRcdFx0aWYoY2FsbGJhY2tzLmluZGV4T2YoY2IpID49IDApIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRmb3IoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcclxuIFx0XHRcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xyXG4gXHRcdFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XHJcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxyXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcclxuIFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxyXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcclxuIFx0XHRcdFx0XHRcdFx0fSk7XHJcbiBcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvciA9IGVycjtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXHJcbiBcdFx0Zm9yKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcclxuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XHJcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XHJcbiBcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcclxuIFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdGlmKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiBcdFx0XHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XHJcbiBcdFx0XHRcdFx0fSBjYXRjaChlcnIyKSB7XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XHJcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcclxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXHJcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXHJcbiBcdFx0XHRcdFx0XHRcdFx0b3JnaW5hbEVycm9yOiBlcnJcclxuIFx0XHRcdFx0XHRcdFx0fSk7XHJcbiBcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvciA9IGVycjI7XHJcbiBcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xyXG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcclxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXHJcbiBcdFx0XHRcdFx0XHR9KTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0aWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdFx0XHRlcnJvciA9IGVycjtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXHJcbiBcdFx0aWYoZXJyb3IpIHtcclxuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XHJcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcclxuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xyXG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xyXG4gXHRcdH0pO1xyXG4gXHR9XHJcblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKDApKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQ4YTEwNGRkMWZjMmIxY2E5MGVhIiwidmFyIGluZGV4ID0gcmVxdWlyZShcIi4vaW5kZXgudHNcIilcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gaW5kZXguSW5kZXhlZERCU3RvcmFnZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtJbmRleGVkREJTdG9yYWdlfSBmcm9tICcuL2luZGV4ZWREQi9JbmRleGVkREJTdG9yYWdlJ1xyXG5cclxuZXhwb3J0IHtJbmRleGVkREJTdG9yYWdlfVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC50cyIsImltcG9ydCB7IElBc3luY1N0b3JhZ2UgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9JQXN5bmNTdG9yYWdlXCJcclxuaW1wb3J0IHtJSW5kZXhEQlNwZWMsSU9iamVjdFN0b3JlU3BlY30gZnJvbSBcIi4uL2ludGVyZmFjZXMvSU9iamVjdFN0b3JlU3BlY1wiXHJcblxyXG4vL3RyYW5zYWN0aW9uIG1vZGVzXHJcbmNvbnN0IFJFQURfT05MWSA9ICdyZWFkb25seSdcclxuY29uc3QgUkVBRF9XUklURSA9ICdyZWFkd3JpdGUnXHJcbmNvbnN0IFZFUlNJT05fQ0hBTkdFID0gJ3ZlcnNpb25jaGFuZ2UnXHJcbi8vdHJhbnNhY3Rpb24gdHlwZXNcclxuY29uc3QgQUREID0gJ2FkZCdcclxuY29uc3QgR0VUID0gJ2dldCdcclxuY29uc3QgREVMRVRFID0gJ2RlbGV0ZSdcclxuZXhwb3J0IGNsYXNzIEluZGV4ZWREQlN0b3JhZ2UgaW1wbGVtZW50cyBJQXN5bmNTdG9yYWdlIHtcclxuXHJcbiAgICBwcml2YXRlIGRhdGFiYXNlQ3JlYXRlZDogYm9vbGVhblxyXG4gICAgcHJpdmF0ZSBkYXRhYmFzZU5hbWU6IHN0cmluZ1xyXG4gICAgcHJpdmF0ZSBkYXRhYmFzZVZlcnNpb246IG51bWJlclxyXG4gICAgcHJpdmF0ZSBkYXRhYmFzZTogSURCRGF0YWJhc2VcclxuICAgIHByaXZhdGUgb2JqZWN0U3RvcmVTcGVjOiBJT2JqZWN0U3RvcmVTcGVjW11cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJuIGEgcHJvbWlzZSBvZiBhIElEQkRhdGFiYXNlIGluc3RhbmNlXHJcbiAgICAgKiBAcGFyYW0gZGF0YWJhc2VOYW1lIFxyXG4gICAgICogQHBhcmFtIGRhdGFiYXNlVmVyc2lvbiBcclxuICAgICAqIEBwYXJhbSBvYmplY3RTdG9yZVNwZWMgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb3BlbkluZGV4ZWREQihkYXRhYmFzZU5hbWU6IHN0cmluZywgZGF0YWJhc2VWZXJzaW9uOiBudW1iZXIsIG9iamVjdFN0b3JlU3BlYzogSU9iamVjdFN0b3JlU3BlY1tdKTogUHJvbWlzZTxJREJEYXRhYmFzZT57XHJcblxyXG4gICAgICAgIGNvbnN0IG1lID0gdGhpc1xyXG4gICAgICAgIFxyXG4gICAgICAgIG1lLmRhdGFiYXNlQ3JlYXRlZCA9IGZhbHNlXHJcbiAgICAgICAgbWUuZGF0YWJhc2VOYW1lID0gZGF0YWJhc2VOYW1lXHJcbiAgICAgICAgbWUuZGF0YWJhc2VWZXJzaW9uID0gZGF0YWJhc2VWZXJzaW9uXHJcbiAgICAgICAgbWUub2JqZWN0U3RvcmVTcGVjID0gb2JqZWN0U3RvcmVTcGVjXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRpbmcgcHJvbWlzZS4uLlwiLCBcIkluZGV4ZWREQlN0b3JhZ2Uub3BlbkluZGV4ZWREQlwiKVxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3BlbmluZyBJREIgRGF0YWJhc2UuLi5cIiwgXCJJbmRleGVkREJTdG9yYWdlLm9wZW5JbmRleGVkREJcIilcclxuICAgICAgICAgICAgLy9zdGFydCB0byBvcGVuIHRoZSBkYXRhYmFzZVxyXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gd2luZG93LmluZGV4ZWREQi5vcGVuKG1lLmRhdGFiYXNlTmFtZSwgbWUuZGF0YWJhc2VWZXJzaW9uKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gdGhpcyBjYWxsYmFjayBpcyBleGVjdXRlZCwgd2hlbiBhIG5ldyBEYXRhYmFzZSBpcyBjcmVhdGVkXHJcbiAgICAgICAgICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIG1lLmRhdGFiYXNlQ3JlYXRlZCA9IHRydWVcclxuICAgICAgICAgICAgICAgIG1lLmRhdGFiYXNlID0gdGhpcy5yZXN1bHRcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIkRhdGFiYXNlIHN1Y2Nlc3NmdWxseSBjcmVhdGVkXCIsIFwiY2FsbGJhY2sgb251cGdyYWRlbmVlZGVkIEluZGV4ZWREQlN0b3JhZ2Uub3BlbkluZGV4ZWREQlwiKVxyXG4gICAgICAgICAgICAgICAgLy9ub3csIGNyZWF0ZSBhIG9iamVjdFN0b3JlIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgZm9yKGNvbnN0IGkgaW4gbWUub2JqZWN0U3RvcmVTcGVjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hbmQgYWRkIHRoZSBuZXcgb2JqZWN0U3RvcmUgdG8gb3VyIG9iamVjdFN0b3JlcyBvYmplY3RcclxuICAgICAgICAgICAgICAgICAgICAvL21lLmNyZWF0ZU9iamVjdFN0b3JlKG1lLmRhdGFiYXNlLCBtZS5vYmplY3RTdG9yZVNwZWNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBjcmVhdGluZyBvYmplY3RTdG9yZSAke29iamVjdFN0b3JlU3BlY1tpXS5vYmplY3RTdG9yZU5hbWV9YCkgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY3JlYXRlIG9iamVjdFN0b3JlXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2JqZWN0U3RvcmUgPSBtZS5kYXRhYmFzZS5jcmVhdGVPYmplY3RTdG9yZShvYmplY3RTdG9yZVNwZWNbaV0ub2JqZWN0U3RvcmVOYW1lLG9iamVjdFN0b3JlU3BlY1tpXS5vYmplY3RTdG9yZVNldHRpbmdzKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vYW5kIGNyZWF0ZSBpbmRleCBpZiBhcmUgZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKG9iamVjdFN0b3JlU3BlY1tpXS5vYmplY3RTdG9yZUluZGV4ZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGogaW4gb2JqZWN0U3RvcmVTcGVjW2ldLm9iamVjdFN0b3JlSW5kZXhlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jcmVhdGUgaW5kZXhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBjcmVhdGluZyBpbmRleCAke29iamVjdFN0b3JlU3BlY1tpXS5vYmplY3RTdG9yZUluZGV4ZXNbal0uaW5kZXhOYW1lfSBmb3Igb2JqZWN0U3RvcmUgJHtvYmplY3RTdG9yZVNwZWNbaV0ub2JqZWN0U3RvcmVOYW1lfWApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RTdG9yZS5jcmVhdGVJbmRleChvYmplY3RTdG9yZVNwZWNbaV0ub2JqZWN0U3RvcmVJbmRleGVzW2pdLmluZGV4TmFtZSwgb2JqZWN0U3RvcmVTcGVjW2ldLm9iamVjdFN0b3JlSW5kZXhlc1tqXS5rZXlQYXRoLCBvYmplY3RTdG9yZVNwZWNbaV0ub2JqZWN0U3RvcmVJbmRleGVzW2pdLm9wdGlvbmFsUGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgLy8gdGhpcyBjYWxsYmFjayBpcyBleGVjdXRlZCB3aGVuIHRoZSBkYXRhYmFzZSBleGlzdHMgYW4gaXQncyBvcGVuZWRcclxuICAgICAgICAgICAgLy8gaWYgdGhlIGRhdGFiYXNlIGRvZXNuJ3QgZXhpc3QsIHRoZW4gZXhlY3V0ZSBvbnVwZ3JhZGVuZWVkZWQgY2FsbGJhY2sgZmlyc3QsIGFuZCB0aGlzIGxhdGVyXHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIkRhdGFiYXNlIGlzIE9wZW5cIiwgXCJjYWxsYmFjayBvbnN1Y2Nlc3MgSW5kZXhlZERCU3RvcmFnZS5vcGVuSW5kZXhlZERCXCIpXHJcbiAgICAgICAgICAgICAgICBpZighbWUuZGF0YWJhc2VDcmVhdGVkKXtcclxuICAgICAgICAgICAgICAgICAgICBtZS5kYXRhYmFzZSA9IHRoaXMucmVzdWx0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIHRoaXMgY2FsbGJhY2sgaXMgZXhlY3V0ZWQgd2hlbiB0aGUgZGF0YWJhc2UgaXMgb3BlblxyXG4gICAgICAgICAgICByZXF1ZXN0Lm9uYmxvY2tlZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJEYXRhYmFzZSBpcyBibG9ja2VkXCIpXHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXZlbnQpXHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAvLyBpZiBhbiBlcnJvciBoYXBwZW5lZCwgcmVqZWN0IHRoZSBwcm9taXNlXHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEYXRhYmFzZSBjb3VsZG4ndCBiZSBvcGVuZWRcIilcclxuICAgICAgICAgICAgICAgIHJlamVjdChldmVudClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGNyZWF0ZSBhIG5ldyBJREJPYmplY3RTdG9yZSBpbiB0aGUgc3BlY2lmaWVkIGRhdGFiYXNlXHJcbiAgICAgKiBAcGFyYW0gZGF0YWJhc2UgXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0U3RvcmVTcGVjIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZU9iamVjdFN0b3JlKGRhdGFiYXNlOiBJREJEYXRhYmFzZSwgb2JqZWN0U3RvcmVTcGVjOiBJT2JqZWN0U3RvcmVTcGVjKTogdm9pZHtcclxuICAgICAgICBjb25zb2xlLmxvZyhgY3JlYXRpbmcgb2JqZWN0U3RvcmUgJHtvYmplY3RTdG9yZVNwZWMub2JqZWN0U3RvcmVOYW1lfWApICAgICAgICBcclxuICAgICAgICAvL2NyZWF0ZSBvYmplY3RTdG9yZVxyXG4gICAgICAgIGNvbnN0IG9iamVjdFN0b3JlID0gZGF0YWJhc2UuY3JlYXRlT2JqZWN0U3RvcmUob2JqZWN0U3RvcmVTcGVjLm9iamVjdFN0b3JlTmFtZSxvYmplY3RTdG9yZVNwZWMub2JqZWN0U3RvcmVTZXR0aW5ncylcclxuICAgICAgICAvL2FuZCBjcmVhdGUgaW5kZXggaWYgYXJlIGRlZmluZWRcclxuICAgICAgICBpZihvYmplY3RTdG9yZVNwZWMub2JqZWN0U3RvcmVJbmRleGVzKXtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBpIGluIG9iamVjdFN0b3JlU3BlYy5vYmplY3RTdG9yZUluZGV4ZXMpIHtcclxuICAgICAgICAgICAgICAgIC8vY3JlYXRlIGluZGV4XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgY3JlYXRpbmcgaW5kZXggJHtvYmplY3RTdG9yZVNwZWMub2JqZWN0U3RvcmVJbmRleGVzW2ldLmluZGV4TmFtZX0gZm9yIG9iamVjdFN0b3JlICR7b2JqZWN0U3RvcmVTcGVjLm9iamVjdFN0b3JlTmFtZX1gKVxyXG4gICAgICAgICAgICAgICAgb2JqZWN0U3RvcmUuY3JlYXRlSW5kZXgob2JqZWN0U3RvcmVTcGVjLm9iamVjdFN0b3JlSW5kZXhlc1tpXS5pbmRleE5hbWUsIG9iamVjdFN0b3JlU3BlYy5vYmplY3RTdG9yZUluZGV4ZXNbaV0ua2V5UGF0aCwgb2JqZWN0U3RvcmVTcGVjLm9iamVjdFN0b3JlSW5kZXhlc1tpXS5vcHRpb25hbFBhcmFtcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRoYXQgb3BlbiBhbiBleGlzdGluZyBJREJPYmplY3RTdG9yZSBpIHRoZSBzcGVjaWZpZWQgZGF0YWJhc2VcclxuICAgICAqIEBwYXJhbSBvYmplY3RTdG9yZVNwZWMgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0T2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lOiBzdHJpbmcsIHRyYW5zYWN0aW9uTW9kZT86IElEQlRyYW5zYWN0aW9uTW9kZSk6IElEQk9iamVjdFN0b3Jle1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgLy9vcGVuIHRoZSBvYmplY3QgU3RvcmUgZnJvbSBJbmRleGVkREIgaW5zdGFuY2VcclxuICAgICAgICAgICAgLy9jcmVhdGUgYSB0cmFuc2FjdGlvbiBpbiB0aGUgZGF0YWJhc2VcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNhY3Rpb24gPSB0aGlzLmRhdGFiYXNlLnRyYW5zYWN0aW9uKG9iamVjdFN0b3JlTmFtZSwgdHJhbnNhY3Rpb25Nb2RlKVxyXG4gICAgICAgICAgICAvL2FuZCByZXR1cm4gdGhlIG9iamVjdFN0b3JlIHNwZWNpZmllZFxyXG4gICAgICAgICAgICByZXR1cm4gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lKVxyXG4gICAgICAgIH0gY2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yLCBcIkluZGV4ZWREQlN0b3JlLmdldE9iamVjdFN0b3JlXCIpXHJcbiAgICAgICAgICAgIHRocm93IGVycm9yXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdGhhdCBhZGRzIGFuIGl0ZW0gdG8gYW4gc3BlY2lmaWMgb2JqZWN0U3RvcmUgaW4gdGhlIG9wZW5lZCBkYXRhYmFzZSxcclxuICAgICAqIHJldHVybmluZyBhIFByb21pc2Ugb2YgYW4gSURCUmVxdWVzdCBvYmplY3QgdGhhdCBjb250YWluIHRoZSByZXN1bHQgb2YgdGhlIHRyYW5zYWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0U3RvcmVOYW1lIFxyXG4gICAgICogQHBhcmFtIGl0ZW0gXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkSXRlbVRvT2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lOiBzdHJpbmcsIGl0ZW06IGFueSwga2V5VmFsdWU6IElEQktleVJhbmdlIHwgSURCVmFsaWRLZXkpOiBQcm9taXNlPElEQlJlcXVlc3Q+IHtcclxuICAgICAgICBjb25zdCBtZSA9IHRoaXNcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIC8vZ2V0IE9iamVjdFN0b3JlIHRvIHN0b3JlIGRhdGFcclxuICAgICAgICAgICAgY29uc3Qgb2JqZWN0U3RvcmUgPSBtZS5nZXRPYmplY3RTdG9yZShvYmplY3RTdG9yZU5hbWUsIFJFQURfV1JJVEUpXHJcbiAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgIC8vYW5kIHRyeSB0byBhZGQgaXQgXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVxdWVzdFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0cnlpbmcgdG8gaW5zZXJ0IGRhdGFcIilcclxuICAgICAgICAgICAgICAgIGlmKGtleVZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0ID0gb2JqZWN0U3RvcmUuYWRkKGl0ZW0sIGtleVZhbHVlKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0ID0gb2JqZWN0U3RvcmUuYWRkKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdlbmVyYXRlIHJlcXVlc3RcIilcclxuICAgICAgICAgICAgICAgIC8vaGVuZGxpbmcgd2hlbiBpbnNlcnRpb24gaXMgc3VjY2Vzc1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkluc2VydGlvbiBpbiBEQiBzdWNjZXNzZnVsXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2FuZCB3aGVuIFxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkluc2VydGlvbiBmYWlsZWRcIiwgdGhpcy5lcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KClcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yLm5hbWUgPT0gJ0RhdGFDbG9uZUVycm9yJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlRoaXMgZW5naW5lIGRvZXNuJ3Qga25vdyBob3cgdG8gY2xvbmUgYSBCbG9iLCB1c2UgRmlyZWZveCBvciBDaHJvbWVcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLCBcIkluZGV4ZWREQlN0b3JhZ2UuYWRkSXRlbVRvT2JqZWN0U3RvcmVcIilcclxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0U3RvcmVOYW1lIFxyXG4gICAgICogQHBhcmFtIGtleVZhbHVlIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEl0ZW1Gcm9tT2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lOiBzdHJpbmcsIGtleVZhbHVlOiBJREJLZXlSYW5nZSB8IElEQlZhbGlkS2V5KTogUHJvbWlzZTxJREJSZXF1ZXN0PntcclxuICAgICAgICBjb25zdCBtZSA9IHRoaXNcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIC8vZ2V0IE9iamVjdFN0b3JlIHRvIHN0b3JlIGRhdGFcclxuICAgICAgICAgICAgY29uc3Qgb2JqZWN0U3RvcmUgPSBtZS5nZXRPYmplY3RTdG9yZShvYmplY3RTdG9yZU5hbWUsIFJFQURfT05MWSlcclxuICAgICAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAgICAgLy9hbmQgdHJ5IHRvIGRlbGV0ZSBpdCBcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBvYmplY3RTdG9yZS5nZXQoa2V5VmFsdWUpXHJcbiAgICAgICAgICAgICAgICAvL2hlbmRsaW5nIHdoZW4gaW5zZXJ0aW9uIGlzIHN1Y2Nlc3NcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYG9iamVjdCAke2tleVZhbHVlfSBmb3VuZGVkIGluICR7b2JqZWN0U3RvcmVOYW1lfSBvYmplY3RTdG9yZWApXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnJlc3VsdClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vYW5kIHdoZW4gXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgZXJyb3IgdHJ5aW5nIHRvIGdldCAke2tleVZhbHVlfSBpdGVtIGluICR7b2JqZWN0U3RvcmVOYW1lfSBvYmplY3RTdG9yZTogYCwgdGhpcy5lcnJvcilcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdGhhdCB1cGRhdGVzIGFuIGl0ZW0gaW4gYW4gc3BlY2lmaWMgb2JqZWN0U3RvcmUgZm9yIHRoZSBvcGVuZWQgZGF0YWJhc2UsXHJcbiAgICAgKiByZXR1cm5pbmcgYSBQcm9taXNlIG9mIGFuIElEQlJlcXVlc3Qgb2JqZWN0IHRoYXQgY29udGFpbiB0aGUgcmVzdWx0IG9mIHRoZSB0cmFuc2FjdGlvblxyXG4gICAgICogQHBhcmFtIG9iamVjdFN0b3JlTmFtZSBcclxuICAgICAqIEBwYXJhbSBpdGVtIFxyXG4gICAgICogQHBhcmFtIGtleVZhbHVlIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHB1dEl0ZW1Ub09iamVjdFN0b3JlKG9iamVjdFN0b3JlTmFtZTogc3RyaW5nLCBpdGVtOiBhbnksIGtleVZhbHVlOiBJREJLZXlSYW5nZSB8IElEQlZhbGlkS2V5KTogUHJvbWlzZTxJREJSZXF1ZXN0PiB7XHJcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAvL2dldCBPYmplY3RTdG9yZSB0byBzdG9yZSBkYXRhXHJcbiAgICAgICAgICAgIGNvbnN0IG9iamVjdFN0b3JlID0gbWUuZ2V0T2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lLCBSRUFEX1dSSVRFKVxyXG4gICAgICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgICAgICAvL2FuZCB0cnkgdG8gYWRkIGl0IFxyXG4gICAgICAgICAgICAgICAgbGV0IHJlcXVlc3RcclxuICAgICAgICAgICAgICAgIGlmKGtleVZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0ID0gb2JqZWN0U3RvcmUucHV0KGl0ZW0sIGtleVZhbHVlKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0ID0gb2JqZWN0U3RvcmUucHV0KGl0ZW0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2hlbmRsaW5nIHdoZW4gaW5zZXJ0aW9uIGlzIHN1Y2Nlc3NcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYG9iamVjdCAke2l0ZW19IHVwZGF0ZWQgaW4gJHtvYmplY3RTdG9yZU5hbWV9IG9iamVjdFN0b3JlYClcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vYW5kIHdoZW4gXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVXBkYXRlIGZhaWxlZFwiLCB0aGlzLmVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBjYXRjaChlcnJvcil7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRoYXQgZGVsZXRlIGEgcmVjb3JkIGluIGEgc3BlY2lmaWMgb2JqZWN0U3RvcmUgdXNpbmcgaGlzIGtleVxyXG4gICAgICogcmV0dXJuaW5nIGEgcHJvbWlzZSBvZiBhIElEQlJlcXVlc3Qgb2JqZWN0LCBjb250YWluaW5nIHRoZSByZXN1bHQgb2YgdGhlIHJlcXVlc3RcclxuICAgICAqIEBwYXJhbSBvYmplY3RTdG9yZU5hbWUgXHJcbiAgICAgKiBAcGFyYW0ga2V5VmFsdWUgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVsZXRlSXRlbUZyb21PYmplY3RTdG9yZShvYmplY3RTdG9yZU5hbWU6IHN0cmluZywga2V5VmFsdWU6IElEQktleVJhbmdlIHwgSURCVmFsaWRLZXkpOiBQcm9taXNlPElEQlJlcXVlc3Q+e1xyXG4gICAgICAgIGNvbnN0IG1lID0gdGhpc1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpID0+IHtcclxuICAgICAgICAgICAgLy9nZXQgT2JqZWN0U3RvcmUgdG8gc3RvcmUgZGF0YVxyXG4gICAgICAgICAgICBjb25zdCBvYmplY3RTdG9yZSA9IG1lLmdldE9iamVjdFN0b3JlKG9iamVjdFN0b3JlTmFtZSwgUkVBRF9XUklURSlcclxuICAgICAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAgICAgLy9hbmQgdHJ5IHRvIGRlbGV0ZSBpdCBcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBvYmplY3RTdG9yZS5kZWxldGUoa2V5VmFsdWUpXHJcbiAgICAgICAgICAgICAgICAvL2hlbmRsaW5nIHdoZW4gaW5zZXJ0aW9uIGlzIHN1Y2Nlc3NcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYE9iamVjdCAke2tleVZhbHVlfSBkZWxldGVkIGZyb20gJHtvYmplY3RTdG9yZU5hbWV9IG9iamVjdFN0b3JlYClcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vYW5kIHdoZW4gXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgZXJyb3IgdHJ5aW5nIHRvIGRlbGV0ZSAke2tleVZhbHVlfTogYCwgdGhpcy5lcnJvcilcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBjYXRjaChlcnJvcil7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIG9iamVjdFN0b3JlTmFtZSBcclxuICAgICAqIEBwYXJhbSBjdXJzb3JSYW5nZSBcclxuICAgICAqIEBwYXJhbSBjdXJzb3JEaXJlY3Rpb24gXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb3BlbkN1cnNvckluT2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lOiBzdHJpbmcsIGN1cnNvclJhbmdlPzogSURCS2V5UmFuZ2UgfCBJREJWYWxpZEtleSwgY3Vyc29yRGlyZWN0aW9uPzogSURCQ3Vyc29yRGlyZWN0aW9uKTogUHJvbWlzZTxJREJDdXJzb3I+e1xyXG4gICAgICAgIGNvbnN0IG1lID0gdGhpc1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcbiAgICAgICAgICAgIC8vZ2V0IE9iamVjdFN0b3JlIHRvIHN0b3JlIGRhdGFcclxuICAgICAgICAgICAgY29uc3Qgb2JqZWN0U3RvcmUgPSBtZS5nZXRPYmplY3RTdG9yZShvYmplY3RTdG9yZU5hbWUpXHJcbiAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgIC8vYW5kIHRyeSB0byBkZWxldGUgaXQgXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gb2JqZWN0U3RvcmUub3BlbkN1cnNvcihjdXJzb3JSYW5nZSwgY3Vyc29yRGlyZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLy9oZW5kbGluZyB3aGVuIGluc2VydGlvbiBpcyBzdWNjZXNzXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBjdXJzb3Igb3BlbmVkIGZvciAke29iamVjdFN0b3JlTmFtZX0gb2JqZWN0U3RvcmVgKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5yZXN1bHQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2FuZCB3aGVuIFxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYGVycm9yIHRyeWluZyB0byBvcGVuIGEgY3Vyc29yIG9uICR7b2JqZWN0U3RvcmVOYW1lfSBvYmplY3RTdG9yZTogYCwgdGhpcy5lcnJvcilcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBjYXRjaChlcnJvcil7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBvYmplY3RTdG9yZU5hbWUgXHJcbiAgICAgKiBAcGFyYW0ga2V5TmFtZSBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbmRleEluT2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lOiBzdHJpbmcsIGtleU5hbWU6IHN0cmluZyk6IElEQkluZGV4e1xyXG4gICAgICAgIGNvbnN0IG1lID0gdGhpc1xyXG4gICAgICAgIC8vZ2V0IE9iamVjdFN0b3JlIHRvIHN0b3JlIGRhdGFcclxuICAgICAgICBjb25zdCBvYmplY3RTdG9yZSA9IG1lLmdldE9iamVjdFN0b3JlKG9iamVjdFN0b3JlTmFtZSlcclxuICAgICAgICByZXR1cm4gb2JqZWN0U3RvcmUuaW5kZXgoa2V5TmFtZSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIG9iamVjdFN0b3JlTmFtZSBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbGVhck9iamVjdFN0b3JlKG9iamVjdFN0b3JlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxJREJSZXF1ZXN0PiB7XHJcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgICAgICAgICAgLy9nZXQgT2JqZWN0U3RvcmUgdG8gc3RvcmUgZGF0YVxyXG4gICAgICAgICAgICBjb25zdCBvYmplY3RTdG9yZSA9IG1lLmdldE9iamVjdFN0b3JlKG9iamVjdFN0b3JlTmFtZSlcclxuICAgICAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAgICAgLy9hbmQgdHJ5IHRvIGRlbGV0ZSBpdCBcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBvYmplY3RTdG9yZS5jbGVhcigpXHJcbiAgICAgICAgICAgICAgICAvL2hlbmRsaW5nIHdoZW4gaW5zZXJ0aW9uIGlzIHN1Y2Nlc3NcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYG9iamVjdFN0b3JlICR7b2JqZWN0U3RvcmVOYW1lfSBjbGVhcmVkLmApXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnJlc3VsdClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vYW5kIHdoZW4gXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgZXJyb3IgdHJ5aW5nIHRvIGNsZWFyICR7b2JqZWN0U3RvcmVOYW1lfSBvYmplY3RTdG9yZWAsIHRoaXMuZXJyb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaChlcnJvcil7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIG9iamVjdFN0b3JlTmFtZSBcclxuICAgICAqIEBwYXJhbSBrZXkgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY291bnRFbGVtZW50c0luT2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lLCBrZXk/KTogUHJvbWlzZTxudW1iZXI+e1xyXG4gICAgICAgIGNvbnN0IG1lID0gdGhpc1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcbiAgICAgICAgICAgIC8vZ2V0IE9iamVjdFN0b3JlIHRvIHN0b3JlIGRhdGFcclxuICAgICAgICAgICAgY29uc3Qgb2JqZWN0U3RvcmUgPSBtZS5nZXRPYmplY3RTdG9yZShvYmplY3RTdG9yZU5hbWUpXHJcbiAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBvYmplY3RTdG9yZS5jb3VudChrZXkpXHJcblxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgb2JqZWN0U3RvcmUgJHtvYmplY3RTdG9yZU5hbWV9IGhhcyAke2tleX0gZWxlbWVudHNgKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5yZXN1bHQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2FuZCB3aGVuIFxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgZXJyb3IgdHJ5aW5nIHRvIGNvdW50IGVsZW1lbnRzIGluICR7b2JqZWN0U3RvcmVOYW1lfSBvYmplY3RTdG9yZTogYCwgdGhpcy5lcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaChlcnJvcil7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsYXNzIGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdGhhdCBvcGVuIGFuIEluZGV4ZWREQiBpbnN0YW5jZVxyXG4gICAgICogQHBhcmFtIGRhdGFiYXNlTmFtZSBcclxuICAgICAqIEBwYXJhbSBkYXRhYmFzZVZlcnNpb24gXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0U3RvcmVTcGVjIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgb3BlbklEQihkYXRhYmFzZU5hbWU6IHN0cmluZywgZGF0YWJhc2VWZXJzaW9uOiBudW1iZXIsIG9iamVjdFN0b3JlU3BlYzogSU9iamVjdFN0b3JlU3BlY1tdKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0IHRvIG9wZW4gdGhlIElEQi4uLlwiLCBcIkluZGV4ZWREQlN0b3JhZ2Uub3BlbklEQlwiKVxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5vcGVuSW5kZXhlZERCKGRhdGFiYXNlTmFtZSwgZGF0YWJhc2VWZXJzaW9uLCBvYmplY3RTdG9yZVNwZWMpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YWJhc2Ugb3BlbiBmaW5pc2hlZC5cIiwgXCJJbmRleGVkREJTdG9yYWdlLm9wZW5JREJcIilcclxuICAgICAgICB9IGNhdGNoKGVycm9yKXtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3JcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdGhhdCBhZGQgYW4gZWxlbWVudCBpbiBhIHNwZWNpZmljIG9iamVjdFN0b3JlIFxyXG4gICAgICogaW4gdGhlIGRhdGFiYXNlIGhhbmRsZWQgYnkgb25lIGluc3RhbmNlIG9mIHRoaXMgY2xhc3NcclxuICAgICAqIEBwYXJhbSBvYmplY3RTdG9yZU5hbWUgXHJcbiAgICAgKiBAcGFyYW0gaXRlbSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGFkZChvYmplY3RTdG9yZU5hbWU6IHN0cmluZywgaXRlbTogYW55LCBrZXlWYWx1ZT86IElEQktleVJhbmdlIHwgSURCVmFsaWRLZXkpe1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbnNlcnRpbmcuLi5cIilcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5hZGRJdGVtVG9PYmplY3RTdG9yZShvYmplY3RTdG9yZU5hbWUsIGl0ZW0sIGtleVZhbHVlKVxyXG4gICAgICAgIH0gY2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvciwgXCJJbmRleGVkREJTdG9yYWdlLmFkZFwiKVxyXG4gICAgICAgICAgICB0aHJvdyBlcnJvclxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJuIGFuIGl0ZW0gY29udGFpbmVkIGluIGEgc3BlY2lmaWMgb2JqZWN0U3RvcmVcclxuICAgICAqIGluIHRoZSBkYXRhYmFzZSBoYW5kbGVkIGJ5IG9uZSBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0U3RvcmVOYW1lIFxyXG4gICAgICogQHBhcmFtIGtleVZhbHVlIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0KG9iamVjdFN0b3JlTmFtZTogc3RyaW5nLCBrZXlWYWx1ZTogSURCS2V5UmFuZ2UgfCBJREJWYWxpZEtleSkgOiBQcm9taXNlPE9iamVjdD4ge1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGF3YWl0IHRoaXMuZ2V0SXRlbUZyb21PYmplY3RTdG9yZShvYmplY3RTdG9yZU5hbWUsIGtleVZhbHVlKVxyXG4gICAgICAgICAgICByZXR1cm4gaXRlbVxyXG4gICAgICAgIH0gY2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvclxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRoYXQgdXBkYXRlIGFuIGl0ZW0gY29udGFpbmVkIGluIGEgc3BlY2lmaWMgb2JqZWN0U3RvcmVcclxuICAgICAqIGluIHRoZSBkYXRhYmFzZSBoYW5kbGVkIGJ5IG9uZSBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0U3RvcmVOYW1lIFxyXG4gICAgICogQHBhcmFtIGl0ZW0gXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBwdXQob2JqZWN0U3RvcmVOYW1lOiBzdHJpbmcsIGl0ZW06IGFueSwga2V5VmFsdWU/OiBJREJLZXlSYW5nZSB8IElEQlZhbGlkS2V5KXtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucHV0SXRlbVRvT2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lLCBpdGVtLCBrZXlWYWx1ZSlcclxuICAgICAgICB9IGNhdGNoKGVycm9yKXtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3JcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0U3RvcmVOYW1lIFxyXG4gICAgICogQHBhcmFtIGtleVZhbHVlIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZGVsZXRlKG9iamVjdFN0b3JlTmFtZTogc3RyaW5nLCBrZXlWYWx1ZTogSURCS2V5UmFuZ2UgfCBJREJWYWxpZEtleSl7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRlbGV0ZUl0ZW1Gcm9tT2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lLCBrZXlWYWx1ZSlcclxuICAgICAgICB9IGNhdGNoKGVycm9yKXtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3JcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBvYmplY3RTdG9yZU5hbWUgXHJcbiAgICAgKiBAcGFyYW0gY3Vyc29yUmFuZ2UgXHJcbiAgICAgKiBAcGFyYW0gY3Vyc29yRGlyZWN0aW9uIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgb3BlbkN1cnNvcihvYmplY3RTdG9yZU5hbWU6IHN0cmluZywgY3Vyc29yUmFuZ2U/OiBJREJLZXlSYW5nZSB8IElEQlZhbGlkS2V5LCBjdXJzb3JEaXJlY3Rpb24/OiBJREJDdXJzb3JEaXJlY3Rpb24pOiBQcm9taXNlPElEQkN1cnNvcj4ge1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgY29uc3QgY3Vyc29yID0gYXdhaXQgdGhpcy5vcGVuQ3Vyc29ySW5PYmplY3RTdG9yZShvYmplY3RTdG9yZU5hbWUsIGN1cnNvclJhbmdlLCBjdXJzb3JEaXJlY3Rpb24pXHJcbiAgICAgICAgICAgIHJldHVybiBjdXJzb3JcclxuICAgICAgICB9IGNhdGNoKGVycm9yKXtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3JcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBvYmplY3RTdG9yZU5hbWUgXHJcbiAgICAgKiBAcGFyYW0ga2V5TmFtZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluZGV4KG9iamVjdFN0b3JlTmFtZTogc3RyaW5nLCBrZXlOYW1lOiBzdHJpbmcpOiBJREJJbmRleCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXhJbk9iamVjdFN0b3JlKG9iamVjdFN0b3JlTmFtZSwga2V5TmFtZSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBvYmplY3RTdG9yZU5hbWUgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBjbGVhcihvYmplY3RTdG9yZU5hbWU6IHN0cmluZyk6IFByb21pc2U8SURCUmVxdWVzdD4ge1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IHRoaXMuY2xlYXJPYmplY3RTdG9yZShvYmplY3RTdG9yZU5hbWUpXHJcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0XHJcbiAgICAgICAgfSBjYXRjaChlcnJvcil7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0U3RvcmVOYW1lIFxyXG4gICAgICogQHBhcmFtIGtleSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGNvdW50KG9iamVjdFN0b3JlTmFtZTogc3RyaW5nLCBrZXk/OiBzdHJpbmcgfCBudW1iZXIgfCBJREJLZXlSYW5nZSB8IERhdGUgfCBJREJBcnJheUtleSk6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBjb25zdCBjb3VudCA9IGF3YWl0IHRoaXMuY291bnRFbGVtZW50c0luT2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lLCBrZXkpXHJcbiAgICAgICAgfWNhdGNoKGVycm9yKXtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3JcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0U3RvcmVOYW1lIFxyXG4gICAgICogQHBhcmFtIGtleU5hbWUgXHJcbiAgICAgKiBAcGFyYW0ga2V5VmFsdWUgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBnZXRJdGVtQnlJbmRleChvYmplY3RTdG9yZU5hbWU6IHN0cmluZywga2V5TmFtZTogc3RyaW5nLCBrZXlWYWx1ZTogSURCS2V5UmFuZ2UgfCBJREJWYWxpZEtleSk6IFByb21pc2U8T2JqZWN0PiB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmluZGV4KG9iamVjdFN0b3JlTmFtZSwga2V5TmFtZSlcclxuICAgICAgICByZXR1cm4gYXdhaXQgaW5kZXguZ2V0KGtleVZhbHVlKVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleGVkREIvSW5kZXhlZERCU3RvcmFnZS50cyJdLCJzb3VyY2VSb290IjoiIn0=