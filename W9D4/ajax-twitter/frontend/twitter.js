const FollowToggle = require("./follow_toggle");
const UsersSearch = require("./users_search");
const TweetCompose = require("./tweet_compose");


$(document).ready( () => {

  let $buttons = $('.follow-toggle');

  $buttons.each((i, button) => {
    new FollowToggle($(button));
  });

  $('.users-search').each( (i, nav) => {
    new UsersSearch($(nav));
  })
  
  new TweetCompose( $('.tweet-compose') );
});
