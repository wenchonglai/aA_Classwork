function MovingObject({pos, vel, radius, color, game} = {}) {
  this.pos = pos;
  this.vel = vel;
  this.radius = radius;
  this.color = color;
  this.game = game;
}

MovingObject.prototype.draw = function (ctx){
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
  ctx.fill();
}

MovingObject.prototype.move = function(){
  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;

  if (this.game ){
    this.pos = this.game.wrap(this.pos);
  }
}

MovingObject.prototype.isCollidedWith = function (obj) {
  let {x,y} = obj.pos;
  let distance = (this.pos.x - x)** 2 + (this.pos.y - y)** 2;
  distance **= 0.5;
  return (distance <= (this.radius + obj.radius));
}












module.exports = MovingObject;