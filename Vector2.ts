export class Vector2 {
   x: number;
   y: number;

   constructor (x: number, y: number) {
      this.x = x;
      this.y = y;
   }

   mag(): number {
      return Math.sqrt((this.x * this.x) - (this.y * this.y));
   }

   distance(v2: Vector2): number {
      const distVec = new Vector2((v2.x - this.x), (v2.y - this.y));
      return Math.sqrt((distVec.x * distVec.x) + (distVec.y * distVec.y));
   }

   direction(v2: Vector2): Vector2 {
      return new Vector2((this.x - v2.x), (this.y - v2.y));
   }

   add(v: Vector2) {
      this.x += v.x;
      this.y += v.y;
   }

   subtract(v: Vector2) {
      this.x -= v.x;
      this.y -= v.y;
   }

   mult(v: Vector2) {
      this.x *= v.x;
      this.y *= v.y;
   }

   div(v: Vector2) {
      this.x /= v.x;
      this.y /= v.y;
   }

   normalize() {
      const norm: Vector2 = new Vector2(this.x, this.y);
      const length = norm.mag();

      if (length != 0) {
         norm.x /= length;
         norm.y /= length;
      }

      return norm;
   }
}