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

/***/ "./src/clock.js":
/*!**********************!*\
  !*** ./src/clock.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Clock\": () => (/* binding */ Clock)\n/* harmony export */ });\n/* harmony import */ var _warmup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./warmup */ \"./src/warmup.js\");\n\n\nclass Clock{\n  get time(){\n    return new Date().toTimeString().substr(0,8);\n  }\n}\n\nconst clock = new Clock();\n\nlet div = document.getElementById('clock');\n\n// setInterval(() => {\n//   // Array.from(div.children).forEach( (child) => {\n//   //   div.removeChild(child);\n//   // })\n  \n//   div.innerHTML = \"\";\n//   htmlGenerator(clock.time, div);\n  \n// }, 1000);\n\n(function animateClock(){\n  div.innerText = clock.time;\n  requestAnimationFrame(animateClock);\n})();\n\n//# sourceURL=webpack:///./src/clock.js?");

/***/ }),

/***/ "./src/drop_down.js":
/*!**************************!*\
  !*** ./src/drop_down.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ dogLinkCreator)\n/* harmony export */ });\n\nconst dogs = {\n  \"Corgi\": \"https://www.akc.org/dog-breeds/cardigan-welsh-corgi/\",\n  \"Australian Shepherd\": \"https://www.akc.org/dog-breeds/australian-shepherd/\",\n  \"Affenpinscher\": \"https://www.akc.org/dog-breeds/affenpinscher/\",\n  \"American Staffordshire Terrier\": \"https://www.akc.org/dog-breeds/american-staffordshire-terrier/\",\n  \"Tosa\": \"https://www.akc.org/dog-breeds/tosa/\",\n  \"Labrador Retriever\": \"https://www.akc.org/dog-breeds/labrador-retriever/\",\n  \"French Bulldog\": \"https://www.akc.org/dog-breeds/french-bulldog/\" \n};\n\nconst ul = document.querySelector(\".drop-down-dog-list\");\nconst nav = document.querySelector(\"nav.drop-down-dog-nav\");\nul.classList.add(\"hidden\");\n\nfunction dogLinkCreator() {\n  Object.entries(dogs).forEach( ([name, url]) => {\n    let a = document.createElement(\"a\");\n    a.innerHTML = name;\n    a.setAttribute(\"href\", url);\n\n    let li = document.createElement(\"li\");\n    li.classList.add(\"dog-link\");\n    li.appendChild(a);\n    ul.appendChild(li);\n  })\n}\n\ndogLinkCreator();\n\nconst callback = (e) => {\n  ul.classList.toggle(\"hidden\");\n}\n\nnav.addEventListener(\"mouseenter\", callback);\nnav.addEventListener(\"mouseleave\", callback);\n\n//# sourceURL=webpack:///./src/drop_down.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _warmup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./warmup */ \"./src/warmup.js\");\n/* harmony import */ var _clock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clock */ \"./src/clock.js\");\n/* harmony import */ var _drop_down__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drop_down */ \"./src/drop_down.js\");\n/* harmony import */ var _todo_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./todo_list */ \"./src/todo_list.js\");\n/* harmony import */ var _slide_scroll__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./slide_scroll */ \"./src/slide_scroll.js\");\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/slide_scroll.js":
/*!*****************************!*\
  !*** ./src/slide_scroll.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ debounce)\n/* harmony export */ });\nfunction debounce(func, wait = 20, immediate = true) {\n  let timeout;\n\n  // This is the function that is actually executed when\n  // the DOM event is triggered.\n  return function executedFunction() {\n    // Store the context of this and any\n    // parameters passed to executedFunction\n    const context = this;\n    const args = arguments;\n\n    // The function to be called after debounce time has elapsed\n    const later = function () {\n      // null timeout to indicate the debounce ended\n      timeout = null;\n\n      // Call function now if you did not in the beginning\n      if (!immediate) func.apply(context, args);\n    };\n\n    // Determine if you should call the function\n    // on the leading or trail end\n    const callNow = immediate && !timeout;\n\n    // This will reset the waiting every function execution.\n    clearTimeout(timeout);\n\n    // Restart the debounce waiting period - returns true\n    timeout = setTimeout(later, wait);\n\n    // Call immediately if you're doing a leading end execution\n    if (callNow) func.apply(context, args);\n  };\n}\n\nlet images = document.querySelectorAll(\"img\");\n\nwindow.addEventListener(\"scroll\", debounce((e) => {\n  images.forEach( (img) => {\n\n    if ((img.offsetTop + img.height / 2 < (window.innerHeight + window.scrollY)) \n      && (img.offsetTop + img.height) > window.scrollY ) {\n      img.classList.add(\"active\");\n    } else {\n      img.classList.remove(\"active\");\n    }\n  })\n}))\n\n//# sourceURL=webpack:///./src/slide_scroll.js?");

/***/ }),

/***/ "./src/todo_list.js":
/*!**************************!*\
  !*** ./src/todo_list.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ addTodo)\n/* harmony export */ });\nconst TODOS = JSON.parse(localStorage.getItem('todos')) || [];\nconst ul = document.querySelector('ul.todos');\n\nlet counter = (function(){\n  let count = 0;\n\n  return () => (count++);\n})();\n\nfunction addTodo(){\n  // let button = document.querySelector('input[value=\"+ Add Todo\"]');\n  let form = document.querySelector('form.add-todo-form');\n\n  form.addEventListener('submit', (e) => {\n    e.preventDefault();\n\n    let input = document.querySelector('input[name=\"add-todo\"]');\n    let todo = [input.value, false];\n\n    input.value = '';\n\n    TODOS.push(todo);\n    localStorage.setItem('todos', JSON.stringify(TODOS));\n    populateList(todo, TODOS.length - 1);\n  });\n};\n\nfunction populateList([item, checked], i){\n  let li = document.createElement('li');\n  let label = document.createElement('label');\n  let checkbox = document.createElement('input');\n  checkbox.setAttribute('data-index', i);\n  checkbox.setAttribute('type', 'checkbox');\n\n  if (checked){\n    checkbox.checked = true;\n  }\n\n  label.appendChild(checkbox);\n  label.append(item);\n  li.appendChild(label);\n  ul.appendChild(li);\n}\n\nTODOS.forEach((todo, i) => {\n  populateList(todo, i);\n});\n\nconst checkHandler = e => {\n  let index = e.target.getAttribute('data-index');\n  \n  if (index === null){ return; }\n\n  TODOS[index][1] = !TODOS[index][1];\n  localStorage.setItem('todos', JSON.stringify(TODOS));\n};\n\nul.addEventListener('click', checkHandler);\n\naddTodo();\n\n\n\n\n//# sourceURL=webpack:///./src/todo_list.js?");

/***/ }),

/***/ "./src/warmup.js":
/*!***********************!*\
  !*** ./src/warmup.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\nconst partyHeader = document.getElementById('party');\n\nconst htmlGenerator = (string, htmlElement) => {\n  let p = document.createElement('p');\n\n  p.innerText = string;\n\n  htmlElement.appendChild(p);\n};\n\nhtmlGenerator(\n  'I <3 Vanilla DOM manipulation.',\n  document.getElementById('party')\n);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (htmlGenerator);\n\n//# sourceURL=webpack:///./src/warmup.js?");

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