Function.prototype._inherits = function(superClass) {
  function Surrogate() {}
  Surrogate.prototype = superClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
}

Function.prototype.inherits = function(superClass){
  this.prototype = Object.create(superClass.prototype);
  this.prototype.constructor = this;
}

function MovingObject (speed) { this.speed = speed; }

MovingObject.prototype.stop = function(){
  this.speed = 0;
  console.log(`${this.name || this.constructor.name} stopped`);
}

function Ship (speed, name) { MovingObject.call(this, speed); this.name = name; }
Ship.inherits(MovingObject);

function Asteroid (speed, mass) { MovingObject.call(this, speed); this.mass = mass; }
Asteroid.inherits(MovingObject);

let cat = new Ship(1, 'cat');
console.log(cat, cat.constructor.name);
cat.stop();

let asteroid = new Asteroid(2, -1);
console.log(asteroid, asteroid.constructor.name);
asteroid.stop();