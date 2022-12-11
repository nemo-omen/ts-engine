import { Vector2 } from './engine/Vector2.ts';

export type CircleOptions = {
  cx: number;
  cy: number;
  radius: number;
};

export class Circle {
  radius: number | undefined;
  position: Vector2 | undefined;
  origin: number[] | undefined[] | undefined;
  destination: Vector2 | undefined;
  velocity: Vector2 | undefined;


  constructor (options: CircleOptions) {
    this.radius = options.radius;
    this.position = new Vector2(options.cx, options.cy);
    this.velocity = new Vector2(5, 5); // hardcoded velocity for now
  }

  /**
   * Calculate movement — 3 steps:
   * 1. Calculate the movement vector [xb - xa, yb - ya]
   * 2. Compute the movement vector's length
   * 3. Normalize the movement vector
   * @param destX 
   * @param destY 
   * @param deltaTime 
   */

  /**
   * Resource: https://stackoverflow.com/a/20636920
   */

  move(destX: number, destY: number, deltaTime: number) {
    this.destination = new Vector2(destX, destY);
    this.position = Vector2.add(
      this.position!,
      Vector2.pos(this.position!, this.destination!, deltaTime, 300)
    );
  }

  lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }
}
