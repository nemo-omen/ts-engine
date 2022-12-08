/**
 * Note: Some of the basic vector math for this learning
 * project can be found at:
 * https://www.gameludere.com/2019/11/23/vector-algebra-and-game-programming/
 */
import './style.css';
import { w, canvas, ctx } from './canvas.ts';
import { Circle } from './Circle.ts';
import { deltaTime } from './deltaTime.ts';

let mult = 1;

const minX = 40;
const maxX = canvas.width - 40;

const circle: Circle = new Circle({
  ctx: ctx!,
  cx: minX,
  cy: 60,
  radius: minX,
  fillStyle: 'tomato',
  strokeStyle: 'white',
  strokeWidth: 2
});

w.requestAnimationFrame(update);

function update() {
  clear(); // clear last frame
  if ((circle.cx! > maxX) || (circle.cx! < minX)) {
    mult = (mult * -1);
  }

  circle.cx! += mult * (deltaTime() * 500);
  circle.render();
  w.requestAnimationFrame(update);
}

function clear() {
  ctx!.fillStyle = '#120919';

  ctx!.fillRect(0, 0, canvas.width, canvas.height);
}