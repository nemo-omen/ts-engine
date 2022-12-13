type CanvasOpts = {
   bg: string;
   width: number | undefined;
   height: number | undefined;
   parent: HTMLElement;
};

class Graphics {
   canvas: HTMLCanvasElement;
   ctx: CanvasRenderingContext2D | null;
   width: number;
   height: number;
   bg: string;
   parent: HTMLElement;

   constructor (opts: CanvasOpts | Record<string, never> = {}) {
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');

      if (!opts.parent) {
         this.parent = document.body;
      } else {
         this.parent = opts.parent;
      }

      this.parent.appendChild(this.canvas);

      if (!opts.width) {
         this.width = this.parent.clientWidth;
      } else {
         this.width = opts.width;
      }

      if (!opts.height) {
         this.height = this.parent.clientHeight;
      } else {
         this.height = opts.height;
      }

      if (!opts.bg) {
         this.bg = '#000000';
      } else {
         this.bg = opts.bg;
      }

      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.clear();
   }

   drawCircle(x: number, y: number, r: number, fill: string, stroke: string, lineWidth: number): void {
      this.ctx!.beginPath();
      this.ctx!.arc(x, y, r, 0, 2 * Math.PI, false);

      if (!fill) {
         this.ctx!.fillStyle = '#ffffff';
      } else {
         this.ctx!.fillStyle = fill;
      }

      this.ctx!.fill();

      if (stroke) {
         this.ctx!.strokeStyle = stroke;
      }

      if (lineWidth) {
         this.ctx!.lineWidth = lineWidth;
      }

      this.ctx!.stroke();
   }

   drawRect(
      x: number,
      y: number,
      width: number,
      height: number,
      fill: string,
      stroke: string,
      lineWidth: number,
      alpha = 1.0
   ) {
      this.ctx!.globalAlpha = alpha;

      if (fill !== undefined) {
         this.ctx!.fillStyle = fill;
         this.ctx!.fillRect(x, y, width, height);
      }

      if (stroke !== undefined && lineWidth !== undefined) {
         this.ctx!.lineWidth = lineWidth;
         this.ctx!.strokeStyle = stroke;
         this.ctx!.stroke();
         // this.ctx!.strokeRect(x, y, width, height);
      }

      this.ctx!.globalAlpha = 1.0;
   }

   drawLine(origin: Record<string, number>, terminal: Record<string, number>, lineWidth: number = 1, strokeStyle: string = '#ffffff') {
      this.ctx!.beginPath();
      this.ctx!.moveTo(origin.x, origin.y);
      this.ctx!.lineTo(terminal.x, terminal.y);
      this.ctx!.strokeStyle = strokeStyle;
      this.ctx!.lineWidth = lineWidth;
      this.ctx!.stroke();
   }

   clear(): void {
      this.ctx!.fillStyle = this.bg;
      this.ctx!.fillRect(0, 0, this.width, this.height);
   }

   setDimensions(width: number, height: number) {
      this.width = width;
      this.height = height;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.clear();
   }
}

export { Graphics };
