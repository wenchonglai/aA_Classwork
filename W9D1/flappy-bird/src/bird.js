class Bird {
    constructor(velocity, dimensions) {
        this.v = velocity
        this.dimensions = dimensions
        this.position = {x: dimensions.width / 3, y: dimensions.height / 2}
    }

    drawBird(ctx) {
        ctx.fillStyle = "#ffdf00"
        ctx.strokeStyle = "black"
        ctx.beginPath()
        ctx.arc(this.dimensions.x, this.dimensions.y, 18, 0, Math.PI)
        ctx.fill()
        ctx.stroke()
    }

    animate(ctx) {
        this.drawBird(ctx)
    }

}