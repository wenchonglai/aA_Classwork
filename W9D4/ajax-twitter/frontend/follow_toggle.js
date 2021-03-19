const APIUtil = require("./api_util");

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