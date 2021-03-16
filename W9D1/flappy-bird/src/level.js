const CONSTANTS = {
  SPEED: 1,
  EFFECTIVE_HEIGHT: 490,
  GAP: 150,
  APART: 220,
  PIPE_WIDTH: 80
}

export default class Level {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.pipes = [[0, Math.random() * CONSTANTS.EFFECTIVE_HEIGHT], [220, Math.random() * CONSTANTS.EFFECTIVE_HEIGHT], [440, Math.random() * CONSTANTS.EFFECTIVE_HEIGHT]]
  }

  drawBackground(ctx) {
    let grd = ctx.createLinearGradient(0, 0, 0, this.dimensions.height);
    grd.addColorStop(0, "#bFEFFF");
    grd.addColorStop(1, "#007fff");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    this.drawPipes(ctx);
  }


  movePipes() {
    this.pipes.forEach(pipe => {pipe[0] -= CONSTANTS.SPEED})
    if (this.pipes[0][0] < -CONSTANTS.PIPE_WIDTH) {
      let pipe = this.pipes.shift();
      pipe[0] += CONSTANTS.APART * 3;
      this.pipes.push(pipe)
    }
    // if (this.pipes[2][0] < this.dimensions.width - CONSTANTS.APART) {this.pipes.push([this.dimensions.width, Math.random()*CONSTANTS.EFFECTIVE_HEIGHT])}
  }

  drawPipes(ctx) {
    ctx.strokeStyle = "Black";

    this.pipes.forEach((pipe) => {
      this.drawPipe(ctx, pipe)
    })
  }
  
  drawPipe(ctx, [x, y]) {
    let grd = ctx.createLinearGradient(x, 0, x + CONSTANTS.PIPE_WIDTH, 0);
    grd.addColorStop(0, "#007f00");
    grd.addColorStop(0.5, "#00ff00");
    grd.addColorStop(1, "#007f00");

    ctx.fillStyle = grd;
    
    ctx.beginPath();
    ctx.rect(x, 0, CONSTANTS.PIPE_WIDTH, y);
    ctx.stroke();
    ctx.fill();
    ctx.beginPath();
    ctx.rect(x, y + CONSTANTS.GAP, CONSTANTS.PIPE_WIDTH, this.dimensions.height);
    ctx.stroke();
    ctx.fill();
  }

  collidesWith({position, radius}){
    let {x, y} = position; //bird position

    return this.pipes.some(([x0, y0]) => { // pipe position
      return (
        x >= x0 - radius &&
        x <= x0 + radius && (
          y <= y0 + radius ||
          y >= y0 + CONSTANTS.GAP - radius
        )
      )
    });
  }
}