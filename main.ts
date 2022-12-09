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

let dest: number;

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

  if ((circle.position!.x >= (maxX))) {
    dest = minX;

    if (circle.velocity!.x > 0) {
      circle.velocity!.x *= -1;
    }

    if (circle.velocity!.y > 0) {
      circle.velocity!.y *= -1;
    }
  }

  if ((circle.position!.x <= (minX))) {
    dest = maxX;

    // negate velocity if less than 0
    if (circle.velocity!.x < 0) {
      circle.velocity!.x *= -1;
    }

    // negate velocity if greater than 0
    if (circle.velocity!.y < 0) {
      circle.velocity!.y *= -1;
    }
  }

  circle.move(dest, circle.position!.y, deltaTime());

  circle.render();

  w.requestAnimationFrame(update);
}

function clear() {
  ctx!.fillStyle = '#120919';

  ctx!.fillRect(0, 0, canvas.width, canvas.height);
}