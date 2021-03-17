const MovingObject = require("./moving_object");
const Util = require("./util");

function Bullet (ship, angle){
    MovingObject.call(this, {
        game: ship.game, 
        radius: Bullet.RADIUS,
        color: Bullet.COLOR,
        pos: ship.pos,
        vel: {
            x: ship.vel.x + Bullet.SPEED* Math.sin(angle * Math.PI / 180),
            y: ship.vel.y + Bullet.SPEED* Math.cos(angle * Math.PI / 180)
        }
    });
}

Util.inherits(Bullet, MovingObject);

Bullet.SPEED = 2;
Bullet.RADIUS = 2;
Bullet.COLOR = "green";


module.exports = Bullet;
