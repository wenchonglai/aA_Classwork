import Level from './level';
import Bird from './bird';

export default class FlappyBird {
  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    this.dimensions = {
      width: canvas.width,
      height: canvas.height
    };

    canvas.addEventListener('click', (event => {
      this.bird.flap();
    }).bind(this));
  }

  animate(){
    this.level.drawBackground(this.ctx);
    this.bird.animate(this.ctx);

    if (this.running){
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  restart(){
    this.level = new Level(this.dimensions);
    this.bird = new Bird(1, this.dimensions)
    this.running = true;

    this.animate();
  }

  play(){
    this.running = true;
    this.animate();
  }

  click(){
    if (this.running){
      this.play();
    }
    this.bird.flap();
  }
}