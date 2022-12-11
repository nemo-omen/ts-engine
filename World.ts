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