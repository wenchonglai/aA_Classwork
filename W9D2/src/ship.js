const MovingObject = require("./moving_object");
const Util = require("./util");
const Bullet = require("./bullet");

function Ship(game) {
    MovingObject.call(this, {
        radius: Ship.RADIUS, 
        color: Ship.COLOR,
        vel: {x: 0, y:0},
        pos: game.randomPosition(), 
        game
    })
}

Util.inherits(Ship, MovingObject);

Ship.prototype.power = function (impulse) {
    this.vel.x += impulse.x;
    this.vel.y += impulse.y;
}

Ship.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
}

Ship.prototype.fireBullets = function (){
    [0, 90, 180, 270].forEach(angle => this.game.bullets.push(new Bullet(this, angle)))
    
}

Ship.RADIUS = 20;
Ship.COLOR = "blue";

module.exports = Ship;