/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/***/ (function(module) {

const APIUtil = {
  followUser: id => {
    return this.ajaxUser(id, 'POST');
  },

  unfollowUser: id => {
    return this.ajaxUser(id, 'DELETE');
  },

  ajaxUser: (id, method) => (
    $.ajax({
      url: `/users/${id}/follow`,
      method,
      dataType: 'JSON'
    })
  )
};

module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

class FollowToggle {
  constructor($el){
    this.button = $el;
    this.userId = $el.data('userId');
    this.followState = $el.data('initialFollowState');

    this.handleClick();
    this.render();
  }

  render() {
    this.button.empty();
    this.button.text( this.followState === false ? "Follow!" : "Unfollow!");
  }

  handleClick() {
    // _handleClick.bind(this)
    this.button.on('click', (_handleClick).bind(this) )
  }
}

function _handleClick(e){
  e.preventDefault();
  
  $.ajax({
    url: `/users/${this.userId}/follow`,
    method: ( this.followState ? 'DELETE' : 'POST' ),
    dataType: 'JSON',
    success: (res) => {
      console.log(res);
      this.followState = !this.followState;
      this.render();
    },
    error: (err) => {
      console.log(err);
      alert(`you CANT do that!\n${err}`)
    }
  });
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
    new FollowToggle($(button));
  });
}
);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map