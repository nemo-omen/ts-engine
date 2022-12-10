export class Vector2 {
   x: number;
   y: number;

   constructor (x: number, y: number) {
      this.x = x;
      this.y = y;
   }

   static mag(v: Vector2): number {
      return Math.sqrt((v.x * v.x) - (v.y * v.y));
   }

   static distance(v1: Vector2, v2: Vector2): number {
      const distVec = new Vector2((v2.x - v1.x), (v2.y - v1.y));
      return Math.sqrt((distVec.x * distVec.x) + (distVec.y * distVec.y));
   }

   static direction(v1: Vector2, v2: Vector2): Vector2 {
      return new Vector2((v1.x - v2.x), (v1.y - v2.y));
   }

   static movement(v1: Vector2, v2: Vector2) {
      return new Vector2((v2.x - v1.x), (v2.y - v1.y));
   }

   static add(v1: Vector2, v2: Vector2) {
      return new Vector2((v1.x + v2.x), (v1.y + v2.y));
   }

   static subtract(v1: Vector2, v2: Vector2) {
      return new Vector2((v1.x - v2.x), (v1.y - v2.y));
   }

   // note: need to "flip" the vector (opposite dir, etc)?
   // Vector2.scale(-1)
   static scale(v: Vector2, n: number): Vector2 {
      return new Vector2((v.x * n), (v.y * n));
   }

   static mult(v1: Vector2, v2: Vector2): Vector2 {
      return new Vector2((v1.x * v2.x), (v1.y * v2.y));
   }

   static normalize(v: Vector2) {
      const norm: Vector2 = new Vector2(v.x, v.y);
      const length = Vector2.mag(norm);

      if (length != 0) {
         norm.x /= length;
         norm.y /= length;
      }

      return norm;
   }

   static dot(v1: Vector2, v2: Vector2): number {
      return (v1.x * v2.x) + (v1.y * v2.y);
   }

   static perp(v1: Vector2): Vector2 {
      return new Vector2(v1.y, -v1.x);
   }

   static delta(v: Vector2, deltaTime: number, speed: number) {
      return (
         Vector2.scale(
            Vector2.scale(
               Vector2.normalize(v),
               deltaTime
            ),
            speed)
      );
   }

   static pos(startPos: Vector2, endPos: Vector2, deltaTime: number, speed: number) {
      const mov = Vector2.subtract(endPos, startPos);
      return Vector2.delta(mov, deltaTime, speed);
   }
}