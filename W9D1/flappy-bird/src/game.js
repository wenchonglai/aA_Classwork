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
    if (this.level.collidesWith(this.bird)){
      alert('dead');
      this.level.movePipes();
      this.running = false;
      this.restart();
    }

    this.level.drawBackground(this.ctx);
    this.bird.animate(this.ctx);
    this.level.movePipes();
    this.level.drawPipes(this.ctx);

    if (this.running){
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  restart(){
    setTimeout((() => {
      this.level = new Level(this.dimensions);
      this.bird = new Bird(1, this.dimensions)
      this.running = true;

      this.animate();
    }).bind(this), 1000)
    
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