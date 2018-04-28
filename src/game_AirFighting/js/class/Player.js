class Player extends Airplane {
  constructor({
    texturePath = '',
    width = 40,
    height = 60,
    x = 200,
    y = 0,
    speedX = 4,
    speedY = 4
  }) {
    super({
      texturePath,
      width,
      height,
      x,
      y,
      speedX,
      speedY
    });

    this.name = 'Player';
    this.points = 0;
  }

  update() {
    if (this.state.move && this.state.up) {
      this.y -= this.speedY;
    }

    if (this.state.move && this.state.right) {
      this.x += this.speedX;
    }

    if (this.state.move && this.state.down) {
      this.y += this.speedY;
    }

    if (this.state.move && this.state.left) {
      this.x -= this.speedX;
    }
  }

  updatePoint(point) {
    this.points += parseInt(point);
  }
}
