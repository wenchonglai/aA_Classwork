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