const Game = require("./game");

function GameView (ctx){
    this.game = new Game();
    this.ctx = ctx;
}

GameView.prototype.start = function (){
    this.game.moveObjects();
    this.game.draw(this.ctx);
    requestAnimationFrame(this.start.bind(this));
}


GameView.prototype.bindKeyHandlers = function (){
    key('w', () => { this.game.ship.vel.y -= 1; });
    key('a', () => { this.game.ship.vel.x -= 1; });
    key('s', () => { this.game.ship.vel.y += 1; });
    key('d', () => { this.game.ship.vel.x += 1; });
    key('space', () => { this.game.ship.fireBullets() });
}

module.exports = GameView;










