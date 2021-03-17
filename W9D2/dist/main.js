/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst CONSTANTS = {\n    COLOR: \"grey\",\n    RADIUS: 30,\n    VELOCITY_RANGE: 5,\n};\n\nfunction Asteroid(pos, {game} = {}){\n    MovingObject.call(this, {\n        pos,\n        vel: {\n            x: Math.random() * CONSTANTS.VELOCITY_RANGE,\n            y: Math.random() * CONSTANTS.VELOCITY_RANGE\n        },\n        radius: CONSTANTS.RADIUS,\n        color: CONSTANTS.COLOR,\n        game\n    });\n\n    this.id = Asteroid.id++;\n}\n\nAsteroid.id = 0;\n\nUtil.inherits(Asteroid, MovingObject);\nmodule.exports = Asteroid;\n\n\n//# sourceURL=webpack://asteroid/./src/asteroid.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction Bullet (ship, angle){\n    MovingObject.call(this, {\n        game: ship.game, \n        radius: Bullet.RADIUS,\n        color: Bullet.COLOR,\n        pos: ship.pos,\n        vel: {\n            x: ship.vel.x + Bullet.SPEED* Math.sin(angle * Math.PI / 180),\n            y: ship.vel.y + Bullet.SPEED* Math.cos(angle * Math.PI / 180)\n        }\n    });\n}\n\nUtil.inherits(Bullet, MovingObject);\n\nBullet.SPEED = 2;\nBullet.RADIUS = 2;\nBullet.COLOR = \"green\";\n\n\nmodule.exports = Bullet;\n\n\n//# sourceURL=webpack://asteroid/./src/bullet.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nconst CONSTANTS = {\n    DIM_X: 960,\n    DIM_Y: 540,\n    NUM_ASTEROIDS: 10\n}\n\nfunction Game() {\n    this.asteroids = [];\n    this.restart();\n}\n\nGame.prototype.restart = function(){\n    this.addAsteroids();\n    this.bullets = [];\n    this.ship = new Ship(this);\n}\n\nGame.prototype.addAsteroids = function (){\n    while(this.asteroids.length < CONSTANTS.NUM_ASTEROIDS)\n        this.addAsteroid();\n};\n\nGame.prototype.draw = function (ctx) {\n    ctx.clearRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);\n    this.asteroids.forEach(asteroid => asteroid.draw(ctx));\n    this.bullets.forEach(bullet => bullet.draw(ctx));\n    this.ship.draw(ctx);\n}\n\nGame.prototype.moveObjects = function () {\n    this.checkCollisions();\n    this.asteroids.forEach(asteroid => asteroid.move());\n    this.bullets.forEach(bullet => bullet.move());\n    this.ship.move();\n}\n\nGame.prototype.wrap = function(pos){\n    let {x, y} = pos;\n\n    if ( x > CONSTANTS.DIM_X ) x = 0;\n    if ( y > CONSTANTS.DIM_Y ) y = 0;\n    if ( x < 0 ) x = CONSTANTS.DIM_X;\n    if ( y < 0 ) y = CONSTANTS.DIM_Y;\n\n    return {x, y};\n}\n\nGame.prototype.checkCollisions = function (){\n    // if two asteroids collide, remove several asteroids and create new ones\n    for (let i = 1; i < 10; i++){\n        for (let j = 0; j < i; j++){\n            if (this.asteroids[i].isCollidedWith(this.asteroids[j])){\n                this.asteroids.splice(i--, 1);\n                this.asteroids.splice(j-- , 1);\n                this.addAsteroid();\n                this.addAsteroid();\n            }\n        };\n    };\n    // if an asteroid collides with the ship, then restart the game\n    // this.asteroids.forEach(asteroid => {\n    //     if (asteroid.isCollidedWith(this.ship)){\n    //         this.restart();\n    //     }\n    // })\n\n    // bullets\n    for (let i = 0, len = this.bullets.length; i < len; i++){\n        let bullet = this.bullets[i];\n        let {x, y} = bullet.pos;\n\n        if (x < 0 || y < 0 || x > CONSTANTS.DIM_X || y > CONSTANTS.DIM_Y){\n            this.bullets.splice(i--, 1);\n            len -= 1;\n        }\n    }\n};\n\nGame.prototype.addAsteroid = function (){\n    let asteroid = new Asteroid(\n        // x: CONSTANTS.DIM_X * Math.random(),\n        // y: CONSTANTS.DIM_Y * Math.random()\n    this.randomPosition() ,{game: this});\n\n    this.asteroids.push(asteroid);\n}\n\nGame.prototype.randomPosition = function () {\n    return {\n        x: CONSTANTS.DIM_X * Math.random(),\n        y: CONSTANTS.DIM_Y * Math.random()\n    };\n}\n\n\n\n\n\n\n\n\n\nmodule.exports = Game;\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://asteroid/./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\nfunction GameView (ctx){\n    this.game = new Game();\n    this.ctx = ctx;\n}\n\nGameView.prototype.start = function (){\n    this.game.moveObjects();\n    this.game.draw(this.ctx);\n    requestAnimationFrame(this.start.bind(this));\n}\n\n\nGameView.prototype.bindKeyHandlers = function (){\n    key('w', () => { this.game.ship.vel.y -= 1; });\n    key('a', () => { this.game.ship.vel.x -= 1; });\n    key('s', () => { this.game.ship.vel.y += 1; });\n    key('d', () => { this.game.ship.vel.x += 1; });\n    key('space', () => { this.game.ship.fireBullets() });\n}\n\nmodule.exports = GameView;\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://asteroid/./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n    let canvas = document.getElementById(\"game-canvas\");\r\n    let ctx = canvas.getContext(\"2d\");\r\n    ctx.width = 960;\r\n    ctx.height = 540;\r\n    let gameView = new GameView(ctx);\r\n    gameView.bindKeyHandlers();\r\n    gameView.start();\r\n})\n\n//# sourceURL=webpack://asteroid/./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module) => {

eval("function MovingObject({pos, vel, radius, color, game} = {}) {\n  this.pos = pos;\n  this.vel = vel;\n  this.radius = radius;\n  this.color = color;\n  this.game = game;\n}\n\nMovingObject.prototype.draw = function (ctx){\n  ctx.fillStyle = this.color;\n  ctx.beginPath();\n  ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);\n  ctx.fill();\n}\n\nMovingObject.prototype.move = function(){\n  this.pos.x += this.vel.x;\n  this.pos.y += this.vel.y;\n\n  if (this.game ){\n    this.pos = this.game.wrap(this.pos);\n  }\n}\n\nMovingObject.prototype.isCollidedWith = function (obj) {\n  let {x,y} = obj.pos;\n  let distance = (this.pos.x - x)** 2 + (this.pos.y - y)** 2;\n  distance **= 0.5;\n  return (distance <= (this.radius + obj.radius));\n}\n\n\n\n\n\n\n\n\n\n\n\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack://asteroid/./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n\nfunction Ship(game) {\n    MovingObject.call(this, {\n        radius: Ship.RADIUS, \n        color: Ship.COLOR,\n        vel: {x: 0, y:0},\n        pos: game.randomPosition(), \n        game\n    })\n}\n\nUtil.inherits(Ship, MovingObject);\n\nShip.prototype.power = function (impulse) {\n    this.vel.x += impulse.x;\n    this.vel.y += impulse.y;\n}\n\nShip.prototype.draw = function(ctx){\n    ctx.fillStyle = this.color;\n    ctx.beginPath();\n    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);\n    ctx.fill();\n}\n\nShip.prototype.fireBullets = function (){\n    [0, 90, 180, 270].forEach(angle => this.game.bullets.push(new Bullet(this, angle)))\n    \n}\n\nShip.RADIUS = 20;\nShip.COLOR = \"blue\";\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack://asteroid/./src/ship.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((module) => {

eval("const Util = {\n    inherits(childClass, parentClass){\n        function Surrogate(){};\n        Surrogate.prototype = parentClass.prototype;\n        childClass.prototype = new Surrogate();\n        childClass.prototype.constructor = childClass;\n    }\n}\n\nmodule.exports = Util;\n\n//# sourceURL=webpack://asteroid/./src/util.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;