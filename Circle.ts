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
  cx: number | undefined;
  cy: number | undefined;
  origin: number[] | undefined[] | undefined;
  fillStyle: string | undefined;
  strokeStyle: string | undefined;
  strokeWidth: number | undefined;

  position: Vector2 | undefined;
  velocity: Vector2 | undefined;

  constructor (options: CircleOptions) {
    this.ctx = options.ctx;
    // this.cx = options.cx;
    // this.cy = options.cy;
    this.radius = options.radius;
    this.fillStyle = options.fillStyle;
    this.strokeStyle = options.strokeStyle;
    this.strokeWidth = options.strokeWidth;
    this.position = new Vector2(options.cx, options.cy);
    this.velocity = new Vector2(5, 0); // hardcoded velocity for now
  }

  distance(dest: number[], pos: number[]) {
    return Math.sqrt(Math.pow((dest[0] - pos[0]), 2) + Math.pow((dest[0] - pos[0]), 2));
  }

  move(destX: number, destY: number, deltaTime: number) {
    const destination = new Vector2(destX, destY);

    const dir = this.position!.direction(destination);
    const norm = dir.normalize();
    const distance = this.position!.distance(destination);

    // console.log(distance);
    // this.position!.x -= norm.x * this.velocity!.x * deltaTime;
    // this.position!.y -= norm.y * this.velocity!.y * deltaTime;
    this.position!.add(this.velocity!);

    // this.origin = [this.cx!, this.cy!];
    // this.cx! += this.lerp(this.origin[0], destX, deltaTime);
    // this.cy! += this.lerp(this.origin[1], destY, deltaTime);
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
}
