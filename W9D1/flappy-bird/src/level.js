export default class Level {
  constructor(dimensions) {
    this.dimensions = dimensions;
  }

  drawBackground(ctx) {
    var grd = ctx.createLinearGradient(0, 0, 0, this.dimensions.height);
    grd.addColorStop(0, "#bFEFFF");
    grd.addColorStop(1, "#007fff");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
  }
}