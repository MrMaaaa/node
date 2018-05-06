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
        window.navigator.platform === 'Win32'
          ? "file:///C:/MrMa/workspace/Treasure-For-TenfyMa/src/game_AirFighting/assets/airplanes/H'Soc.png"
          : "/workspace/Treasure-For-TenfyMa/src/game_AirFighting/assets/airplanes/H'Soc.png"
    });
    await enemy.init();
    game.addElements(enemy);
  }

  const player = new Player({
    texturePath:
      window.navigator.platform === 'Win32'
        ? 'file:///C:/MrMa/workspace/Treasure-For-TenfyMa/src/game_AirFighting/assets/airplanes/Aegir.png'
        : '/workspace/Treasure-For-TenfyMa/src/game_AirFighting/assets/airplanes/Aegir.png'
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
        game.draw((elem, index) => {
          // 如果背景的星球飞出地图，则重新对其进行定位
          if (elem.name === 'planet') {
            if (elem.y >= game.height + elem.radius) {
              elem.y = parseInt(Math.random() * -game.height - 20);
            }
          }

          if (elem.name === 'Bullet') {
            if (elem.y + elem.height < 0) {
              game.elements.splice(index, 1);
            }
          }

          // 如果敌人飞船在玩家上方进行跟随处理
          if (elem.name === 'Enemy') {
            // 检测是否与玩家碰撞
            if (isAirplaneCollision(elem, player)) {
              player.setState('alive', false);
              game.gameEnd();
              return false;
            }

            // 检测是否与玩家子弹碰撞
            game.elements.map((item, i) => {
              if (item.name === 'Bullet' && isBulletCollision(elem, item)) {
                game.elements.splice(i, 1);
                elem.y = -elem.height;
                player.updatePoint(elem.point);
                document.getElementById('score').innerText = player.points;
              }
            });

            // 敌人移动
            if (elem.y < player.y + 5) {
              if (elem.x < player.x + 5) {
                elem.x += 2;
              } else {
                elem.x -= 2;
              }
            }

            // 如果该飞船已经超出地图，将其位置恢复到顶部
            if (elem.y > game.height) {
              elem.y = -elem.height;
            }
          }

          return elem;
        });
      }

      run();
    }, 1000 / game.fps);
  }

  function updatePoint(point) {}

  run();
};
