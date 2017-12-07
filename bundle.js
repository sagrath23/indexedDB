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
/******/ 	var hotCurrentHash = "35e021174433b315a27c"; // eslint-disable-line no-unused-vars
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
    function IndexedDBStorage(idbFactory) {
        if (idbFactory) {
            this.idbFactory = idbFactory;
        }
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
            var request;
            if (me.idbFactory) {
                request = me.idbFactory.open(me.databaseName, me.databaseVersion);
            }
            else {
                request = window.indexedDB.open(me.databaseName, me.databaseVersion);
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzVlMDIxMTc0NDMzYjMxNWEyN2MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXhlZERCL0luZGV4ZWREQlN0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQTJEO0FBQzNEO0FBQ0E7QUFDQSxXQUFHOztBQUVILG9EQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOzs7O0FBSUE7QUFDQSxzREFBOEM7QUFDOUM7QUFDQSxvQ0FBNEI7QUFDNUIscUNBQTZCO0FBQzdCLHlDQUFpQzs7QUFFakMsK0NBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhDQUFzQztBQUN0QztBQUNBO0FBQ0EscUNBQTZCO0FBQzdCLHFDQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLGdCQUFnQjtBQUNwQztBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBb0IsZ0JBQWdCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBaUIsOEJBQThCO0FBQy9DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQSw0REFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQSxhQUFLO0FBQ0wsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUFrQixjQUFjO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Ozt3QkFFZCxNQUFNLE9BQUs7Ozs7O0tBRWxCO0lBRUQ7Ozs7T0FJRztJQUNVLGdDQUFLLEdBQWxCLFVBQW1CLGVBQXVCLEVBQUUsR0FBd0Q7Ozs7Ozs7d0JBRTlFLHFCQUFNLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDOztnQ0FBM0QsU0FBMkQ7Ozs7d0JBRXpFLE1BQU0sT0FBSzs0QkFFZixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7Ozs7S0FDOUM7SUFFRDs7Ozs7T0FLRztJQUNVLHlDQUFjLEdBQTNCLFVBQTRCLGVBQXVCLEVBQUUsT0FBZSxFQUFFLFFBQW1DOztnQkFDL0YsS0FBSzs7OztnQ0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUM7d0JBQzNDLHFCQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDOzRCQUFoQyxzQkFBTyxTQUF5Qjs7OztLQUNuQztJQUNMLHVCQUFDO0FBQUQsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gdGhpc1tcIndlYnBhY2tIb3RVcGRhdGVJbmRleGVkREJTdG9yYWdlXCJdO1xuIFx0dGhpc1tcIndlYnBhY2tIb3RVcGRhdGVJbmRleGVkREJTdG9yYWdlXCJdID0gXHJcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xyXG4gXHRcdGlmKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XHJcbiBcdH0gO1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuIFx0XHRzY3JpcHQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XHJcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XHJcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcclxuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiBcdFx0XHRpZih0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpXHJcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcclxuIFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xyXG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xyXG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSAxMDAwMDtcclxuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xyXG4gXHRcdFx0fSBjYXRjaChlcnIpIHtcclxuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuIFx0XHRcdFx0aWYocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XHJcbiBcdFx0XHRcdGlmKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XHJcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxyXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpKTtcclxuIFx0XHRcdFx0fSBlbHNlIGlmKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcclxuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXHJcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xyXG4gXHRcdFx0XHR9IGVsc2UgaWYocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XHJcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxyXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcclxuIFx0XHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXHJcbiBcdFx0XHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcclxuIFx0XHRcdFx0XHR9IGNhdGNoKGUpIHtcclxuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcclxuIFx0XHRcdFx0XHRcdHJldHVybjtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9O1xyXG4gXHRcdH0pO1xyXG4gXHR9XHJcblxuIFx0XHJcbiBcdFxyXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XHJcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiMzVlMDIxMTc0NDMzYjMxNWEyN2NcIjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcclxuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdGlmKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XHJcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xyXG4gXHRcdFx0aWYobWUuaG90LmFjdGl2ZSkge1xyXG4gXHRcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XHJcbiBcdFx0XHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpIDwgMClcclxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XHJcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRpZihtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpIDwgMClcclxuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xyXG4gXHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0Y29uc29sZS53YXJuKFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVxdWVzdCArIFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArIG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xyXG4gXHRcdH07XHJcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcclxuIFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcclxuIFx0XHRcdFx0fSxcclxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fTtcclxuIFx0XHR9O1xyXG4gXHRcdGZvcih2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiYgbmFtZSAhPT0gXCJlXCIpIHtcclxuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcclxuIFx0XHRcdGlmKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKVxyXG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xyXG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xyXG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XHJcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xyXG4gXHRcdFx0XHR0aHJvdyBlcnI7XHJcbiBcdFx0XHR9KTtcclxuIFx0XHJcbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XHJcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcclxuIFx0XHRcdFx0aWYoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xyXG4gXHRcdFx0XHRcdGlmKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcclxuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRpZihob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xyXG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH07XHJcbiBcdFx0cmV0dXJuIGZuO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHZhciBob3QgPSB7XHJcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXHJcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxyXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcclxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxyXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXHJcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcclxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxyXG4gXHRcclxuIFx0XHRcdC8vIE1vZHVsZSBBUElcclxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcclxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xyXG4gXHRcdFx0XHRpZih0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKVxyXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcclxuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XHJcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcclxuIFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxyXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcclxuIFx0XHRcdFx0ZWxzZVxyXG4gXHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XHJcbiBcdFx0XHRcdGlmKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xyXG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXHJcbiBcdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcclxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XHJcbiBcdFx0XHRcdGVsc2VcclxuIFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xyXG4gXHRcdFx0XHRpZihpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcclxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXHJcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXHJcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXHJcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcclxuIFx0XHRcdFx0aWYoIWwpIHJldHVybiBob3RTdGF0dXM7XHJcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xyXG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcclxuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XHJcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdH0sXHJcbiBcdFxyXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXHJcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cclxuIFx0XHR9O1xyXG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcclxuIFx0XHRyZXR1cm4gaG90O1xyXG4gXHR9XHJcbiBcdFxyXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcclxuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xyXG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcclxuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXHJcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXHJcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xyXG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XHJcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcclxuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XHJcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xyXG4gXHR2YXIgaG90RGVmZXJyZWQ7XHJcbiBcdFxyXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cclxuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcclxuIFx0XHJcbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcclxuIFx0XHR2YXIgaXNOdW1iZXIgPSAoK2lkKSArIFwiXCIgPT09IGlkO1xyXG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xyXG4gXHRcdGlmKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xyXG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcclxuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdCgpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XHJcbiBcdFx0XHRpZighdXBkYXRlKSB7XHJcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XHJcbiBcdFx0XHRcdHJldHVybiBudWxsO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcclxuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xyXG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcclxuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcclxuIFx0XHJcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xyXG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XHJcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcclxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxyXG4gXHRcdFx0XHR9O1xyXG4gXHRcdFx0fSk7XHJcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcclxuIFx0XHRcdHZhciBjaHVua0lkID0gMDtcclxuIFx0XHRcdHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1sb25lLWJsb2Nrc1xyXG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xyXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdGlmKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcclxuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XHJcbiBcdFx0fSk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHRpZighaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxyXG4gXHRcdFx0cmV0dXJuO1xyXG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XHJcbiBcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFx0aWYoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xyXG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xyXG4gXHRcdH1cclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xyXG4gXHRcdGlmKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xyXG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcclxuIFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xyXG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XHJcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdH1cclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcclxuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcclxuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XHJcbiBcdFx0aWYoIWRlZmVycmVkKSByZXR1cm47XHJcbiBcdFx0aWYoaG90QXBwbHlPblVwZGF0ZSkge1xyXG4gXHRcdFx0aG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuIFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xyXG4gXHRcdFx0fSwgZnVuY3Rpb24oZXJyKSB7XHJcbiBcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xyXG4gXHRcdFx0fSk7XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHRcdGZvcih2YXIgaWQgaW4gaG90VXBkYXRlKSB7XHJcbiBcdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xyXG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xyXG4gXHRcdH1cclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xyXG4gXHRcdGlmKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XHJcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiBcdFxyXG4gXHRcdHZhciBjYjtcclxuIFx0XHR2YXIgaTtcclxuIFx0XHR2YXIgajtcclxuIFx0XHR2YXIgbW9kdWxlO1xyXG4gXHRcdHZhciBtb2R1bGVJZDtcclxuIFx0XHJcbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xyXG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcclxuIFx0XHJcbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcclxuIFx0XHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcclxuIFx0XHRcdFx0XHRpZDogaWRcclxuIFx0XHRcdFx0fTtcclxuIFx0XHRcdH0pO1xyXG4gXHRcdFx0d2hpbGUocXVldWUubGVuZ3RoID4gMCkge1xyXG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XHJcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcclxuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xyXG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0aWYoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0Y29udGludWU7XHJcbiBcdFx0XHRcdGlmKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xyXG4gXHRcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcclxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcclxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxyXG4gXHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYobW9kdWxlLmhvdC5fbWFpbikge1xyXG4gXHRcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcclxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcclxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxyXG4gXHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XHJcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xyXG4gXHRcdFx0XHRcdGlmKCFwYXJlbnQpIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGlmKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xyXG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxyXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxyXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXHJcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxyXG4gXHRcdFx0XHRcdFx0fTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0aWYob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpID49IDApIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGlmKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xyXG4gXHRcdFx0XHRcdFx0aWYoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcclxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XHJcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xyXG4gXHRcdFx0XHRcdFx0Y29udGludWU7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XHJcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xyXG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xyXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcclxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxyXG4gXHRcdFx0XHRcdH0pO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFxyXG4gXHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxyXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXHJcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxyXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcclxuIFx0XHRcdH07XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XHJcbiBcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XHJcbiBcdFx0XHRcdGlmKGEuaW5kZXhPZihpdGVtKSA8IDApXHJcbiBcdFx0XHRcdFx0YS5wdXNoKGl0ZW0pO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcclxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXHJcbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XHJcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xyXG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XHJcbiBcdFxyXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XHJcbiBcdFx0XHRjb25zb2xlLndhcm4oXCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCIpO1xyXG4gXHRcdH07XHJcbiBcdFxyXG4gXHRcdGZvcih2YXIgaWQgaW4gaG90VXBkYXRlKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcclxuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcclxuIFx0XHRcdFx0dmFyIHJlc3VsdDtcclxuIFx0XHRcdFx0aWYoaG90VXBkYXRlW2lkXSkge1xyXG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xyXG4gXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcclxuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcclxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxyXG4gXHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcclxuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcclxuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xyXG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcclxuIFx0XHRcdFx0aWYocmVzdWx0LmNoYWluKSB7XHJcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdHN3aXRjaChyZXN1bHQudHlwZSkge1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRGVjbGluZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xyXG4gXHRcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXHJcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArIHJlc3VsdC5tb2R1bGVJZCArIGNoYWluSW5mbyk7XHJcbiBcdFx0XHRcdFx0XHRicmVhaztcclxuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcclxuIFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25EZWNsaW5lZClcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XHJcbiBcdFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcclxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiIGluIFwiICsgcmVzdWx0LnBhcmVudElkICsgY2hhaW5JbmZvKTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uVW5hY2NlcHRlZClcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvKTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkFjY2VwdGVkKVxyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xyXG4gXHRcdFx0XHRcdFx0YnJlYWs7XHJcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRGlzcG9zZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xyXG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGRlZmF1bHQ6XHJcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKGFib3J0RXJyb3IpIHtcclxuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcclxuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYoZG9BcHBseSkge1xyXG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xyXG4gXHRcdFx0XHRcdGZvcihtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcclxuIFx0XHRcdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRcdFx0XHRpZighb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxyXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xyXG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pO1xyXG4gXHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRpZihkb0Rpc3Bvc2UpIHtcclxuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcclxuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxyXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHRmb3IoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xyXG4gXHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiYgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQpXHJcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcclxuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcclxuIFx0XHRcdFx0fSk7XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xyXG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcclxuIFx0XHRcdGlmKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xyXG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fSk7XHJcbiBcdFxyXG4gXHRcdHZhciBpZHg7XHJcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XHJcbiBcdFx0d2hpbGUocXVldWUubGVuZ3RoID4gMCkge1xyXG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcclxuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0aWYoIW1vZHVsZSkgY29udGludWU7XHJcbiBcdFxyXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcclxuIFx0XHJcbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcclxuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XHJcbiBcdFx0XHRmb3IoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcclxuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XHJcbiBcdFx0XHRcdGNiKGRhdGEpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcclxuIFx0XHJcbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxyXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcclxuIFx0XHJcbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcclxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHJcbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxyXG4gXHRcdFx0Zm9yKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcclxuIFx0XHRcdFx0aWYoIWNoaWxkKSBjb250aW51ZTtcclxuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0aWYoaWR4ID49IDApIHtcclxuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxyXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xyXG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcclxuIFx0XHRmb3IobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRpZihtb2R1bGUpIHtcclxuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0XHRmb3IoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xyXG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xyXG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XHJcbiBcdFx0XHRcdFx0XHRpZihpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxyXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xyXG4gXHRcclxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XHJcbiBcdFxyXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxyXG4gXHRcdGZvcihtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xyXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XHJcbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcclxuIFx0XHRcdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XHJcbiBcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcclxuIFx0XHRcdFx0XHRpZihjYWxsYmFja3MuaW5kZXhPZihjYikgPj0gMCkgY29udGludWU7XHJcbiBcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGZvcihpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xyXG4gXHRcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XHJcbiBcdFx0XHRcdFx0fSBjYXRjaChlcnIpIHtcclxuIFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25FcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcclxuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXHJcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXHJcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxyXG4gXHRcdFx0XHRcdFx0XHR9KTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcclxuIFx0XHRcdFx0XHRcdFx0aWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcclxuIFx0XHRmb3IoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xyXG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcclxuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcclxuIFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xyXG4gXHRcdFx0fSBjYXRjaChlcnIpIHtcclxuIFx0XHRcdFx0aWYodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuIFx0XHRcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcclxuIFx0XHRcdFx0XHR9IGNhdGNoKGVycjIpIHtcclxuIFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25FcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcclxuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxyXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcclxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcclxuIFx0XHRcdFx0XHRcdFx0XHRvcmdpbmFsRXJyb3I6IGVyclxyXG4gXHRcdFx0XHRcdFx0XHR9KTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcclxuIFx0XHRcdFx0XHRcdFx0aWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyMjtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdGlmKG9wdGlvbnMub25FcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XHJcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxyXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcclxuIFx0XHRcdFx0XHRcdH0pO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcclxuIFx0XHRpZihlcnJvcikge1xyXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcclxuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xyXG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XHJcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XHJcbiBcdFx0fSk7XHJcbiBcdH1cclxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoMCkoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMzVlMDIxMTc0NDMzYjMxNWEyN2MiLCJ2YXIgaW5kZXggPSByZXF1aXJlKFwiLi9pbmRleC50c1wiKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBpbmRleC5JbmRleGVkREJTdG9yYWdlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge0luZGV4ZWREQlN0b3JhZ2V9IGZyb20gJy4vaW5kZXhlZERCL0luZGV4ZWREQlN0b3JhZ2UnXHJcblxyXG5leHBvcnQge0luZGV4ZWREQlN0b3JhZ2V9XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LnRzIiwiaW1wb3J0IHsgSUFzeW5jU3RvcmFnZSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL0lBc3luY1N0b3JhZ2VcIlxyXG5pbXBvcnQge0lJbmRleERCU3BlYyxJT2JqZWN0U3RvcmVTcGVjfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9JT2JqZWN0U3RvcmVTcGVjXCJcclxuXHJcbi8vdHJhbnNhY3Rpb24gbW9kZXNcclxuY29uc3QgUkVBRF9PTkxZID0gJ3JlYWRvbmx5J1xyXG5jb25zdCBSRUFEX1dSSVRFID0gJ3JlYWR3cml0ZSdcclxuY29uc3QgVkVSU0lPTl9DSEFOR0UgPSAndmVyc2lvbmNoYW5nZSdcclxuLy90cmFuc2FjdGlvbiB0eXBlc1xyXG5jb25zdCBBREQgPSAnYWRkJ1xyXG5jb25zdCBHRVQgPSAnZ2V0J1xyXG5jb25zdCBERUxFVEUgPSAnZGVsZXRlJ1xyXG5leHBvcnQgY2xhc3MgSW5kZXhlZERCU3RvcmFnZSBpbXBsZW1lbnRzIElBc3luY1N0b3JhZ2Uge1xyXG4gICAgXHJcbiAgICBwcml2YXRlIGlkYkZhY3Rvcnk6IElEQkZhY3RvcnlcclxuICAgIHByaXZhdGUgZGF0YWJhc2VDcmVhdGVkOiBib29sZWFuXHJcbiAgICBwcml2YXRlIGRhdGFiYXNlTmFtZTogc3RyaW5nXHJcbiAgICBwcml2YXRlIGRhdGFiYXNlVmVyc2lvbjogbnVtYmVyXHJcbiAgICBwcml2YXRlIGRhdGFiYXNlOiBJREJEYXRhYmFzZVxyXG4gICAgcHJpdmF0ZSBvYmplY3RTdG9yZVNwZWM6IElPYmplY3RTdG9yZVNwZWNbXVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdGhhdCByZXR1cm4gYSBwcm9taXNlIG9mIGEgSURCRGF0YWJhc2UgaW5zdGFuY2VcclxuICAgICAqIEBwYXJhbSBkYXRhYmFzZU5hbWUgXHJcbiAgICAgKiBAcGFyYW0gZGF0YWJhc2VWZXJzaW9uIFxyXG4gICAgICogQHBhcmFtIG9iamVjdFN0b3JlU3BlYyBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvcGVuSW5kZXhlZERCKGRhdGFiYXNlTmFtZTogc3RyaW5nLCBkYXRhYmFzZVZlcnNpb246IG51bWJlciwgb2JqZWN0U3RvcmVTcGVjOiBJT2JqZWN0U3RvcmVTcGVjW10pOiBQcm9taXNlPElEQkRhdGFiYXNlPntcclxuXHJcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzXHJcbiAgICAgICAgXHJcbiAgICAgICAgbWUuZGF0YWJhc2VDcmVhdGVkID0gZmFsc2VcclxuICAgICAgICBtZS5kYXRhYmFzZU5hbWUgPSBkYXRhYmFzZU5hbWVcclxuICAgICAgICBtZS5kYXRhYmFzZVZlcnNpb24gPSBkYXRhYmFzZVZlcnNpb25cclxuICAgICAgICBtZS5vYmplY3RTdG9yZVNwZWMgPSBvYmplY3RTdG9yZVNwZWNcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGluZyBwcm9taXNlLi4uXCIsIFwiSW5kZXhlZERCU3RvcmFnZS5vcGVuSW5kZXhlZERCXCIpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvcGVuaW5nIElEQiBEYXRhYmFzZS4uLlwiLCBcIkluZGV4ZWREQlN0b3JhZ2Uub3BlbkluZGV4ZWREQlwiKVxyXG4gICAgICAgICAgICAvL3N0YXJ0IHRvIG9wZW4gdGhlIGRhdGFiYXNlXHJcbiAgICAgICAgICAgIGxldCByZXF1ZXN0XHJcbiAgICAgICAgICAgIGlmKG1lLmlkYkZhY3Rvcnkpe1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdCA9IG1lLmlkYkZhY3Rvcnkub3BlbihtZS5kYXRhYmFzZU5hbWUsIG1lLmRhdGFiYXNlVmVyc2lvbilcclxuICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdCA9IHdpbmRvdy5pbmRleGVkREIub3BlbihtZS5kYXRhYmFzZU5hbWUsIG1lLmRhdGFiYXNlVmVyc2lvbilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gdGhpcyBjYWxsYmFjayBpcyBleGVjdXRlZCwgd2hlbiBhIG5ldyBEYXRhYmFzZSBpcyBjcmVhdGVkXHJcbiAgICAgICAgICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIG1lLmRhdGFiYXNlQ3JlYXRlZCA9IHRydWVcclxuICAgICAgICAgICAgICAgIG1lLmRhdGFiYXNlID0gdGhpcy5yZXN1bHRcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIkRhdGFiYXNlIHN1Y2Nlc3NmdWxseSBjcmVhdGVkXCIsIFwiY2FsbGJhY2sgb251cGdyYWRlbmVlZGVkIEluZGV4ZWREQlN0b3JhZ2Uub3BlbkluZGV4ZWREQlwiKVxyXG4gICAgICAgICAgICAgICAgLy9ub3csIGNyZWF0ZSBhIG9iamVjdFN0b3JlIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgZm9yKGNvbnN0IGkgaW4gbWUub2JqZWN0U3RvcmVTcGVjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hbmQgYWRkIHRoZSBuZXcgb2JqZWN0U3RvcmUgdG8gb3VyIG9iamVjdFN0b3JlcyBvYmplY3RcclxuICAgICAgICAgICAgICAgICAgICAvL21lLmNyZWF0ZU9iamVjdFN0b3JlKG1lLmRhdGFiYXNlLCBtZS5vYmplY3RTdG9yZVNwZWNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBjcmVhdGluZyBvYmplY3RTdG9yZSAke29iamVjdFN0b3JlU3BlY1tpXS5vYmplY3RTdG9yZU5hbWV9YCkgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY3JlYXRlIG9iamVjdFN0b3JlXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2JqZWN0U3RvcmUgPSBtZS5kYXRhYmFzZS5jcmVhdGVPYmplY3RTdG9yZShvYmplY3RTdG9yZVNwZWNbaV0ub2JqZWN0U3RvcmVOYW1lLG9iamVjdFN0b3JlU3BlY1tpXS5vYmplY3RTdG9yZVNldHRpbmdzKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vYW5kIGNyZWF0ZSBpbmRleCBpZiBhcmUgZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKG9iamVjdFN0b3JlU3BlY1tpXS5vYmplY3RTdG9yZUluZGV4ZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGogaW4gb2JqZWN0U3RvcmVTcGVjW2ldLm9iamVjdFN0b3JlSW5kZXhlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jcmVhdGUgaW5kZXhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBjcmVhdGluZyBpbmRleCAke29iamVjdFN0b3JlU3BlY1tpXS5vYmplY3RTdG9yZUluZGV4ZXNbal0uaW5kZXhOYW1lfSBmb3Igb2JqZWN0U3RvcmUgJHtvYmplY3RTdG9yZVNwZWNbaV0ub2JqZWN0U3RvcmVOYW1lfWApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RTdG9yZS5jcmVhdGVJbmRleChvYmplY3RTdG9yZVNwZWNbaV0ub2JqZWN0U3RvcmVJbmRleGVzW2pdLmluZGV4TmFtZSwgb2JqZWN0U3RvcmVTcGVjW2ldLm9iamVjdFN0b3JlSW5kZXhlc1tqXS5rZXlQYXRoLCBvYmplY3RTdG9yZVNwZWNbaV0ub2JqZWN0U3RvcmVJbmRleGVzW2pdLm9wdGlvbmFsUGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgLy8gdGhpcyBjYWxsYmFjayBpcyBleGVjdXRlZCB3aGVuIHRoZSBkYXRhYmFzZSBleGlzdHMgYW4gaXQncyBvcGVuZWRcclxuICAgICAgICAgICAgLy8gaWYgdGhlIGRhdGFiYXNlIGRvZXNuJ3QgZXhpc3QsIHRoZW4gZXhlY3V0ZSBvbnVwZ3JhZGVuZWVkZWQgY2FsbGJhY2sgZmlyc3QsIGFuZCB0aGlzIGxhdGVyXHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIkRhdGFiYXNlIGlzIE9wZW5cIiwgXCJjYWxsYmFjayBvbnN1Y2Nlc3MgSW5kZXhlZERCU3RvcmFnZS5vcGVuSW5kZXhlZERCXCIpXHJcbiAgICAgICAgICAgICAgICBpZighbWUuZGF0YWJhc2VDcmVhdGVkKXtcclxuICAgICAgICAgICAgICAgICAgICBtZS5kYXRhYmFzZSA9IHRoaXMucmVzdWx0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIHRoaXMgY2FsbGJhY2sgaXMgZXhlY3V0ZWQgd2hlbiB0aGUgZGF0YWJhc2UgaXMgb3BlblxyXG4gICAgICAgICAgICByZXF1ZXN0Lm9uYmxvY2tlZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJEYXRhYmFzZSBpcyBibG9ja2VkXCIpXHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXZlbnQpXHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAvLyBpZiBhbiBlcnJvciBoYXBwZW5lZCwgcmVqZWN0IHRoZSBwcm9taXNlXHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEYXRhYmFzZSBjb3VsZG4ndCBiZSBvcGVuZWRcIilcclxuICAgICAgICAgICAgICAgIHJlamVjdChldmVudClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGNyZWF0ZSBhIG5ldyBJREJPYmplY3RTdG9yZSBpbiB0aGUgc3BlY2lmaWVkIGRhdGFiYXNlXHJcbiAgICAgKiBAcGFyYW0gZGF0YWJhc2UgXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0U3RvcmVTcGVjIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZU9iamVjdFN0b3JlKGRhdGFiYXNlOiBJREJEYXRhYmFzZSwgb2JqZWN0U3RvcmVTcGVjOiBJT2JqZWN0U3RvcmVTcGVjKTogdm9pZHtcclxuICAgICAgICBjb25zb2xlLmxvZyhgY3JlYXRpbmcgb2JqZWN0U3RvcmUgJHtvYmplY3RTdG9yZVNwZWMub2JqZWN0U3RvcmVOYW1lfWApICAgICAgICBcclxuICAgICAgICAvL2NyZWF0ZSBvYmplY3RTdG9yZVxyXG4gICAgICAgIGNvbnN0IG9iamVjdFN0b3JlID0gZGF0YWJhc2UuY3JlYXRlT2JqZWN0U3RvcmUob2JqZWN0U3RvcmVTcGVjLm9iamVjdFN0b3JlTmFtZSxvYmplY3RTdG9yZVNwZWMub2JqZWN0U3RvcmVTZXR0aW5ncylcclxuICAgICAgICAvL2FuZCBjcmVhdGUgaW5kZXggaWYgYXJlIGRlZmluZWRcclxuICAgICAgICBpZihvYmplY3RTdG9yZVNwZWMub2JqZWN0U3RvcmVJbmRleGVzKXtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBpIGluIG9iamVjdFN0b3JlU3BlYy5vYmplY3RTdG9yZUluZGV4ZXMpIHtcclxuICAgICAgICAgICAgICAgIC8vY3JlYXRlIGluZGV4XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgY3JlYXRpbmcgaW5kZXggJHtvYmplY3RTdG9yZVNwZWMub2JqZWN0U3RvcmVJbmRleGVzW2ldLmluZGV4TmFtZX0gZm9yIG9iamVjdFN0b3JlICR7b2JqZWN0U3RvcmVTcGVjLm9iamVjdFN0b3JlTmFtZX1gKVxyXG4gICAgICAgICAgICAgICAgb2JqZWN0U3RvcmUuY3JlYXRlSW5kZXgob2JqZWN0U3RvcmVTcGVjLm9iamVjdFN0b3JlSW5kZXhlc1tpXS5pbmRleE5hbWUsIG9iamVjdFN0b3JlU3BlYy5vYmplY3RTdG9yZUluZGV4ZXNbaV0ua2V5UGF0aCwgb2JqZWN0U3RvcmVTcGVjLm9iamVjdFN0b3JlSW5kZXhlc1tpXS5vcHRpb25hbFBhcmFtcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRoYXQgb3BlbiBhbiBleGlzdGluZyBJREJPYmplY3RTdG9yZSBpIHRoZSBzcGVjaWZpZWQgZGF0YWJhc2VcclxuICAgICAqIEBwYXJhbSBvYmplY3RTdG9yZVNwZWMgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0T2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lOiBzdHJpbmcsIHRyYW5zYWN0aW9uTW9kZT86IElEQlRyYW5zYWN0aW9uTW9kZSk6IElEQk9iamVjdFN0b3Jle1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgLy9vcGVuIHRoZSBvYmplY3QgU3RvcmUgZnJvbSBJbmRleGVkREIgaW5zdGFuY2VcclxuICAgICAgICAgICAgLy9jcmVhdGUgYSB0cmFuc2FjdGlvbiBpbiB0aGUgZGF0YWJhc2VcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNhY3Rpb24gPSB0aGlzLmRhdGFiYXNlLnRyYW5zYWN0aW9uKG9iamVjdFN0b3JlTmFtZSwgdHJhbnNhY3Rpb25Nb2RlKVxyXG4gICAgICAgICAgICAvL2FuZCByZXR1cm4gdGhlIG9iamVjdFN0b3JlIHNwZWNpZmllZFxyXG4gICAgICAgICAgICByZXR1cm4gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lKVxyXG4gICAgICAgIH0gY2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yLCBcIkluZGV4ZWREQlN0b3JlLmdldE9iamVjdFN0b3JlXCIpXHJcbiAgICAgICAgICAgIHRocm93IGVycm9yXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdGhhdCBhZGRzIGFuIGl0ZW0gdG8gYW4gc3BlY2lmaWMgb2JqZWN0U3RvcmUgaW4gdGhlIG9wZW5lZCBkYXRhYmFzZSxcclxuICAgICAqIHJldHVybmluZyBhIFByb21pc2Ugb2YgYW4gSURCUmVxdWVzdCBvYmplY3QgdGhhdCBjb250YWluIHRoZSByZXN1bHQgb2YgdGhlIHRyYW5zYWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0U3RvcmVOYW1lIFxyXG4gICAgICogQHBhcmFtIGl0ZW0gXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkSXRlbVRvT2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lOiBzdHJpbmcsIGl0ZW06IGFueSwga2V5VmFsdWU6IElEQktleVJhbmdlIHwgSURCVmFsaWRLZXkpOiBQcm9taXNlPElEQlJlcXVlc3Q+IHtcclxuICAgICAgICBjb25zdCBtZSA9IHRoaXNcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIC8vZ2V0IE9iamVjdFN0b3JlIHRvIHN0b3JlIGRhdGFcclxuICAgICAgICAgICAgY29uc3Qgb2JqZWN0U3RvcmUgPSBtZS5nZXRPYmplY3RTdG9yZShvYmplY3RTdG9yZU5hbWUsIFJFQURfV1JJVEUpXHJcbiAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgIC8vYW5kIHRyeSB0byBhZGQgaXQgXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVxdWVzdFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0cnlpbmcgdG8gaW5zZXJ0IGRhdGFcIilcclxuICAgICAgICAgICAgICAgIGlmKGtleVZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0ID0gb2JqZWN0U3RvcmUuYWRkKGl0ZW0sIGtleVZhbHVlKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0ID0gb2JqZWN0U3RvcmUuYWRkKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdlbmVyYXRlIHJlcXVlc3RcIilcclxuICAgICAgICAgICAgICAgIC8vaGVuZGxpbmcgd2hlbiBpbnNlcnRpb24gaXMgc3VjY2Vzc1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkluc2VydGlvbiBpbiBEQiBzdWNjZXNzZnVsXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2FuZCB3aGVuIFxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkluc2VydGlvbiBmYWlsZWRcIiwgdGhpcy5lcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KClcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yLm5hbWUgPT0gJ0RhdGFDbG9uZUVycm9yJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlRoaXMgZW5naW5lIGRvZXNuJ3Qga25vdyBob3cgdG8gY2xvbmUgYSBCbG9iLCB1c2UgRmlyZWZveCBvciBDaHJvbWVcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLCBcIkluZGV4ZWREQlN0b3JhZ2UuYWRkSXRlbVRvT2JqZWN0U3RvcmVcIilcclxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0U3RvcmVOYW1lIFxyXG4gICAgICogQHBhcmFtIGtleVZhbHVlIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEl0ZW1Gcm9tT2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lOiBzdHJpbmcsIGtleVZhbHVlOiBJREJLZXlSYW5nZSB8IElEQlZhbGlkS2V5KTogUHJvbWlzZTxJREJSZXF1ZXN0PntcclxuICAgICAgICBjb25zdCBtZSA9IHRoaXNcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIC8vZ2V0IE9iamVjdFN0b3JlIHRvIHN0b3JlIGRhdGFcclxuICAgICAgICAgICAgY29uc3Qgb2JqZWN0U3RvcmUgPSBtZS5nZXRPYmplY3RTdG9yZShvYmplY3RTdG9yZU5hbWUsIFJFQURfT05MWSlcclxuICAgICAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAgICAgLy9hbmQgdHJ5IHRvIGRlbGV0ZSBpdCBcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBvYmplY3RTdG9yZS5nZXQoa2V5VmFsdWUpXHJcbiAgICAgICAgICAgICAgICAvL2hlbmRsaW5nIHdoZW4gaW5zZXJ0aW9uIGlzIHN1Y2Nlc3NcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYG9iamVjdCAke2tleVZhbHVlfSBmb3VuZGVkIGluICR7b2JqZWN0U3RvcmVOYW1lfSBvYmplY3RTdG9yZWApXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnJlc3VsdClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vYW5kIHdoZW4gXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgZXJyb3IgdHJ5aW5nIHRvIGdldCAke2tleVZhbHVlfSBpdGVtIGluICR7b2JqZWN0U3RvcmVOYW1lfSBvYmplY3RTdG9yZTogYCwgdGhpcy5lcnJvcilcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdGhhdCB1cGRhdGVzIGFuIGl0ZW0gaW4gYW4gc3BlY2lmaWMgb2JqZWN0U3RvcmUgZm9yIHRoZSBvcGVuZWQgZGF0YWJhc2UsXHJcbiAgICAgKiByZXR1cm5pbmcgYSBQcm9taXNlIG9mIGFuIElEQlJlcXVlc3Qgb2JqZWN0IHRoYXQgY29udGFpbiB0aGUgcmVzdWx0IG9mIHRoZSB0cmFuc2FjdGlvblxyXG4gICAgICogQHBhcmFtIG9iamVjdFN0b3JlTmFtZSBcclxuICAgICAqIEBwYXJhbSBpdGVtIFxyXG4gICAgICogQHBhcmFtIGtleVZhbHVlIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHB1dEl0ZW1Ub09iamVjdFN0b3JlKG9iamVjdFN0b3JlTmFtZTogc3RyaW5nLCBpdGVtOiBhbnksIGtleVZhbHVlOiBJREJLZXlSYW5nZSB8IElEQlZhbGlkS2V5KTogUHJvbWlzZTxJREJSZXF1ZXN0PiB7XHJcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAvL2dldCBPYmplY3RTdG9yZSB0byBzdG9yZSBkYXRhXHJcbiAgICAgICAgICAgIGNvbnN0IG9iamVjdFN0b3JlID0gbWUuZ2V0T2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lLCBSRUFEX1dSSVRFKVxyXG4gICAgICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgICAgICAvL2FuZCB0cnkgdG8gYWRkIGl0IFxyXG4gICAgICAgICAgICAgICAgbGV0IHJlcXVlc3RcclxuICAgICAgICAgICAgICAgIGlmKGtleVZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0ID0gb2JqZWN0U3RvcmUucHV0KGl0ZW0sIGtleVZhbHVlKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0ID0gb2JqZWN0U3RvcmUucHV0KGl0ZW0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2hlbmRsaW5nIHdoZW4gaW5zZXJ0aW9uIGlzIHN1Y2Nlc3NcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYG9iamVjdCAke2l0ZW19IHVwZGF0ZWQgaW4gJHtvYmplY3RTdG9yZU5hbWV9IG9iamVjdFN0b3JlYClcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vYW5kIHdoZW4gXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVXBkYXRlIGZhaWxlZFwiLCB0aGlzLmVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBjYXRjaChlcnJvcil7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRoYXQgZGVsZXRlIGEgcmVjb3JkIGluIGEgc3BlY2lmaWMgb2JqZWN0U3RvcmUgdXNpbmcgaGlzIGtleVxyXG4gICAgICogcmV0dXJuaW5nIGEgcHJvbWlzZSBvZiBhIElEQlJlcXVlc3Qgb2JqZWN0LCBjb250YWluaW5nIHRoZSByZXN1bHQgb2YgdGhlIHJlcXVlc3RcclxuICAgICAqIEBwYXJhbSBvYmplY3RTdG9yZU5hbWUgXHJcbiAgICAgKiBAcGFyYW0ga2V5VmFsdWUgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVsZXRlSXRlbUZyb21PYmplY3RTdG9yZShvYmplY3RTdG9yZU5hbWU6IHN0cmluZywga2V5VmFsdWU6IElEQktleVJhbmdlIHwgSURCVmFsaWRLZXkpOiBQcm9taXNlPElEQlJlcXVlc3Q+e1xyXG4gICAgICAgIGNvbnN0IG1lID0gdGhpc1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpID0+IHtcclxuICAgICAgICAgICAgLy9nZXQgT2JqZWN0U3RvcmUgdG8gc3RvcmUgZGF0YVxyXG4gICAgICAgICAgICBjb25zdCBvYmplY3RTdG9yZSA9IG1lLmdldE9iamVjdFN0b3JlKG9iamVjdFN0b3JlTmFtZSwgUkVBRF9XUklURSlcclxuICAgICAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAgICAgLy9hbmQgdHJ5IHRvIGRlbGV0ZSBpdCBcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBvYmplY3RTdG9yZS5kZWxldGUoa2V5VmFsdWUpXHJcbiAgICAgICAgICAgICAgICAvL2hlbmRsaW5nIHdoZW4gaW5zZXJ0aW9uIGlzIHN1Y2Nlc3NcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYE9iamVjdCAke2tleVZhbHVlfSBkZWxldGVkIGZyb20gJHtvYmplY3RTdG9yZU5hbWV9IG9iamVjdFN0b3JlYClcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vYW5kIHdoZW4gXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgZXJyb3IgdHJ5aW5nIHRvIGRlbGV0ZSAke2tleVZhbHVlfTogYCwgdGhpcy5lcnJvcilcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBjYXRjaChlcnJvcil7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIG9iamVjdFN0b3JlTmFtZSBcclxuICAgICAqIEBwYXJhbSBjdXJzb3JSYW5nZSBcclxuICAgICAqIEBwYXJhbSBjdXJzb3JEaXJlY3Rpb24gXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb3BlbkN1cnNvckluT2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lOiBzdHJpbmcsIGN1cnNvclJhbmdlPzogSURCS2V5UmFuZ2UgfCBJREJWYWxpZEtleSwgY3Vyc29yRGlyZWN0aW9uPzogSURCQ3Vyc29yRGlyZWN0aW9uKTogUHJvbWlzZTxJREJDdXJzb3I+e1xyXG4gICAgICAgIGNvbnN0IG1lID0gdGhpc1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcbiAgICAgICAgICAgIC8vZ2V0IE9iamVjdFN0b3JlIHRvIHN0b3JlIGRhdGFcclxuICAgICAgICAgICAgY29uc3Qgb2JqZWN0U3RvcmUgPSBtZS5nZXRPYmplY3RTdG9yZShvYmplY3RTdG9yZU5hbWUpXHJcbiAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgIC8vYW5kIHRyeSB0byBkZWxldGUgaXQgXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gb2JqZWN0U3RvcmUub3BlbkN1cnNvcihjdXJzb3JSYW5nZSwgY3Vyc29yRGlyZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLy9oZW5kbGluZyB3aGVuIGluc2VydGlvbiBpcyBzdWNjZXNzXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBjdXJzb3Igb3BlbmVkIGZvciAke29iamVjdFN0b3JlTmFtZX0gb2JqZWN0U3RvcmVgKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5yZXN1bHQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2FuZCB3aGVuIFxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYGVycm9yIHRyeWluZyB0byBvcGVuIGEgY3Vyc29yIG9uICR7b2JqZWN0U3RvcmVOYW1lfSBvYmplY3RTdG9yZTogYCwgdGhpcy5lcnJvcilcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBjYXRjaChlcnJvcil7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBvYmplY3RTdG9yZU5hbWUgXHJcbiAgICAgKiBAcGFyYW0ga2V5TmFtZSBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbmRleEluT2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lOiBzdHJpbmcsIGtleU5hbWU6IHN0cmluZyk6IElEQkluZGV4e1xyXG4gICAgICAgIGNvbnN0IG1lID0gdGhpc1xyXG4gICAgICAgIC8vZ2V0IE9iamVjdFN0b3JlIHRvIHN0b3JlIGRhdGFcclxuICAgICAgICBjb25zdCBvYmplY3RTdG9yZSA9IG1lLmdldE9iamVjdFN0b3JlKG9iamVjdFN0b3JlTmFtZSlcclxuICAgICAgICByZXR1cm4gb2JqZWN0U3RvcmUuaW5kZXgoa2V5TmFtZSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIG9iamVjdFN0b3JlTmFtZSBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbGVhck9iamVjdFN0b3JlKG9iamVjdFN0b3JlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxJREJSZXF1ZXN0PiB7XHJcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgICAgICAgICAgLy9nZXQgT2JqZWN0U3RvcmUgdG8gc3RvcmUgZGF0YVxyXG4gICAgICAgICAgICBjb25zdCBvYmplY3RTdG9yZSA9IG1lLmdldE9iamVjdFN0b3JlKG9iamVjdFN0b3JlTmFtZSlcclxuICAgICAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAgICAgLy9hbmQgdHJ5IHRvIGRlbGV0ZSBpdCBcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBvYmplY3RTdG9yZS5jbGVhcigpXHJcbiAgICAgICAgICAgICAgICAvL2hlbmRsaW5nIHdoZW4gaW5zZXJ0aW9uIGlzIHN1Y2Nlc3NcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYG9iamVjdFN0b3JlICR7b2JqZWN0U3RvcmVOYW1lfSBjbGVhcmVkLmApXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnJlc3VsdClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vYW5kIHdoZW4gXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgZXJyb3IgdHJ5aW5nIHRvIGNsZWFyICR7b2JqZWN0U3RvcmVOYW1lfSBvYmplY3RTdG9yZWAsIHRoaXMuZXJyb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaChlcnJvcil7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIG9iamVjdFN0b3JlTmFtZSBcclxuICAgICAqIEBwYXJhbSBrZXkgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY291bnRFbGVtZW50c0luT2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lLCBrZXk/KTogUHJvbWlzZTxudW1iZXI+e1xyXG4gICAgICAgIGNvbnN0IG1lID0gdGhpc1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcbiAgICAgICAgICAgIC8vZ2V0IE9iamVjdFN0b3JlIHRvIHN0b3JlIGRhdGFcclxuICAgICAgICAgICAgY29uc3Qgb2JqZWN0U3RvcmUgPSBtZS5nZXRPYmplY3RTdG9yZShvYmplY3RTdG9yZU5hbWUpXHJcbiAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBvYmplY3RTdG9yZS5jb3VudChrZXkpXHJcblxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgb2JqZWN0U3RvcmUgJHtvYmplY3RTdG9yZU5hbWV9IGhhcyAke2tleX0gZWxlbWVudHNgKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5yZXN1bHQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2FuZCB3aGVuIFxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgZXJyb3IgdHJ5aW5nIHRvIGNvdW50IGVsZW1lbnRzIGluICR7b2JqZWN0U3RvcmVOYW1lfSBvYmplY3RTdG9yZTogYCwgdGhpcy5lcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaChlcnJvcil7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsYXNzIGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGlkYkZhY3Rvcnk/OklEQkZhY3RvcnkpIHtcclxuICAgICAgICBpZihpZGJGYWN0b3J5KXtcclxuICAgICAgICAgICAgdGhpcy5pZGJGYWN0b3J5ID0gaWRiRmFjdG9yeVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRoYXQgb3BlbiBhbiBJbmRleGVkREIgaW5zdGFuY2VcclxuICAgICAqIEBwYXJhbSBkYXRhYmFzZU5hbWUgXHJcbiAgICAgKiBAcGFyYW0gZGF0YWJhc2VWZXJzaW9uIFxyXG4gICAgICogQHBhcmFtIG9iamVjdFN0b3JlU3BlYyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIG9wZW5JREIoZGF0YWJhc2VOYW1lOiBzdHJpbmcsIGRhdGFiYXNlVmVyc2lvbjogbnVtYmVyLCBvYmplY3RTdG9yZVNwZWM6IElPYmplY3RTdG9yZVNwZWNbXSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydCB0byBvcGVuIHRoZSBJREIuLi5cIiwgXCJJbmRleGVkREJTdG9yYWdlLm9wZW5JREJcIilcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMub3BlbkluZGV4ZWREQihkYXRhYmFzZU5hbWUsIGRhdGFiYXNlVmVyc2lvbiwgb2JqZWN0U3RvcmVTcGVjKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRhdGFiYXNlIG9wZW4gZmluaXNoZWQuXCIsIFwiSW5kZXhlZERCU3RvcmFnZS5vcGVuSURCXCIpXHJcbiAgICAgICAgfSBjYXRjaChlcnJvcil7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRoYXQgYWRkIGFuIGVsZW1lbnQgaW4gYSBzcGVjaWZpYyBvYmplY3RTdG9yZSBcclxuICAgICAqIGluIHRoZSBkYXRhYmFzZSBoYW5kbGVkIGJ5IG9uZSBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0U3RvcmVOYW1lIFxyXG4gICAgICogQHBhcmFtIGl0ZW0gXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBhZGQob2JqZWN0U3RvcmVOYW1lOiBzdHJpbmcsIGl0ZW06IGFueSwga2V5VmFsdWU/OiBJREJLZXlSYW5nZSB8IElEQlZhbGlkS2V5KXtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW5zZXJ0aW5nLi4uXCIpXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYWRkSXRlbVRvT2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lLCBpdGVtLCBrZXlWYWx1ZSlcclxuICAgICAgICB9IGNhdGNoKGVycm9yKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IsIFwiSW5kZXhlZERCU3RvcmFnZS5hZGRcIilcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3JcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHJldHVybiBhbiBpdGVtIGNvbnRhaW5lZCBpbiBhIHNwZWNpZmljIG9iamVjdFN0b3JlXHJcbiAgICAgKiBpbiB0aGUgZGF0YWJhc2UgaGFuZGxlZCBieSBvbmUgaW5zdGFuY2Ugb2YgdGhpcyBjbGFzc1xyXG4gICAgICogQHBhcmFtIG9iamVjdFN0b3JlTmFtZSBcclxuICAgICAqIEBwYXJhbSBrZXlWYWx1ZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGdldChvYmplY3RTdG9yZU5hbWU6IHN0cmluZywga2V5VmFsdWU6IElEQktleVJhbmdlIHwgSURCVmFsaWRLZXkpIDogUHJvbWlzZTxPYmplY3Q+IHtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBhd2FpdCB0aGlzLmdldEl0ZW1Gcm9tT2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lLCBrZXlWYWx1ZSlcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW1cclxuICAgICAgICB9IGNhdGNoKGVycm9yKXtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3JcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHVwZGF0ZSBhbiBpdGVtIGNvbnRhaW5lZCBpbiBhIHNwZWNpZmljIG9iamVjdFN0b3JlXHJcbiAgICAgKiBpbiB0aGUgZGF0YWJhc2UgaGFuZGxlZCBieSBvbmUgaW5zdGFuY2Ugb2YgdGhpcyBjbGFzc1xyXG4gICAgICogQHBhcmFtIG9iamVjdFN0b3JlTmFtZSBcclxuICAgICAqIEBwYXJhbSBpdGVtIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgcHV0KG9iamVjdFN0b3JlTmFtZTogc3RyaW5nLCBpdGVtOiBhbnksIGtleVZhbHVlPzogSURCS2V5UmFuZ2UgfCBJREJWYWxpZEtleSl7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnB1dEl0ZW1Ub09iamVjdFN0b3JlKG9iamVjdFN0b3JlTmFtZSwgaXRlbSwga2V5VmFsdWUpXHJcbiAgICAgICAgfSBjYXRjaChlcnJvcil7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIG9iamVjdFN0b3JlTmFtZSBcclxuICAgICAqIEBwYXJhbSBrZXlWYWx1ZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGRlbGV0ZShvYmplY3RTdG9yZU5hbWU6IHN0cmluZywga2V5VmFsdWU6IElEQktleVJhbmdlIHwgSURCVmFsaWRLZXkpe1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5kZWxldGVJdGVtRnJvbU9iamVjdFN0b3JlKG9iamVjdFN0b3JlTmFtZSwga2V5VmFsdWUpXHJcbiAgICAgICAgfSBjYXRjaChlcnJvcil7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0U3RvcmVOYW1lIFxyXG4gICAgICogQHBhcmFtIGN1cnNvclJhbmdlIFxyXG4gICAgICogQHBhcmFtIGN1cnNvckRpcmVjdGlvbiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIG9wZW5DdXJzb3Iob2JqZWN0U3RvcmVOYW1lOiBzdHJpbmcsIGN1cnNvclJhbmdlPzogSURCS2V5UmFuZ2UgfCBJREJWYWxpZEtleSwgY3Vyc29yRGlyZWN0aW9uPzogSURCQ3Vyc29yRGlyZWN0aW9uKTogUHJvbWlzZTxJREJDdXJzb3I+IHtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnNvciA9IGF3YWl0IHRoaXMub3BlbkN1cnNvckluT2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lLCBjdXJzb3JSYW5nZSwgY3Vyc29yRGlyZWN0aW9uKVxyXG4gICAgICAgICAgICByZXR1cm4gY3Vyc29yXHJcbiAgICAgICAgfSBjYXRjaChlcnJvcil7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0U3RvcmVOYW1lIFxyXG4gICAgICogQHBhcmFtIGtleU5hbWUgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbmRleChvYmplY3RTdG9yZU5hbWU6IHN0cmluZywga2V5TmFtZTogc3RyaW5nKTogSURCSW5kZXgge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluZGV4SW5PYmplY3RTdG9yZShvYmplY3RTdG9yZU5hbWUsIGtleU5hbWUpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0U3RvcmVOYW1lIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgY2xlYXIob2JqZWN0U3RvcmVOYW1lOiBzdHJpbmcpOiBQcm9taXNlPElEQlJlcXVlc3Q+IHtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCB0aGlzLmNsZWFyT2JqZWN0U3RvcmUob2JqZWN0U3RvcmVOYW1lKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdFxyXG4gICAgICAgIH0gY2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvclxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIG9iamVjdFN0b3JlTmFtZSBcclxuICAgICAqIEBwYXJhbSBrZXkgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBjb3VudChvYmplY3RTdG9yZU5hbWU6IHN0cmluZywga2V5Pzogc3RyaW5nIHwgbnVtYmVyIHwgSURCS2V5UmFuZ2UgfCBEYXRlIHwgSURCQXJyYXlLZXkpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgY29uc3QgY291bnQgPSBhd2FpdCB0aGlzLmNvdW50RWxlbWVudHNJbk9iamVjdFN0b3JlKG9iamVjdFN0b3JlTmFtZSwga2V5KVxyXG4gICAgICAgIH1jYXRjaChlcnJvcil7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCBub3QgaW1wbGVtZW50ZWQuXCIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIG9iamVjdFN0b3JlTmFtZSBcclxuICAgICAqIEBwYXJhbSBrZXlOYW1lIFxyXG4gICAgICogQHBhcmFtIGtleVZhbHVlIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0SXRlbUJ5SW5kZXgob2JqZWN0U3RvcmVOYW1lOiBzdHJpbmcsIGtleU5hbWU6IHN0cmluZywga2V5VmFsdWU6IElEQktleVJhbmdlIHwgSURCVmFsaWRLZXkpOiBQcm9taXNlPE9iamVjdD4ge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbmRleChvYmplY3RTdG9yZU5hbWUsIGtleU5hbWUpXHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGluZGV4LmdldChrZXlWYWx1ZSlcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXhlZERCL0luZGV4ZWREQlN0b3JhZ2UudHMiXSwic291cmNlUm9vdCI6IiJ9