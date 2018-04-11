class Bullet {
  constructor({
    x = 0,
    y = 0,
    radius = 4,
    speed = 5,
    fillColor = '#fff',
    strokeColor = '#000',
    from = ''
  }) {
    if (!from) throw 'param \'from\' must be set as a object\'s name';

    this.name = 'Bullet';
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.from = from;
    this.state = {
      drawLevel: 10,
      alive: true
    };
  }

  setState(state, status = false) {
    this.state[state] = status;
  }

  run() {
    this.y -= this.speed;
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
