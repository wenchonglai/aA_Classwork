class FollowToggle {
  constructor($el){
    this.button = $('.follow-toggle');
    this.userId = $el.data('userId');
    this.followState = $el.data('initialFollowState');
  }
}

module.exports = FollowToggle;