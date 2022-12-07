export class Circle {
  ctx: CanvasRenderingContext2D;
  radius: number;
  cx: number;
  cy: number;
  origin: number[] | undefined;
  fillStyle: string | undefined;
  strokeStyle: string | undefined;
  strokeWidth: number | undefined;

  constructor(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number) {
    this.ctx = ctx;
    this.init(cx, cy, radius);
  }

  init(cx: number, cy: number, radius: number) {
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
  }
  
  distance(dest: number[], pos: number[]) {
    return Math.sqrt(Math.pow((dest[0] - pos[0]), 2), Math.pow((dest[1] - pos[1]), 2));
  }

  move(destX: number, destY: number, deltaTime: number) {
    this.origin[0] = this.cx;
    this.origin[1] = this.cy;
    this.cx += this.lerp(origin[0], this.destX, deltaTime);
    this.cy += this.lerp(origin[1], this.destY, deltaTime);
  }

  lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  render(fillStyle: string | undefined,
         strokeStyle: string | undefined = undefined,
         lineWidth: number | undefined = undefined) {
    this.ctx.beginPath();
    this.ctx.arc(this.cx, this.cy, this.radius, 0, 2 * Math.PI, false);
    console.log(fillStyle); 
    if(fillStyle !== undefined) {
      this.ctx.fillStyle = fillStyle;
      this.ctx.fill();
    }

    if(strokeStyle !== undefined && lineWidth !== undefined) {
      this.ctx.lineWidth = lineWidth;
      this.ctx.strokeStyle = strokeStyle;
      this.ctx.stroke();
    }
  }
}
