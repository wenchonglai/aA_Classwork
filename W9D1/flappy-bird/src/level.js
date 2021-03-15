const CONSTANTS = {
  SPEED: 1,
  EFFECTIVE_HEIGHT: 490,
  GAP: 150,
  APART: 220,

}

export default class Level {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.pipes = [[0, Math.random() * CONSTANTS.EFFECTIVE_HEIGHT]]
  }

  drawBackground(ctx) {
    var grd = ctx.createLinearGradient(0, 0, 0, this.dimensions.height);
    grd.addColorStop(0, "#bFEFFF");
    grd.addColorStop(1, "#007fff");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    // this.drawPipes(ctx)
  }


  movePipes() {
    this.pipes.forEach(pipe => {pipe[0] -= CONSTANTS.SPEED})
    if (this.pipes[0][0] < 0) {this.pipes.shift()}
    if (this.pipes[2][0] < this.dimensions.width - CONSTANTS.APART) {this.pipes.push([this.dimensions.width, Math.random()*CONSTANTS.EFFECTIVE_HEIGHT])}
  }

  drawPipes(ctx) {
    console.log(this.pipes)
    this.pipes.forEach((pipe) => {
      this.drawPipe(ctx, pipe)
    })
  }
  
  drawPipe(ctx, [x, y]) {
    ctx.fillStyle = "green";
    ctx.strokeStyle = "Black";
    ctx.beginPath();
    ctx.rect(x, 0, x + 40, y);
    ctx.stroke();
    ctx.fill();
    ctx.beginPath();
    ctx.rect(x, y + CONSTANTS.GAP, x + 40, this.dimensions.height);
    ctx.stroke();
    ctx.fill();
  }
}