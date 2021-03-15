import Level from './level';
import Bird from './bird';

export default class FlappyBird {
  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };

  }

  animate(){
    // this.level.drawBackground(this.ctx);
    this.bird.animate(this.ctx)
  }

  restart(){
    this.level = new Level(this.dimensions);
    this.bird = new Bird(1, this.dimensions)
    this.animate();
  }
}