import { Vector2 } from './Vector2.ts';
import { PIXELS_PER_METER } from '../constants.ts';

export class Particle {
   radius: number;
   position: Vector2;
   velocity: Vector2; // change in position per frame
   acceleration: Vector2;
   sumForces: Vector2;
   mass: number;
   invMass: number;

   constructor (x: number, y: number, radius: number = 8.0, mass: number = 1.0) {
      this.position = new Vector2(x, y);
      this.radius = radius;
      this.velocity = new Vector2(0, 0);
      this.acceleration = new Vector2(0, 0);
      this.sumForces = new Vector2(0, 0);
      this.mass = mass;
      if (mass != 0.0) {
         this.invMass = 1.0 / mass;
      } else {
         this.invMass = 0.0;
      }
   }

   update(deltaTime: number) {
      // constant acceleration
      // this.setAcceleration(0.0 * PIXELS_PER_METER, 9.8 * PIXELS_PER_METER);

      this.integrate(deltaTime);
   }

   weight(): Vector2 {
      return new Vector2(0.0, this.mass * 9.8 * PIXELS_PER_METER);
   }

   addForce(force: Vector2) {
      this.sumForces.add(force);
   }

   clearForces() {
      this.sumForces.x = 0.0;
      this.sumForces.y = 0.0;
   }

   // !!!THIS IS IMPORTANT!!!
   // Integrate acceleration and velocity to find the new position
   integrate(deltaTime: number) {
      // acceleration = force / mass
      this.acceleration = Vector2.scale(this.sumForces, this.invMass);
      // particle.velocity += particle.acceleration * deltaTime
      this.velocity.add(Vector2.scale(this.acceleration, deltaTime));
      // particle.position += particle.velocity * deltaTime
      this.position.add(Vector2.scale(this.velocity, deltaTime));
      // remove all forces at end of frame
      this.clearForces();
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