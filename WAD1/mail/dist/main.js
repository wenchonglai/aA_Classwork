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

/***/ "./src/compose.js":
/*!************************!*\
  !*** ./src/compose.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Compose)\n/* harmony export */ });\n/* harmony import */ var _message_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./message_store */ \"./src/message_store.js\");\n\n\nclass Compose{\n  render(){\n    let div = document.createElement('div');\n\n    div.classList.add('new-message');\n    div.innerHTML = this.renderForm();\n\n    div.addEventListener('submit', this.handleSubmit.bind(this));\n    div.addEventListener('change', this.handleChange.bind(this))\n    return div;\n  }\n\n  handleChange(e){\n    // * Add an event listener to the container `<div>` on a `change` event.\n    // * This event listener will be called any time one of the fields in the form\n    //   fires a `change` event because the event will propagate up.\n    // * The handler function should receive one `event` argument.\n    // * You can retrieve the element that fired the event by accessing the\n    //   `target` property of the `event`.\n    // * Get the name of the field that changed through the `name` property of the `target` element.\n    // * Get the value of the field that changed through the `value` property of the `target` element.\n    // * Tell the `MessageStore` to update the contents of the `messageDraft` to\n    //   match the form by calling `MessageStore.updateDraftField`.\n    //   * Pass in the name of the field to change as the first argument and the value of the field to change as the second argument.\n    // * Test that if you fill out the form and click `Inbox` or `Sent` before\n    //   submitting and then navigate back to compose form, the form is still filled\n    //   out.\n    console.log(e);\n  }\n\n  handleSubmit(e){\n    e.preventDefault()\n    _message_store__WEBPACK_IMPORTED_MODULE_0__.MessageStore.sendDraft();\n  }\n\n  renderForm(){\n    let currentDraft = _message_store__WEBPACK_IMPORTED_MODULE_0__.MessageStore.getMessageDraft();\n\n    let p = document.createElement('p');\n\n    p.classList.add('new-message-header');\n    p.innerHTML = 'New Message';\n\n    let form = document.createElement('form');\n    form.classList.add('compose-form');\n    form.innerHTML = (\n      `<input placeholder=\"Recipient\" name=\"to\" type=\"text\" value=\"${currentDraft.to}\">` +\n      `<input placeholder=\"Subject\" name=\"subject\" type=\"text\" value=${currentDraft.subject}></input>` +\n      `<textarea name=\"body\" row=\"20\">Here's some text</textarea>` +\n      `<button type=\"submit\" class=\"btn btn-primary submit-message\">Send</button>`);\n    \n    return p.outerHTML + form.outerHTML;\n  }\n}\n\n//# sourceURL=webpack://mail/./src/compose.js?");

/***/ }),

/***/ "./src/inbox.js":
/*!**********************!*\
  !*** ./src/inbox.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Inbox)\n/* harmony export */ });\n/* harmony import */ var _message_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./message_store */ \"./src/message_store.js\");\n\n\nclass Inbox{\n  constructor(){\n\n  }\n  render(){\n    let ul = document.createElement('ul');\n    ul.classList.add();\n\n    let messages = _message_store__WEBPACK_IMPORTED_MODULE_0__.MessageStore.getInboxMessages();\n\n    messages.forEach(message => {\n      ul.appendChild( this.renderMessage(message) );\n    });\n    \n    return ul;\n  }\n\n  renderMessage(message){\n    let li = document.createElement('li');\n\n    li.classList.add('message');\n    li.innerHTML = ['from', 'subject', 'body']\n      .map( key => \n        `<span class=${key}>${message[key]}</span>`\n      )\n      .join('');\n\n    return li;\n  }\n}\n\n//# sourceURL=webpack://mail/./src/inbox.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _inbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inbox */ \"./src/inbox.js\");\n/* harmony import */ var _sent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sent */ \"./src/sent.js\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./router */ \"./src/router.js\");\n/* harmony import */ var _compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./compose */ \"./src/compose.js\");\n\n\n\n\n\nwindow.addEventListener('DOMContentLoaded', initCallback);\n\nfunction initCallback(e){\n\n  let routes = {\n    'inbox': new _inbox__WEBPACK_IMPORTED_MODULE_0__.default(),\n    'sent': new _sent__WEBPACK_IMPORTED_MODULE_1__.default(),\n    'compose': new _compose__WEBPACK_IMPORTED_MODULE_3__.default()\n  };\n\n  window.addEventListener('hashchange', e => {\n    console.log(1);\n    e.preventDefault();\n    let node = document.querySelector('.content');\n    let router = new _router__WEBPACK_IMPORTED_MODULE_2__.default(node, routes);\n    router.start();\n  });\n  \n  document.querySelectorAll('.sidebar-nav li').forEach(el => {\n    el.addEventListener('click', e => {\n      e.preventDefault();\n      window.location.hash = el.innerText.toLowerCase();\n    });\n  });\n\n  window.location.hash = 'inbox';\n}\n\n\n//# sourceURL=webpack://mail/./src/index.js?");

