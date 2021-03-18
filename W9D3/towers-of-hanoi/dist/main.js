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

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module) => {

eval("class Game {\n  constructor() {\n    this.towers = [[3, 2, 1], [], []];\n  }\n\n  isValidMove(startTowerIdx, endTowerIdx) {\n      const startTower = this.towers[startTowerIdx];\n      const endTower = this.towers[endTowerIdx];\n\n      if (startTower.length === 0) {\n        return false;\n      } else if (endTower.length == 0) {\n        return true;\n      } else {\n        const topStartDisc = startTower[startTower.length - 1];\n        const topEndDisc = endTower[endTower.length - 1];\n        return topStartDisc < topEndDisc;\n      }\n  }\n\n  isWon() {\n      // move all the discs to the last or second tower\n      return (this.towers[2].length == 3) || (this.towers[1].length == 3);\n  }\n\n  move(startTowerIdx, endTowerIdx) {\n      if (this.isValidMove(startTowerIdx, endTowerIdx)) {\n        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());\n        return true;\n      } else {\n        return false;\n      }\n  }\n\n  print() {\n      console.log(JSON.stringify(this.towers));\n  }\n\n  promptMove(reader, callback) {\n      this.print();\n      reader.question(\"Enter a starting tower: \", start => {\n        const startTowerIdx = parseInt(start);\n        reader.question(\"Enter an ending tower: \", end => {\n          const endTowerIdx = parseInt(end);\n          callback(startTowerIdx, endTowerIdx);\n        });\n      });\n  }\n\n  run(reader, gameCompletionCallback) {\n      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {\n        if (!this.move(startTowerIdx, endTowerIdx)) {\n          console.log(\"Invalid move!\");\n        }\n\n        if (!this.isWon()) {\n          // Continue to play!\n          this.run(reader, gameCompletionCallback);\n        } else {\n          this.print();\n          console.log(\"You win!\");\n          gameCompletionCallback();\n        }\n      });\n  }\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack://towers-of-hanoi/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const HanoiView = __webpack_require__(/*! ./view */ \"./src/view.js\");\nconst HanoiGame = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n$(() => {\n  console.log(1);\n  const rootEl = $('.hanoi');\n  const game = new HanoiGame();\n  new HanoiView(game, rootEl);\n});\n\n\n//# sourceURL=webpack://towers-of-hanoi/./src/index.js?");

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((module) => {

eval("class HanoiView {\n  constructor(hanoiGame, $element) {\n    this.game = hanoiGame;\n    this.$el = $element;\n\n    this.$el.css('height', this.game.towers.flat().length * 60 + 'px');\n    console.log(this.game.towers.flat().length * 60);\n\n    this.setupTowers();\n    this.render();\n    this.clickTower();\n  }\n\n  setupTowers() {\n    for (let i = 0; i < 3; i++) {\n      let $ul = $(\"<ul></ul>\");\n\n      $ul.data(\"index\", i);\n      this.$el.append($ul);\n    }\n  }\n\n  render() {\n    \n    this.game.towers.forEach((tower, i) => {\n      let $tower = $(`ul:nth-child(${i + 1})`);\n      $tower.empty();\n\n      tower.forEach((disk) => {\n        let $disk = $(`<li></li>`);\n\n        let $dogeHead = $(`<div class='doge head'></div>`);\n        let $dogeBody = $(`<div class='doge body'></div>`);\n        let $dogeTail = $(`<div class='doge tail'></div>`);\n        \n        $dogeBody.css(\"width\", disk * 100 - 50 + \"px\");\n        $dogeBody.css(\"background-size\", `${disk * 100 - 50}px 50px`);\n\n        $disk.append($dogeHead);\n        $disk.append($dogeBody);\n        $disk.append($dogeTail);\n\n        $disk.data(\"length\", disk);\n        $tower.append($disk);\n      });\n    });\n  }\n\n  clickTower() {\n    this.$el.on(\"click\", \"ul\", (e) => {\n      let $li = $(e.target);\n      let $ul = $(e.currentTarget);\n      \n      if (this.$selectedTower){\n        this.endTowerIdx = $ul.data('index');\n\n        if (!this.game.move(this.startTowerIdx, this.endTowerIdx)) {\n          alert('Invalid move!')\n          return;\n        }\n\n        this.render();\n\n        if (this.game.isWon()){\n          alert('The computer is telling you how awesome you are.');\n          return;\n        }\n\n        this.$selectedTower.removeClass('select')\n        this.$selectedTower = undefined;\n        // this.$selectedDisk.remove()\n        // $ul.appendChild(this.$selectedDisk)\n\n      } else {\n        this.$selectedTower = $ul;\n        this.startTowerIdx = $ul.data('index');\n        this.$selectedTower.addClass('select');\n        // this.$selectedDisk = $ul.children().last();\n      }\n    });\n  }\n}\n\nmodule.exports = HanoiView;\n\n\n//# sourceURL=webpack://towers-of-hanoi/./src/view.js?");

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