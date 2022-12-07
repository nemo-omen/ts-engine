import { w, canvas, ctx } from './canvas.ts';
import { Circle } from './Circle.ts';
 
let lastTime = (new Date()).getTime();
let currentTime = 0;
let delta = 0;
let circleX = 20;
let mult = 1;


w.requestAnimationFrame(update);

function update() {
  clear(); // clear last frame
  setDeltaTime();
  if(circleX >= (canvas.width - 30)) {
    mult = -1;
  }

  if(circleX <= 0) {
    mult = 1;
  }

  circleX += mult * (delta * 500);
  /** Game Loop Update Stuff **/
  // circle(ctx, circleX, 60, 40, 'tomato');

  const circ = new Circle(ctx, circleX, 60, 40);
  circ.render('tomato', 'black', 4);
  setLastTime();
  w.requestAnimationFrame(update);
}

function setDeltaTime() {
  currentTime = (new Date()).getTime();
  delta = (currentTime - lastTime) / 1000;
}
// ctx.beginPath();
// ctx.arc(60, 60, 40, 0, 2 * Math.PI, false);
// ctx.fillStyle = 'tomato';
// ctx.fill();
function setLastTime() {
  lastTime = currentTime;
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function circle(context: CanvasRenderingContext2D,
                centerX: number,
                centerY: number, 
                radius: number,
                color: string) {
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
}