/***/ }),

/***/ "./src/message_store.js":
/*!******************************!*\
  !*** ./src/message_store.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MessageStore\": () => (/* binding */ MessageStore),\n/* harmony export */   \"Message\": () => (/* binding */ Message)\n/* harmony export */ });\nconst messages = {\n  sent: [\n    {\n      to: \"friend@mail.com\",\n      subject: \"Check this out\",\n      body: \"It's so cool\"\n    },\n    { to: \"person@mail.com\", subject: \"zzz\", body: \"so booring\" }\n  ],\n  inbox: [\n    {\n      from: \"grandma@mail.com\",\n      subject: \"Fwd: Fwd: Fwd: Check this out\",\n      body:\n        \"Stay at home mom discovers cure for leg cramps. Doctors hate her\"\n    },\n    {\n      from: \"person@mail.com\",\n      subject: \"Questionnaire\",\n      body: \"Take this free quiz win $1000 dollars\"\n    }\n  ]\n};\nlet messageDraft;\n\nclass MessageStore{\n  static getInboxMessages(){\n    return messages.inbox;\n  }\n  static getSentMessages(){\n    return messages.sent;\n  }\n  static getMessageDraft(){\n    messageDraft ||= new Message();\n    return messageDraft;\n  }\n  static updateDraftField(field, value){\n    messageDraft[field] = value;\n  }\n  static sendDraft(){\n    messages.sent.push(messageDraft);\n    messageDraft = new Message();\n  }\n}\n\nclass Message{\n  constructor({from = '', to = '', subject = '', body = ''} = {}){\n    this.from = from;\n    this.to = to;\n    this.subject = subject;\n    this.body = body;\n    messageDraft ||= this;\n  }\n}\n\n\n\n//# sourceURL=webpack://mail/./src/message_store.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Router)\n/* harmony export */ });\nclass Router{\n  constructor(node, routes){\n    this.node = node;\n    this.routes = routes;\n  }\n  start(){\n    this.node.removeEventListener('hashchange', this.render);\n    this.node.addEventListener('hashchange', (this.render = this.render.bind(this)));\n    this.render();\n  }\n  activeRoute(){\n    let hash = window.location.hash.replace(/\\#/g, '');\n    return this.routes[hash];\n  }\n  render(){\n    this.node.innerHTML = \"\";\n    let p = document.createElement('p');\n    let component = this.activeRoute();\n    \n    if (component)\n      this.node.appendChild(component.render());\n  }\n}\n\n//# sourceURL=webpack://mail/./src/router.js?");

/***/ }),

/***/ "./src/sent.js":
/*!*********************!*\
  !*** ./src/sent.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Inbox)\n/* harmony export */ });\n/* harmony import */ var _message_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./message_store */ \"./src/message_store.js\");\n\n\nclass Inbox{\n  constructor(){\n\n  }\n  render(){\n    let ul = document.createElement('ul');\n    ul.classList.add();\n\n    let messages = _message_store__WEBPACK_IMPORTED_MODULE_0__.MessageStore.getSentMessages();\n\n    messages.forEach(message => {\n      ul.appendChild( this.renderMessage(message) );\n    });\n    \n    return ul;\n  }\n\n  renderMessage(message){\n    let li = document.createElement('li');\n\n    li.classList.add('message');\n    li.innerHTML = ['to', 'subject', 'body']\n      .map( key => \n        `<span class=${key}>${message[key]}</span>`\n      )\n      .join('');\n\n    return li;\n  }\n}\n\n//# sourceURL=webpack://mail/./src/sent.js?");

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