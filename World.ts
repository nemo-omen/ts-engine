import { Particle } from "./Particle.ts";

export class World {
   width = 0;
   height = 0;
   deltaTime = 0.0;
   lastTime = 0.0;
   particles: Particle[] = [];


   constructor () {
      // this.addParticle(100, 200);
   }

   setDimensions(width: number, height: number) {
      this.width = width;
      this.height = height;
   }

   update(deltaTime: number) {
      for (const p of this.particles) {
         // if (!this.onScreen(p.position.x, p.position.y)) {
         //    p.acceleration.scale(-1);
         //    p.velocity.scale(-1);
         //    // p.position.y = this.height - p.radius;
         // }
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

   addParticle(x: number, y: number) {
      const p = new Particle(x, y);
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