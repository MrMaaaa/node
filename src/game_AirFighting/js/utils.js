function boundaryDetected(boundary, element, type = 'rectangle') {
  if (type === 'rectangle') {
    // if (
    //   element.x < 0 ||
    //   element.y < 0 ||
    //   element.x + element.width > boundary.width ||
    //   element.y + element.height > boundary.height
    // ) {
    //   return false;
    // } else {
    //   return true;
    // }
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
