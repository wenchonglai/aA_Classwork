const HanoiView = require("./view");
const HanoiGame = require("./game");

$(() => {
  console.log(1);
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  new HanoiView(game, rootEl);
});
