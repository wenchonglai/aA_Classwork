const FollowToggle = require("./follow_toggle");


$(document).ready( () => {

  let $buttons = $('.follow-toggle');


  $buttons.each((i, button) => {
    console.log(button, i)
    new FollowToggle(button);
  });
}
);
