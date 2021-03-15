const SCALE = 0.2;
const CONSTANTS = {
  RATIO: 0.1,
  GRAVITY:  0.5 * SCALE,
  FLAP_SPEED:  -8 * (SCALE ** 0.5),
  TERMINAL_VEL:  12,
  BIRD_RADIUS:  18
};

export default class Bird {
    constructor(velocity, dimensions) {
        this.velocity = velocity;
        this.dimensions = dimensions
        this.position = {x: dimensions.width / 3, y: dimensions.height / 2}
    }

    drawBird(ctx) {
        ctx.fillStyle = "#ffdf00";
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, CONSTANTS.BIRD_RADIUS, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.arc(this.position.x + 8, this.position.y - 4, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.position.x + 8, this.position.y - 4, 2, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = "#ff3f1f";
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.ellipse(this.position.x + 10, this.position.y + 10, 10, 2, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(this.position.x + 10, this.position.y + 6, 10, 2, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    animate(ctx) {
        this.move();
        this.drawBird(ctx);
    }

    move(){
        this.position.y += (this.velocity += CONSTANTS.GRAVITY);
    }

    flap(){
        this.velocity = CONSTANTS.FLAP_SPEED;
    }

}