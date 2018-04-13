class Planet {
  constructor({
    x = 0,
    y = 0,
    radius = 10,
    speed = 5,
    fillColor = '#ddd',
    strokeColor = '#ddd'
  }) {
    this.name = 'planet';
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.state = {
      drawLevel: 0,
      alive: true
    };
  }

  setState(state, status = false) {
    this.state[state] = status;
  }

  update() {
    this.y += this.speed;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.strokeColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}
