import { PIXELS_PER_METER } from "./constants.ts";
import { Vector2 } from "./physics/Vector2.ts";
import { generateDrag, generateFriction } from './physics/Force.ts';
import { Particle } from "./physics/Particle.ts";

export class World {
   width = 0;
   height = 0;
   deltaTime = 0.0;
   lastTime = 0.0;
   particles: Particle[] = [];
   pushForce: Vector2 = new Vector2(0.0, 0.0);
   // water: number[] = [];


   constructor () {
      // const smallBall = new Particle(100, 100, 8, 1);
      // this.particles.push(smallBall);
      // const bigBall = new Particle(50, 100, 12, 3.0);
      // this.particles.push(bigBall);
      // this.addParticle(100, 200);
   }

   setDimensions(width: number, height: number) {
      this.width = width;
      this.height = height;
      // this.water = [0.0, this.height * 0.6, this.width, this.height - (this.height * 0.6)];
   }

   update(deltaTime: number) {
      for (const p of this.particles) {
         // if (!this.onScreen(p.position.x, p.position.y)) {
         //    p.acceleration.scale(-1);
         //    p.velocity.scale(-1);
         //    // p.position.y = this.height - p.radius;
         // }
         // apply a "wind" force
         // const wind: Vector2 = new Vector2(0.2 * PIXELS_PER_METER, 0.0);
         // p.addForce(wind);

         // apply a "weight" force
         // weight = mass * acceleration of gravity
         // const weight: Vector2 = new Vector2(0.0, 9.8 * PIXELS_PER_METER);
         // p.addForce(weight);

         // apply "pushForce" (keyboard push)
         p.addForce(this.pushForce);

         // drag force for water area
         // if (p.position.y >= this.water[1]) {
         //    const drag: Vector2 = generateDrag(p, 0.06);
         //    // console.log(drag);
         //    p.addForce(drag);
         // }

         // apply friction force
         const friction = generateFriction(p, 10.0 * PIXELS_PER_METER);
         p.addForce(friction);

         if ((p.position.x - p.radius) <= 10) {
            p.acceleration.x *= -0.9;
            p.position.x = (p.radius + 10);
            p.velocity.x *= -0.9;
         }

         if ((p.position.x + p.radius) >= (this.width - 10)) {
            p.acceleration.x *= -0.9;
            p.position.x = (this.width - (10 + p.radius));
            p.velocity.x *= -0.9;
         }

         if ((p.position.y - p.radius) <= 10) {
            p.acceleration.y *= -0.9;
            p.position.y = (10 + p.radius);
            p.velocity.y *= -0.9;
         }

         if ((p.position.y + p.radius) >= (this.height - 10)) {
            p.acceleration.y *= -0.9;
            p.position.y = (this.height - (10 + p.radius));
            p.velocity.y *= -0.9;
         }

         p.update(deltaTime);
      }
   }

   stop() {
      this.particles = [];
   }

   addParticle(x: number, y: number, radius: number = 8, mass: number = 1) {
      const p = new Particle(x, y, radius, mass);
      this.particles.push(p);
   }

   onScreen(x: number, y: number): boolean {
      if (x > (this.width - 10) || x < 10.0) {
         return false;
      }

      if (y > (this.height - 10) || y < 10.0) {
         return false;
      }

      return true;
   }
}