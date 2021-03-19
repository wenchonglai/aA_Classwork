/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/***/ ((module) => {

const APIUtil = {
  followUser: id => {
    return ajaxUser(id, 'POST');
  },

  unfollowUser: id => {
    return ajaxUser(id, 'DELETE');
  },

  searchUsers(queryVal) {
    return $.ajax({
      url: `/users/search`,
      method: 'GET',
      data: queryVal,
      dataType: 'JSON'
    })
  }
};

function ajaxUser (id, method) {
    return $.ajax({
      url: `/users/${id}/follow`,
      method,
      dataType: 'JSON'
    })
}

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
    this.button.prop('disabled', false);
    this.button.text( this.followState === false ? "Follow!" : "Unfollow!");
  }

  handleClick() {
    // _handleClick.bind(this)
    this.button.on('click', (_handleClick).bind(this) )
  }
}

function _handleClick(e){
  e.preventDefault();
  this.button.prop('disabled', true);

  (this.followState ?  APIUtil.unfollowUser(this.userId) : APIUtil.followUser(this.userId))
  .then((res) => {
      this.followState = !this.followState;
      this.render();
    })
  .fail((err) => {
      console.log(err);
      alert(`you CANT do that!\n${err}`)
    })
}

module.exports = FollowToggle;

/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

class UsersSearch {
    constructor($el) {
        this.$el = $el;
        this.$ul = $el.find('ul');
        this.$input = $el.find('input');
        console.log(this.$input);
        
        this.handleInput()
    }

    handleInput() {
        this.$input.on('change', (e) => {
            APIUtil.searchUsers(this.$input.val())
            .then( (res) => {
                this.renderResults(res);
            })
        })
    }

    renderResults(res) {
        this.$ul.empty();
        res.each( user => {
            let $li = $(`<li><a> @${user.username} </a></li>`);
            this.$ul.append($li);
        })
    }
}

module.exports = UsersSearch

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
const UsersSearch = __webpack_require__(/*! ./users_search */ "./frontend/users_search.js");


$(document).ready( () => {

  let $buttons = $('.follow-toggle');

  $buttons.each((i, button) => {
    new FollowToggle($(button));
  });

  $('.users-search').each( (i, nav) => {
    new UsersSearch($(nav));
  })
  
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map