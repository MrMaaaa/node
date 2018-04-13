class Game {
  constructor(stage = null) {
    if (!stage) {
      throw '未传入canvas dom对象';
    }

    if (!stage.getContext('2d')) {
      throw '不支持的canvas dom对象';
    }

    this.stage = stage;
    const style = getComputedStyle(this.stage);
    this.width = parseInt(style.width.replace(/px/, ''));
    this.height = parseInt(style.height.replace(/px/, ''));
    this.elements = [];
    this.ctx = this.stage.getContext('2d');
    this.fps = 60;
    this.state = 'STOP';
  }

  setState(state = 'CONTINUE') {
    switch (state) {
      case 'START': // 游戏开始
      case 'PAUSE': // 游戏暂停
      case 'CONTINUE': // 游戏继续
      case 'STOP': // 游戏停止
        this.state = state;
        break;
      default:
        throw 'state值不合法';
    }
  }

  start() {
    this.setState('START');
  }

  continue() {
    this.setState('CONTINUE');
  }

  pause() {
    this.setState('PAUSE');
  }

  stop() {
    this.setState('STOP');
  }

  toggle() {
    if (this.state === 'CONTINUE') {
      this.setState('PAUSE');
    } else if (this.state === 'PAUSE') {
      this.setState('CONTINUE');
    }
  }

  setFPS(fps = 60) {
    if (!isNaN(fps)) {
      this.fps = parseInt(fps);
    }
  }

  addElements(element) {
    this.elements.push(element);
  }

  init() {
    this.start();
  }

  draw(handleFunc) {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.elements.sort((before, after) => before.drawLevel > after.drawLevel);

    this.elements.map((elem, index) => {
      if (handleFunc) {
        // 执行每个元素的处理
        elem = handleFunc(elem);
      }

      // 将alive为true的元素进行绘制，为false的元素从队列中删除
      if (elem.state.alive) {
        elem.update();
        if (elem.state.move) {
          boundaryDetected(this, elem);
        }

        elem.draw(this.ctx);
      } else {
        this.elements.splice(index, 1);
      }
      return elem;
    });
  }
}
