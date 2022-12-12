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
