const FollowToggle = require("./follow_toggle");
const UsersSearch = require("./users_search");


$(document).ready( () => {

  let $buttons = $('.follow-toggle');

  $buttons.each((i, button) => {
    new FollowToggle($(button));
  });

  $('.users-search').each( (i, nav) => {
    new UsersSearch($(nav));
  })
  
});
