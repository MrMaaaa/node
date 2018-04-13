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
  }
}
