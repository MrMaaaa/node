function boundaryDetected(boundary, element, type = 'rectangle') {
  if (type === 'rectangle') {
    if (element.x <= 0) element.x = 0;
    if (element.y <= 0) element.y = 0;
    if (element.x + element.width >= boundary.width) {
      element.x = boundary.width - element.width;
    }
    if (element.y + element.height >= boundary.height) {
      element.y = boundary.height - element.height;
    }
  }
}

/**
 * 矩形和矩形碰撞检测（两个矩形的重心在X/Y轴上的距离都小于两个矩形长/宽的一半之和）
 * @param {Object} r1 矩形1
 * @param {Object} r2 矩形2
 * @return {Boolean}
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
