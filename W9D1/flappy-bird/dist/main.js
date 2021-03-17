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

/***/ "./src/bird.js":
/*!*********************!*\
  !*** ./src/bird.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Bird)\n/* harmony export */ });\nconst SCALE = 0.2;\nconst CONSTANTS = {\n  RATIO: 0.1,\n  GRAVITY:  0.5 * SCALE,\n  FLAP_SPEED:  -8 * (SCALE ** 0.5),\n  TERMINAL_VEL:  12,\n  BIRD_RADIUS:  18\n};\n\nclass Bird {\n    constructor(velocity, dimensions) {\n        this.velocity = velocity;\n        this.dimensions = dimensions\n        this.position = {x: dimensions.width / 3, y: dimensions.height / 2}\n        this.radius = CONSTANTS.BIRD_RADIUS;\n    }\n\n    drawBird(ctx) {\n        ctx.fillStyle = \"#ffdf00\";\n        ctx.strokeStyle = \"black\";\n        ctx.beginPath();\n        ctx.arc(this.position.x, this.position.y, CONSTANTS.BIRD_RADIUS, 0, 2 * Math.PI);\n        ctx.fill();\n        ctx.stroke();\n\n        ctx.fillStyle = \"#ffffff\";\n        ctx.strokeStyle = \"black\";\n        ctx.beginPath();\n        ctx.arc(this.position.x + 8, this.position.y - 4, 8, 0, 2 * Math.PI);\n        ctx.fill();\n        ctx.stroke();\n\n        ctx.fillStyle = \"black\";\n        ctx.beginPath();\n        ctx.arc(this.position.x + 8, this.position.y - 4, 2, 0, 2 * Math.PI);\n        ctx.fill();\n        \n        ctx.fillStyle = \"#ff3f1f\";\n        ctx.strokeStyle = \"black\";\n        ctx.beginPath();\n        ctx.ellipse(this.position.x + 10, this.position.y + 10, 10, 2, 0, 0, 2 * Math.PI);\n        ctx.fill();\n        ctx.stroke();\n\n        ctx.beginPath();\n        ctx.ellipse(this.position.x + 10, this.position.y + 6, 10, 2, 0, 0, 2 * Math.PI);\n        ctx.fill();\n        ctx.stroke();\n    }\n\n    animate(ctx) {\n        this.move();\n        this.drawBird(ctx);\n    }\n\n    move(){\n        this.position.y += (this.velocity += CONSTANTS.GRAVITY);\n    }\n\n    flap(){\n        this.velocity = CONSTANTS.FLAP_SPEED;\n    }\n\n    getCenter(){\n        return this.position\n    }\n\n}\n\n//# sourceURL=webpack://flappy-bird/./src/bird.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ FlappyBird)\n/* harmony export */ });\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n/* harmony import */ var _bird__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bird */ \"./src/bird.js\");\n\n\n\nclass FlappyBird {\n  constructor(canvas){\n    this.ctx = canvas.getContext(\"2d\");\n    this.dimensions = {\n      width: canvas.width,\n      height: canvas.height\n    };\n\n    canvas.addEventListener('click', (event => {\n      this.bird.flap();\n    }).bind(this));\n  }\n\n  animate(){\n    this.level.drawBackground(this.ctx);\n    this.bird.animate(this.ctx);\n    this.level.movePipes();\n    this.level.drawPipes(this.ctx);\n    \n    \n    if (this.running){\n      if (this.level.collidesWith(this.bird)){\n        alert('dead');\n        this.running = false;\n        this.restart();\n      }\n      requestAnimationFrame(this.animate.bind(this));\n    }\n  }\n\n  restart(){\n    setTimeout((() => {\n      this.level = new _level__WEBPACK_IMPORTED_MODULE_0__.default(this.dimensions);\n      this.bird = new _bird__WEBPACK_IMPORTED_MODULE_1__.default(1, this.dimensions)\n      this.running = true;\n\n      this.animate();\n    }).bind(this), 1000)\n  }\n\n  play(){\n    this.running = true;\n    this.animate();\n  }\n\n  click(){\n    if (this.running){\n      this.play();\n    }\n    this.bird.flap();\n  }\n}\n\n//# sourceURL=webpack://flappy-bird/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nconst canvas = document.getElementById('bird-game');\nlet game = new _game__WEBPACK_IMPORTED_MODULE_0__.default(canvas);\n\ngame.restart();\n\n\n\n//# sourceURL=webpack://flappy-bird/./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Level)\n/* harmony export */ });\nconst CONSTANTS = {\n  SPEED: 1,\n  EFFECTIVE_HEIGHT: 490,\n  GAP: 150,\n  APART: 220,\n  PIPE_WIDTH: 80\n}\n\nclass Level {\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n    this.pipes = [[0, Math.random() * CONSTANTS.EFFECTIVE_HEIGHT], [220, Math.random() * CONSTANTS.EFFECTIVE_HEIGHT], [440, Math.random() * CONSTANTS.EFFECTIVE_HEIGHT]]\n  }\n\n  drawBackground(ctx) {\n    let grd = ctx.createLinearGradient(0, 0, 0, this.dimensions.height);\n    grd.addColorStop(0, \"#bFEFFF\");\n    grd.addColorStop(1, \"#007fff\");\n\n    ctx.fillStyle = grd;\n    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);\n    this.drawPipes(ctx);\n  }\n\n\n  movePipes() {\n    this.pipes.forEach(pipe => {pipe[0] -= CONSTANTS.SPEED})\n    if (this.pipes[0][0] < -CONSTANTS.PIPE_WIDTH) {\n      let pipe = this.pipes.shift();\n      pipe[0] += CONSTANTS.APART * 3;\n      this.pipes.push(pipe)\n    }\n    // if (this.pipes[2][0] < this.dimensions.width - CONSTANTS.APART) {this.pipes.push([this.dimensions.width, Math.random()*CONSTANTS.EFFECTIVE_HEIGHT])}\n  }\n\n  drawPipes(ctx) {\n    ctx.strokeStyle = \"Black\";\n\n    this.pipes.forEach((pipe) => {\n      this.drawPipe(ctx, pipe)\n    })\n  }\n  \n  drawPipe(ctx, [x, y]) {\n    let grd = ctx.createLinearGradient(x, 0, x + CONSTANTS.PIPE_WIDTH, 0);\n    grd.addColorStop(0, \"#007f00\");\n    grd.addColorStop(0.5, \"#00ff00\");\n    grd.addColorStop(1, \"#007f00\");\n\n    ctx.fillStyle = grd;\n    \n    ctx.beginPath();\n    ctx.rect(x, 0, CONSTANTS.PIPE_WIDTH, y);\n    ctx.stroke();\n    ctx.fill();\n    ctx.beginPath();\n    ctx.rect(x, y + CONSTANTS.GAP, CONSTANTS.PIPE_WIDTH, this.dimensions.height);\n    ctx.stroke();\n    ctx.fill();\n  }\n\n  collidesWith({position, radius}){\n    let {x, y} = position; //bird position\n\n    return this.pipes.some(([x0, y0]) => { // pipe position\n      return (\n        x >= x0 - radius &&\n        x <= x0 + CONSTANTS.GAP + radius && (\n          y <= y0 + radius ||\n          y >= y0 + CONSTANTS.GAP - radius\n        )\n      )\n    });\n  }\n}\n\n//# sourceURL=webpack://flappy-bird/./src/level.js?");

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