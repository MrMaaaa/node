window.onload = async function() {
  const log = console.log.bind(console);

  const canvas = document.getElementById('canvas');

  window.onresize = resize;

  function resize() {
    canvas.setAttribute('width', '600');
    canvas.setAttribute('height', window.innerHeight);
    game.height = window.innerHeight;

    boundaryDetected(game, player);
  }

  const game = new Game(canvas);

  // 生成背景
  for (let i = 0; i < 20; i++) {
    const base = parseInt(i / 8 + 4);
    game.addElements(
      new Planet({
        x: parseInt(Math.random() * 650 - 50),
        y: parseInt(Math.random() * -game.height - 20),
        radius: base * 2,
        speed: base + parseInt(Math.random() * 2 + 1),
        color: '#000'
      })
    );
  }

  // 生成敌人
  for (let i = 0; i < 1; i++) {
    const enemy = new Enemy({
      texturePath:
        "/workspace/Treasure-For-TenfyMa/src/game_AirFighting/assets/airplanes/H'Soc.png"
      // 'file:///C:/Users/hasee/Documents/My-Project/git-node/src/game_AirFighting/assets/airplanes/H'Soc.png'
    });
    await enemy.init();
    game.addElements(enemy);
  }

  const player = new Player({
    texturePath:
      '/workspace/Treasure-For-TenfyMa/src/game_AirFighting/assets/airplanes/Aegir.png'
    // 'file:///C:/Users/hasee/Documents/My-Project/git-node/src/game_AirFighting/assets/airplanes/Aegir.png'
  });

  player.x = (game.width - player.width) / 2;
  player.y = game.height * 1.5;
  await player.init();

  const playerKeyDown = (e) => {
    const keyCode = e.keyCode;
    const state = keyCodeToState(keyCode);
    player.setState(state, true);
  };

  const playerKeyPress = (e) => {
    const keyCode = e.keyCode;
    const state = keyCodeToState(keyCode);
    player.setState(state, true);
  };

  const playerKeyUp = (e) => {
    const keyCode = e.keyCode;
    const state = keyCodeToState(keyCode);
    player.setState(state, false);

    if (state === 'shoot') {
      game.toggle();
      const bullet = new Bullet({
        x: player.x + player.width / 2,
        y: player.y - 5,
        from: player.name
      });
      game.addElements(bullet);
    }
  };

  window.addEventListener('keydown', playerKeyDown, false);
  window.addEventListener('keypress', playerKeyPress, false);
  window.addEventListener('keyup', playerKeyUp, false);

  const animate =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / game.fps);
    };

  resize();

  game.addElements(player);
  game.init();

  function run() {
    animate(() => {
      if (game.state === 'START') {
        if (player.y >= game.height - player.height * 2) {
          player.y -= player.speedY;
          game.draw((elem) => {
            // 如果背景的星球飞出地图，则重新对其进行定位
            if (elem.name === 'planet') {
              if (elem.y >= game.height + elem.radius) {
                elem.y = parseInt(Math.random() * -game.height - 20);
              }
            }

            return elem;
          });
        } else {
          player.setState('move', true);
          game.continue();
        }
      } else if (game.state === 'CONTINUE') {
        game.draw((elem) => {
          // 如果背景的星球飞出地图，则重新对其进行定位
          if (elem.name === 'planet') {
            if (elem.y >= game.height + elem.radius) {
              elem.y = parseInt(Math.random() * -game.height - 20);
            }
          }

          // 如果敌人飞船在玩家上方进行跟随处理
          if (elem.name === 'Enemy') {
            if (isRectangleCollision(elem, player)) {
              // 发生碰撞
              // game.stop();
            }
            if (elem.y < player.y) {
              if (elem.x < player.x) {
                elem.x += 2;
              } else {
                elem.x -= 2;
              }
            }
          }

          return elem;
        });
      }

      run();
    }, 1000 / game.fps);
  }

  run();
};
