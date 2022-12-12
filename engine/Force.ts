import { Particle } from "../Particle.ts";
import { Vector2 } from "./Vector2.ts";

function generateDrag(p: Particle, k: number): Vector2 {
   let dragForce: Vector2 = new Vector2(0.0, 0.0);

   if (p.velocity.magnitudeSquared() > 0) {
      const dragDirection = Vector2.scale(Vector2.normalize(p.velocity), -1.0);
      const dragMagnitude = k * p.velocity.magnitudeSquared();
      dragForce = Vector2.scale(dragDirection, dragMagnitude);
   }

   return dragForce;
}