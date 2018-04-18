class Enemy extends Airplane {
  constructor({
    texturePath = '',
    width = 40,
    height = 60,
    x = 200,
    y = 0,
    speedX = 1,
    speedY = 2
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

    
    this.name = 'Enemy';
    this.y = -this.height;
    this.state.move = true;
    this.state.down = true;
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
}
