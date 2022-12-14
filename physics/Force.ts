import { PIXELS_PER_METER } from "../constants.ts";
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

function generateGravity(a: Particle, b: Particle, G: number, minDistance: number, MaxDistance: number): Vector2 {
   // Fg = G * ((a.mass * b.mass) / distance^2) * direction
   const d = Vector2.subtract(a.position, b.position);
   let distanceSquared = d.magnitudeSquared();
   distanceSquared = Math.min(Math.max(distanceSquared, minDistance), MaxDistance);

   const attractionDirection = d.unitVector();
   const attractionMagnitude = G * ((a.mass * b.mass) / distanceSquared);
   const attraction = Vector2.scale(attractionDirection, attractionMagnitude);
   return attraction;
}

function jumpImpulse(velocity: Vector2): Vector2 {
   const baseVec = new Vector2((velocity.x * -1), velocity.y + 5 * PIXELS_PER_METER);
   const impulseDirection = baseVec.unitVector();
   const impulseMagnitude = baseVec.mag();
   return Vector2.scale(impulseDirection, (impulseMagnitude * -5));
}

export { generateDrag, generateFriction, generateGravity, jumpImpulse };