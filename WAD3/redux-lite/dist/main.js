/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apply-middleware.js":
/*!*********************************!*\
  !*** ./src/apply-middleware.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ applyMiddleWare)\n/* harmony export */ });\nfunction applyMiddleWare(...middlewares){\n  \n  return (store, rootReducer) => (\n    action => {\n      const arr = [...middlewares];\n      \n      function invokeNextMiddleware(action){\n        let middleware = arr.shift();\n    \n        if (middleware){\n          return middleware(store)(invokeNextMiddleware)(action);\n        } else {\n          return rootReducer(store.getState(), action, store.subscriptions);\n        }\n      }\n\n      return invokeNextMiddleware(action);\n    }\n  )\n}\n\n//# sourceURL=webpack:///./src/apply-middleware.js?");

/***/ }),

/***/ "./src/combine-reducers.js":
/*!*********************************!*\
  !*** ./src/combine-reducers.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ combineReducers)\n/* harmony export */ });\n/* harmony import */ var _object_enhancer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object-enhancer */ \"./src/object-enhancer.js\");\n\n\nfunction combineReducers(reducerBundle){\n  return function reducer(state, action, subscriptions){\n    Object.freeze(state);\n\n    let newState = state.deepDup();\n\n    for (let [key, reducer] of Object.entries(reducerBundle)){\n      newState[key] = reducer(newState[key] || {}, action, subscriptions);\n    }\n\n    return newState;\n  }\n}\n\n\n\n//# sourceURL=webpack:///./src/combine-reducers.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _seed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./seed */ \"./src/seed.js\");\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/object-enhancer.js":
/*!********************************!*\
  !*** ./src/object-enhancer.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nObject.prototype.deepDup = function(){\n  let newObj = new this.constructor();\n  \n  for (let [key, val] of Object.entries(this)){\n    newObj[key] = (val instanceof Object) ? val.deepDup() : val;\n  }\n\n  return newObj;\n}\n\nObject.prototype.shallowEqual = function(obj){\n\n  if (\n    typeof this !== typeof obj ||\n    this.constructor !== obj.constructor ||\n    Object.getPrototypeOf(this) !== Object.getPrototypeOf(obj) ||\n    Object.keys(this).length !== Object.keys(obj).length\n  ) return false;\n\n  for (let [key, val] of Object.entries(this)){\n    let val2 = obj[key];\n\n    if (val instanceof Object){\n      if (!(val2 instanceof Object) || !val.shallowEqual(val2)){ return false; }\n    } else {\n      if (val2 instanceof Object || val !== val2){ return false; }\n    }\n  }\n\n  return true;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({});\n\n//# sourceURL=webpack:///./src/object-enhancer.js?");

/***/ }),

/***/ "./src/seed.js":
/*!*********************!*\
  !*** ./src/seed.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ \"./src/store.js\");\n/* harmony import */ var _combine_reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./combine-reducers */ \"./src/combine-reducers.js\");\n/* harmony import */ var _apply_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./apply-middleware */ \"./src/apply-middleware.js\");\n\n\n\n\n// action creator\nconst addFruitCreator = function(fruit){\n  return {type: 'add fruit', fruit};\n}\n\n// actions\nlet addBanana = { type: 'add fruit', fruit: 'banana'};\nlet addPineapple = addFruitCreator('pineapple'); // { type: 'add fruit', fruit: 'pineapple'};\n\n// reducer\nconst fruitReducer = function(state, action, subscriptions){\n  Object.freeze(state);\n  let newState = state.deepDup();\n\n  switch (action.type){\n    case 'add fruit': {\n      let fruitName = action.fruit;\n  \n      newState[fruitName] ||= 0;\n      newState[fruitName]++;\n\n      return newState;\n    }\n    case 'rot': return {};\n    default: return state;\n  }\n}\n\nconst middleware1 = store => next => action => {\n  console.log(\"Middleware 1!\");\n  return next(action);\n}\n\nconst middleware2 = store => next => action => {\n  console.log(\"Middleware 2!\");\n  return next(action);\n}\n\nconst reduxLogger = store => next => action => {\n  let res = next(action);\n  console.log(`%coriginal state:`, \"color: red\", store.state, action, res);\n  return res;\n}\n\nconst reducer = (0,_combine_reducers__WEBPACK_IMPORTED_MODULE_1__.default)({fruit: fruitReducer});\n\nlet store = new _store__WEBPACK_IMPORTED_MODULE_0__.default(reducer, (0,_apply_middleware__WEBPACK_IMPORTED_MODULE_2__.default)(reduxLogger));\nlet callback = function(state){console.log(state);}\n\nstore.dispatch(addBanana);\nstore.dispatch(addBanana);\nstore.dispatch(addBanana);\nstore.dispatch(addPineapple);\n\nlet revert = store.subscribe(callback);\nstore.dispatch(addFruitCreator('strawberry'));\nstore.dispatch({type: 'rot'});\nstore.dispatch({type: 'do nothing'})\nstore.dispatch(addBanana);\n\nrevert();\nstore.dispatch(addBanana);\n\n\n// 2reducers\n// both reducers take the same action type\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({});\n\n\n\n//# sourceURL=webpack:///./src/seed.js?");

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Store)\n/* harmony export */ });\n/* harmony import */ var _object_enhancer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object-enhancer */ \"./src/object-enhancer.js\");\n/* harmony import */ var _apply_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apply-middleware */ \"./src/apply-middleware.js\");\n\n\n\nclass Store{\n  constructor(rootReducer, combinedMiddleware = (0,_apply_middleware__WEBPACK_IMPORTED_MODULE_1__.default)()){\n    this.rootReducer = rootReducer;\n    this.state = {}\n    this.subscriptions = new Set();\n    this.appliedMiddleware = combinedMiddleware;\n  }\n\n  getState(){\n    return this.state.deepDup();\n  }\n\n  dispatch(action){\n    let newState = this.appliedMiddleware(this, this.rootReducer)(action);\n\n    if (!newState.shallowEqual(this.state)){\n      this.subscriptions.forEach(callback => callback(newState));\n      this.state = newState;\n    }\n  }\n\n  subscribe(callback){\n    this.subscriptions.add(callback);\n\n    return () => {\n      this.subscriptions.delete(callback);\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/store.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;