import { Vector2 } from './engine/Vector2.ts';

export class Particle {
   position: Vector2;
   velocity: Vector2; // change in position per frame
   acceleration: Vector2;
   mass: number;

   constructor (x: number, y: number, mass: number = 1.0) {
      this.position = new Vector2(x, y);
      this.velocity = new Vector2(0, 0);
      this.acceleration = new Vector2(0, 0);
      this.mass = mass;
   }

   update(deltaTime: number) {
      this.setVelocity(200 * deltaTime, 50 * deltaTime);
      this.position.add(this.velocity);
   }

   setVelocity(x: number, y: number) {
      this.velocity.x = x;
      this.velocity.y = y;
   }
}