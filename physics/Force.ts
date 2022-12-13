import { Particle } from "./Particle.ts";
import { Vector2 } from "./Vector2.ts";

function generateDrag(p: Particle, k: number): Vector2 {
   let dragForce: Vector2 = new Vector2(0, 0);

   if (p.velocity.magnitudeSquared() > 0) {
      const dragDirection = Vector2.scale(p.velocity.unitVector(), -1.0);
      const dragMagnitude = k * p.velocity.magnitudeSquared();
      dragForce = Vector2.scale(dragDirection, dragMagnitude);
   }

   return dragForce;
}

function generateFriction(p: Particle, k: number): Vector2 {
   const frictionDirection = Vector2.scale(p.velocity.unitVector(), -1.0);
   const frictionMagnitude = k;
   return Vector2.scale(frictionDirection, frictionMagnitude);
}

export { generateDrag, generateFriction };