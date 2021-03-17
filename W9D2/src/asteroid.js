const MovingObject = require("./moving_object");
const Util = require("./util");
const CONSTANTS = {
    COLOR: "grey",
    RADIUS: 30,
    VELOCITY_RANGE: 5,
};

function Asteroid(pos, {game} = {}){
    MovingObject.call(this, {
        pos,
        vel: {
            x: Math.random() * CONSTANTS.VELOCITY_RANGE,
            y: Math.random() * CONSTANTS.VELOCITY_RANGE
        },
        radius: CONSTANTS.RADIUS,
        color: CONSTANTS.COLOR,
        game
    });

    this.id = Asteroid.id++;
}

Asteroid.id = 0;

Util.inherits(Asteroid, MovingObject);
module.exports = Asteroid;
