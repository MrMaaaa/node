class Planet {
  constructor(
    x = 0,
    y = 0,
    radius = 10,
    speed = 5,
    background = '#ddd',
    color = '#ddd'
  ) {
    this.name = 'planet';
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.background = background;
    this.color = color;
    this.state = {
      drawLevel: 0,
      alive: true
    };
  }

  setState(state, status = false) {
    this.state[state] = status;
  }

  run() {
    this.y += this.speed;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.background;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}
