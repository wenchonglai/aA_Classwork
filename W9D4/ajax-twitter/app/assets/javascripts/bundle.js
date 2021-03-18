/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/***/ ((module) => {

class FollowToggle {
  constructor($el){
    this.button = $('.follow-toggle');
    this.userId = $el.data('userId');
    this.followState = $el.data('initialFollowState');

    this.render();
  }

  render() {
    this.button.empty();
    this.text( this.followState === "unfollowed" ? "Follow!" : "Unfollow!");
  }

  handleClick() {
    this.button.on('click', _handleClick.bind(this) )
  }
}



function _handleClick(e) {
      e.preventDefault();

      $.ajax({
        url: `/users/${this.userId}/follow`,
        method: ( this.followState ? 'DELETE' : 'POST' ),
        dataType: 'JSON',
        success: (res) => { this.button.data('initialFollowState', this.followState = !this.followState); this.render()}

      })
}

module.exports = FollowToggle;

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");


$(document).ready( () => {

  let $buttons = $('.follow-toggle');


  $buttons.each((i, button) => {
    console.log(button, i)
    new FollowToggle(button);
  });
}
);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map