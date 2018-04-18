class Vector2 {
  constructor(p1, p2 = { x: 0, y: 0 }) {
    if (
      Utils.typeOf(p1.x) === 'undefined' ||
      Utils.typeOf(p1.y) === 'undefined' ||
      Utils.typeOf(p2.x) === 'undefined' ||
      Utils.typeOf(p2.y) === 'undefined'
    ) {
      throw '参数格式错误';
    }

    this.x = p1.x - p2.x;
    this.y = p1.y - p2.y;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  sub(v) {
    return new Vector2({
      x: this.x - v.x,
      y: this.y - v.y
    });
  }
}

/**
 * 边界检测
 * @param {Object} boundary 边界
 * @param {Object} element 待检测元素
 * @param {String} type 待检测元素类型
 * @return {Boolean} 是否碰撞
 */
function boundaryDetected(boundary, element, type = 'rectangle') {
  if (type === 'rectangle') {
    if (element.x <= 0) {
      element.x = 0;
      return true;
    }
    if (element.y <= 0) {
      element.y = 0;
      return true;
    }
    if (element.x + element.width >= boundary.width) {
      element.x = boundary.width - element.width;
      return true;
    }
    if (element.y + element.height >= boundary.height) {
      element.y = boundary.height - element.height;
      return true;
    }
    return false;
  } else if (type === 'circle') {
    if (element.x <= 0) {
      element.x = 0;
      return true;
    }
    if (element.y <= 0) {
      element.y = 0;
      return true;
    }
    if (element.x + element.radius >= boundary.radius) {
      element.x = boundary.radius - element.radius;
      return true;
    }
    if (element.y + element.radius >= boundary.radius) {
      element.y = boundary.radius - element.radius;
      return true;
    }
    return false;
  }
}

/**
 * 矩形和矩形碰撞检测（两个矩形的重心在X/Y轴上的距离都小于两个矩形长/宽的一半之和）
 * @param {Object} r1 矩形1
 * @param {Object} r2 矩形2
 * @return {Boolean} 是否碰撞
 */
function isAirplaneCollision(r1, r2) {
  // x与y轴重心距离
  const centerX = Math.abs(r1.x + r1.width / 2 - (r2.x + r2.width / 2));
  const centerY = Math.abs(r1.y + r1.height / 2 - (r2.y + r2.height / 2));
  // 长与宽的一半之和
  const sumW = Math.abs((r1.width + r2.width) / 2);
  const sumH = Math.abs((r1.height + r2.height) / 2);

  if (centerX < sumW && centerY < sumH) {
    return true;
  } else {
    return false;
  }
}

/**
 * 矩形和圆碰撞检测（使用向量判断圆距离矩形最小值与圆半径进行比较 详见：https://www.zhihu.com/question/24251545）
 * @param {Object} r 矩形
 * @param {Object} c 圆
 * @return {Boolean} 是否碰撞
 */
function isBulletCollision(r, c) {
  // 首先将坐标系移动到矩形中心，同时将圆移动到第一象限（canvas中对应为第四象限）
  // 原点到矩形第一象限中的顶点坐标的向量
  const vr = new Vector2({
    x: r.width / 2,
    y: r.height / 2
  });

  // 将此时的圆心位置移动到第一象限
  const nr = {
    x: Math.abs(c.x - (r.x + r.width / 2)),
    y: Math.abs(c.y - (r.y + r.height / 2))
  };

  // 原点到圆的顶点坐标的向量
  const vc = new Vector2(nr);

  // vc - vr即可得到圆距离矩形最短距离，与圆半径进行比较判断是否相交
  const vu = vc.sub(vr);
  if (vu.x < 0) vu.x = 0;
  if (vu.y < 0) vu.y = 0;
  return vu.length() < c.radius;
}

function keyCodeToState(keyCode) {
  if (keyCode === 37 || keyCode === 65) {
    // A or left arrow
    return 'left';
  } else if (keyCode === 39 || keyCode === 68) {
    // D or right arrow
    return 'right';
  } else if (keyCode === 38 || keyCode === 87) {
    // W or up arrow
    return 'up';
  } else if (keyCode === 40 || keyCode === 83) {
    // S or down arrow
    return 'down';
  } else if (keyCode === 32) {
    // space
    return 'shoot';
  } else if (keyCode === 27) {
    // esc
    return 'option';
  }
}
