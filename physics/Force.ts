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

function generateGravity(a: Particle, b: Particle, G: number): Vector2 {
   // Fg = G * ((a.mass * b.mass) / distance^2) * direction
   const d = Vector2.subtract(a.position, b.position);
   // console.log({ d });
   const distanceSquared = d.magnitudeSquared();
   const attractionDirection = d.unitVector();
   const attractionMagnitude = G * ((a.mass * b.mass) / distanceSquared);
   // console.log({ attractionMagnitude });

   const attraction = Vector2.scale(attractionDirection, attractionMagnitude);
   return attraction;
}

export { generateDrag, generateFriction, generateGravity };