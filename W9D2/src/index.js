const GameView = require('./game_view');
document.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById("game-canvas");
    let ctx = canvas.getContext("2d");
    ctx.width = 960;
    ctx.height = 540;
    let gameView = new GameView(ctx);
    gameView.bindKeyHandlers();
    gameView.start();
})