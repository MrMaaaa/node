class Airplane {
  constructor({
    texturePath = '',
    width = 40,
    height = 60,
    x = 200,
    y = 0,
    speedX = 2,
    speedY = 2
  }) {
    this.name = 'Airplane';
    this.texturePath = texturePath;
    this.texture = null;
    this.width = width;
    this.height = height;
    this.speedX = speedX;
    this.speedY = speedY;
    this.x = x;
    this.y = y;
    this.bullet = [];
    this.state = {
      drawLevel: 10,
      alive: false,
      up: false,
      down: false,
      left: false,
      right: false,
      shoot: false,
      move: false, // 用来判断是否允许移动
      invincible: false // 无敌
    };
  }

  init() {
    return new Promise((resolve, reject) => {
      let img = new Image(this.width, this.height);
      img.src = this.texturePath;
      img.onload = () => {
        this.texture = img;
        this.setState('alive', true);
        resolve();
      };
      img.onerror = () => {
        reject();
      };
    });
  }

  update() {}

  setState(state, status = false) {
    this.state[state] = status;
  }

  draw(ctx) {
    ctx.save();
    // TODO 左右移动时对飞机进行y轴的旋转
    // if (this.state.left) {
    //   ctx.setTransform(1, 0, 0, 1, 0, 0);
    // } else if (this.state.right) {
    //   ctx.setTransform(1, 0, 0, 1, 0, 0);
    // }
    ctx.drawImage(this.texture, this.x, this.y, this.width, this.height);
    ctx.restore();
  }

  fire() {}
}
