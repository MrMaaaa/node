class Airplane {
  constructor(
    texturePath = '',
    width = 20,
    height = 30,
    x = 200,
    y = 0,
    speedX = 2,
    speedY = 2
  ) {
    this.name = 'player';
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
      invincible: false
    };
  }

  init() {
    return new Promise((resolve, reject) => {
      let img = new Image(this.width, this.height);
      img.src = this.texturePath;
      img.onload = () => {
        this.texture = img;
        this.setState('alive', true);

        const playerKeyDown = (e) => {
          const keyCode = e.keyCode;
          const state = keyCodeToState(keyCode);
          this.setState(state, true);
        };

        const playerKeyPress = (e) => {
          const keyCode = e.keyCode;
          let state = keyCodeToState(keyCode);
          this.setState(state, true);
        };

        const playerKeyUp = (e) => {
          const keyCode = e.keyCode;
          let state = keyCodeToState(keyCode);
          this.setState(state, false);
        };

        window.addEventListener('keydown', playerKeyDown, false);
        window.addEventListener('keypress', playerKeyPress, false);
        window.addEventListener('keyup', playerKeyUp, false);
        resolve();
      };
      img.onerror = () => {
        reject();
      };
    });
  }

  run() {
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

  setState(state, status = false) {
    this.state[state] = status;
  }

  draw(ctx) {
    ctx.drawImage(this.texture, this.x, this.y, this.width, this.height);
  }

  fire() {}
}
