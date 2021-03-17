const Asteroid = require("./asteroid");
const Ship = require("./ship");

const CONSTANTS = {
    DIM_X: 960,
    DIM_Y: 540,
    NUM_ASTEROIDS: 10
}

function Game() {
    this.asteroids = [];
    this.restart();
}

Game.prototype.restart = function(){
    this.addAsteroids();
    this.bullets = [];
    this.ship = new Ship(this);
}

Game.prototype.addAsteroids = function (){
    while(this.asteroids.length < CONSTANTS.NUM_ASTEROIDS)
        this.addAsteroid();
};

Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);
    this.asteroids.forEach(asteroid => asteroid.draw(ctx));
    this.bullets.forEach(bullet => bullet.draw(ctx));
    this.ship.draw(ctx);
}

Game.prototype.moveObjects = function () {
    this.checkCollisions();
    this.asteroids.forEach(asteroid => asteroid.move());
    this.bullets.forEach(bullet => bullet.move());
    this.ship.move();
}

Game.prototype.wrap = function(pos){
    let {x, y} = pos;

    if ( x > CONSTANTS.DIM_X ) x = 0;
    if ( y > CONSTANTS.DIM_Y ) y = 0;
    if ( x < 0 ) x = CONSTANTS.DIM_X;
    if ( y < 0 ) y = CONSTANTS.DIM_Y;

    return {x, y};
}

Game.prototype.checkCollisions = function (){
    // if two asteroids collide, remove several asteroids and create new ones
    for (let i = 1; i < 10; i++){
        for (let j = 0; j < i; j++){
            if (this.asteroids[i].isCollidedWith(this.asteroids[j])){
                this.asteroids.splice(i--, 1);
                this.asteroids.splice(j-- , 1);
                this.addAsteroid();
                this.addAsteroid();
            }
        };
    };
    // if an asteroid collides with the ship, then restart the game
    // this.asteroids.forEach(asteroid => {
    //     if (asteroid.isCollidedWith(this.ship)){
    //         this.restart();
    //     }
    // })

    // bullets
    for (let i = 0, len = this.bullets.length; i < len; i++){
        let bullet = this.bullets[i];
        let {x, y} = bullet.pos;

        if (x < 0 || y < 0 || x > CONSTANTS.DIM_X || y > CONSTANTS.DIM_Y){
            this.bullets.splice(i--, 1);
            len -= 1;
        }
    }
};

Game.prototype.addAsteroid = function (){
    let asteroid = new Asteroid(
        // x: CONSTANTS.DIM_X * Math.random(),
        // y: CONSTANTS.DIM_Y * Math.random()
    this.randomPosition() ,{game: this});

    this.asteroids.push(asteroid);
}

Game.prototype.randomPosition = function () {
    return {
        x: CONSTANTS.DIM_X * Math.random(),
        y: CONSTANTS.DIM_Y * Math.random()
    };
}









module.exports = Game;










