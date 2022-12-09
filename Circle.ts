import { Vector2 } from './Vector2.ts';

export type CircleOptions = {
  ctx: CanvasRenderingContext2D;
  cx: number;
  cy: number;
  radius: number;
  fillStyle: string;
  strokeStyle: string;
  strokeWidth: number;
};

export class Circle {
  ctx: CanvasRenderingContext2D;
  radius: number | undefined;
  position: Vector2 | undefined;
  origin: number[] | undefined[] | undefined;
  destination: Vector2 | undefined;
  velocity: Vector2 | undefined;
  fillStyle: string | undefined;
  strokeStyle: string | undefined;
  strokeWidth: number | undefined;


  constructor (options: CircleOptions) {
    this.ctx = options.ctx;
    // this.cx = options.cx;
    // this.cy = options.cy;
    this.radius = options.radius;
    this.fillStyle = options.fillStyle;
    this.strokeStyle = options.strokeStyle;
    this.strokeWidth = options.strokeWidth;
    this.position = new Vector2(options.cx, options.cy);
    this.velocity = new Vector2(5, 5); // hardcoded velocity for now
  }

  distance(dest: number[], pos: number[]) {
    return Math.sqrt(Math.pow((dest[0] - pos[0]), 2) + Math.pow((dest[0] - pos[0]), 2));
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
    // const mov = Vector2.movement(this.position!, new Vector2(destX, destY));
    // const norm = Vector2.normalize(mov);
    // this.position = Vector2.add(this.position!, this.velocity!);
    this.position = Vector2.pos(this.position!, this.destination!, deltaTime, this.velocity!.x);
  }

  lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.position!.x, this.position!.y, this.radius!, 0, 2 * Math.PI, false);

    if (this.fillStyle !== undefined) {
      this.ctx.fillStyle = this.fillStyle;
      this.ctx.fill();
    }

    if (this.strokeStyle !== undefined && this.strokeWidth !== undefined) {
      this.ctx.lineWidth = this.strokeWidth;
      this.ctx.strokeStyle = this.strokeStyle;
      this.ctx.stroke();
    }
  }

  update() {

  }
}
