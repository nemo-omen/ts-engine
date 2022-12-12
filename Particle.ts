import { Vector2 } from './engine/Vector2.ts';
import { PIXELS_PER_METER } from './constants.ts';

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
      this.setAcceleration(0.0, 9.8 * PIXELS_PER_METER);
      // Integrate acceleration and velocity to find the new position
      // !!!THIS IS IMPORTANT!!!
      // particle.velocity += particle.acceleration * deltaTime
      this.velocity.add(Vector2.scale(this.acceleration, deltaTime));
      // particle.position += particle.velocity * deltaTime
      this.position.add(Vector2.scale(this.velocity, deltaTime));
   }

   setVelocity(x: number, y: number) {
      this.velocity.x = x;
      this.velocity.y = y;
   }

   setAcceleration(x: number, y: number) {
      this.acceleration.x = x;
      this.acceleration.y = y;
   }
}