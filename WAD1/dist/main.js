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

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ DOMNodeCollection)\n/* harmony export */ });\nclass DOMNodeCollection {\n\n  constructor(...htmlElements){\n    this.elements = htmlElements;\n  }\n\n  each(callback){ this.elements.forEach(callback); }\n  map(callback, thisArg = this.elements){ return Array.prototype.map.call(this.elements, callback, thisArg); }\n  flatMap(...args){ return Array.prototype.flatMap.call(this.elements, ...args); }\n  empty(){ this.each( el => { el.innerHTML = str; }); }\n  append(children){\n    if (!(children instanceof Array)) {children = [children];}\n    \n    this.each(el => {\n      el.innerHTML += children.map(child => child.outerHTML).join('');\n    });\n  }\n  attr(key, val){\n    let len = arguments.length;\n\n    if (len === 1){ return this.elements[0].getAttribute(key); }\n\n    this.each(el => el.setAttribute(key, val));\n    return this;\n  }\n\n  addClass(name){\n    this.each(el => {el.classList.add(name); });\n    return this;\n  }\n\n  removeClass(name){\n    this.each(el => { el.classList.remove(name); });\n    return this;\n  }\n\n  toggleClass(name){\n    this.each(el => {el.classList.toggle(name); });\n    return this;\n  }\n\n  children(){\n    return new DOMNodeCollection( ...this.flatMap(el => Array.from(el.children)) );\n  }\n\n  parent(){\n    return new DOMNodeCollection( ...new Set( this.map(el => el.parentNode) ) );\n  }\n\n  find(selector){\n    return new DOMNodeCollection( ...new Set( this.flatMap(el => Array.from(el.querySelectorAll(selector))) ) );\n  }\n\n  remove(){\n    let children = this.children;\n\n    if (children){\n      children.each(child => child.remove());\n    }\n\n    this.each(el => {\n      if (el.listeners){\n        Object.keys(el.listeners).forEach(key => {\n          for (let listener of el.listeners[key]){\n            el.removeEventListener(listener);\n          }\n        });\n\n        delete el.listeners[key];\n      }\n\n      el.innerHTML = ''; \n    })\n  }\n\n  html(str){\n    if (str){\n      this.each(el => { el.innerHTML = str; });\n      return this;\n    } else {\n      return this.elements[0].innterHTML;\n    }\n  }\n\n  // Phase 2\n  on(type, listener){\n    this.each(el => {\n      let listeners = el.listeners;\n\n      if ( !listeners ) el.listeners = ( listeners = {});\n\n      let set = listeners[type];\n\n      if ( !set ) listeners[type] = ( set = new Set());\n\n      set.add(listener);\n      el.addEventListener(type, listener);\n    });\n  }\n\n  off(type, listener){\n    this.each(el => {\n      let listeners = el.listeners\n      let set = listeners[type];\n\n      (listener ? [listener] : set).forEach( listener => {\n        set.delete(listener);\n        el.removeEventListener(type, listener);\n      });\n    });\n  }\n\n  // Phase 3\n  \n}\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom_node_collection_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom_node_collection.js */ \"./src/dom_node_collection.js\");\n\n\nfunction $_(arg){\n  if (typeof arg === 'string'){\n    let nodeList = document.querySelectorAll(arg);\n    return new _dom_node_collection_js__WEBPACK_IMPORTED_MODULE_0__.default(...nodeList);\n  } else if (arg instanceof HTMLElement){\n    return new _dom_node_collection_js__WEBPACK_IMPORTED_MODULE_0__.default(arg);\n  } else if (arg instanceof Function){\n    document.addEventListener('DOMContentLoaded', arg);\n  }\n}\n\n$_.extend = function(obj, ...args){\n  for (let arg of args){\n    Object.keys(arg).forEach(key => {\n      obj[key] = arg[key];\n    })\n  }\n};\n\n$_.ajax = async function({\n  type = 'GET',\n  url = window.location.href, \n  contentType = 'application/x-www-form-urlencoded; charset=UTF-8',\n  data,\n  success = () => {}, \n  error = () => {}\n} = {}){\n  const xhr = new XMLHttpRequest();\n\n  xhr.open(type, url);\n  xhr.setRequestHeader('Content-Type', contentType);\n\n  return await new Promise((res, rej) => {\n    xhr.send(data);\n    xhr.onreadystatechange = function() {\n      if (xhr.readyState === 4) {\n        if (xhr.status >= 200 && xhr.status <= 400)\n          res(success(xhr.response, 'success', xhr))\n        else rej(error(xhr, 'error', xhr.statusText))\n      }\n    }\n  });\n}\n\nwindow.$_ = $_;\n\n$_(() => console.log(1))\n\n//# sourceURL=webpack:///./src/index.js?");

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