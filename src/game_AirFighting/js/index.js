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
    game.addElements(
      new Planet(
        parseInt(Math.random() * 390 + 5),
        parseInt(Math.random() * -400 - 20),
        parseInt(Math.random() * 5 + 5),
        parseInt(Math.random() * 1 + 3)
      )
    );
  }

  const player = new Airplane(
    '/workspace/Treasure-For-TenfyMa/src/game_AirFighting/assets/airplanes/Aegir.png'
  );
  player.x = (game.width - player.width) / 2;
  player.y = game.height + player.height * 3;
  player.init();

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
      if (
        game.state === 'START' &&
        player.y >= game.height - player.height * 2
      ) {
        player.y -= player.speedY;
        game.draw();
      } else {
        player.setState('move', true);
        game.continue();
      }
      if (game.state === 'CONTINUE') {
        game.draw();
      }

      run();
    }, 1000 / game.fps);
  }

  // run();
};
