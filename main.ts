/**
 * Note: Some of the basic vector math for this learning
 * project can be found at the following sites:
 * https://www.toptal.com/game/video-game-physics-part-i-an-introduction-to-rigid-body-dynamics
 * https://www.gameludere.com/2019/11/23/vector-algebra-and-game-programming/
 */
import './style.css';
import { w, canvas, ctx } from './canvas.ts';
import { Circle } from './Circle.ts';
import { deltaTime } from './deltaTime.ts';
import { Vector2 } from './Vector2.ts';

let mult = 1;

const minX = 40;
const minY = 60;
const maxX = canvas.width - 40;
const maxY = canvas.height - 60;

let dest: Vector2 = new Vector2(minX, minY);

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
  // circle.position!.y = Math.floor(Math.random() * (65 - 55) + 55);

  if ((circle.position!.x >= maxX) || circle.position!.y >= maxY) {
    dest.x = minX;
    dest.y = maxY;

    if (circle.velocity!.x > 0) {
      circle.velocity!.x *= -1;
    }

    if (circle.velocity!.y > 0) {
      circle.velocity!.y *= -1;
    }
  }

  if ((circle.position!.x <= minX) || circle.position!.y <= minY) {
    dest.x = maxX;
    dest.x = maxY;

    // negate velocity if less than 0
    if (circle.velocity!.x < 0) {
      circle.velocity!.x *= -1;
    }

    // negate velocity if greater than 0;
    if (circle.velocity!.y < 0) {
      circle.velocity!.y *= -1;
    }
  }

  circle.move(dest.x, dest.y, deltaTime());

  circle.render();

  w.requestAnimationFrame(update);
}

function clear() {
  ctx!.fillStyle = '#120919';

  ctx!.fillRect(0, 0, canvas.width, canvas.height);
}