function $(id) {
  return document.getElementById(id);
}

class Ball {
  constructor(x, y, r, m, vx, vy, ax, ay, color) {
    this._name_ = 'ball';
    this.x = x; // x 坐标
    this.y = y; // y 坐标
    this.r = r; // 半径
    this.m = m; // 质量
    this.vx = vx; // x 速度
    this.vy = vy; // y 速度
    this.ax = ax; // x 加速度
    this.ay = ay; // y 加速度
    this.color = color; // 颜色
  }

  run(ctx, w = 0, h = 0) {
    if (!ctx) return;
    if (this.x - this.r <= 0 || this.x + this.r >= w) {
      this.vx *= -1;
    }
    if (this.y - this.r <= 0 || this.y + this.r >= h) {
      this.vy *= -1;
    }
    this.x += this.vx;
    this.y += this.vy;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  }
}

function randomBallData() {
  const r = Math.random() * 20 + 5;
  return [
    parseInt(Math.random() * canvasWidth),
    parseInt(Math.random() * canvasHeight),
    parseInt(r),
    parseInt(r / 2),
    parseInt(Math.random() * 2 + 1),
    parseInt(Math.random() * 2 + 1),
    0,
    0,
    `#${(Math.random() * 0xffffff)
      .toString(16)
      .replace('.', '')
      .slice(0, 6)}`
  ];
}

function generateBall(num) {
  return new Array(num).fill(0).map(() => {
    return new Ball(...randomBallData());
  });
}

function animate(ctx) {
  if (isPlaying) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = '#3cf';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    balls.map((e) => {
      if (isPlaying) {
        e.run(ctx, canvasWidth, canvasHeight);
      }
    });
  }
  window.requestAnimationFrame(function() {
    animate(ctx);
  });
}

function resize() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.setAttribute('width', canvasWidth);
  canvas.setAttribute('height', canvasHeight);
}

const canvas = $('canvas');
const ctx = canvas.getContext('2d');
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

function start() {
  isPlaying = true;
  $('start').hidden = isPlaying;
  $('pause').hidden = !isPlaying;
}

function pause() {
  isPlaying = false;
  $('start').hidden = isPlaying;
  $('pause').hidden = !isPlaying;
}

resize();
window.addEventListener('resize', resize);

let isPlaying = true;
let ballNum = 2;
$('pause').hidden = !isPlaying;

document.addEventListener('keypress', (e) => {
  if (e.keyCode === 32) {
    isPlaying ? pause() : start();
  }
});
$('start').addEventListener('click', start);
$('pause').addEventListener('click', pause);

const balls = generateBall(ballNum);

window.requestAnimationFrame(function() {
  animate(ctx);
});
