import { PIXELS_PER_METER } from './constants';
import { Graphics } from './graphics/Graphics.ts';
import { World } from './World.ts';



// 1. handle input
// 2. coordinate graphics and world
// 3. Run updates
export class App {
   world: World;
   g: Graphics;
   running: boolean = false;
   root: HTMLElement;
   deltaTime = 0.0;
   lastTime = 0.0;

   constructor (root: HTMLElement = document.body) {
      this.world = new World();
      this.g = new Graphics();
      this.root = root;
      this.setup();
   }

   setup() {
      this.world.setDimensions(this.root.clientWidth, this.root.clientHeight);
      this.g.setDimensions(this.root.clientWidth, this.root.clientHeight);
      this.setListeners();
      this.start();
      this.update.bind(this);
   }

   start() {
      console.log('App start called...');
      requestAnimationFrame(() => this.update());
      this.running = true;
   }

   stop() {
      console.log('stopping...');
      this.world.stop();
      this.running = false;
   }

   update() {
      this.g.clear();
      this.setDelta();
      if (this.running) {
         this.world.update(this.deltaTime);

         // draw liquid on bottom third of the screen
         // this.g.drawRect(
         //    this.world.water[0],
         //    this.world.water[1],
         //    this.world.water[2],
         //    this.world.water[3],
         //    'deepskyblue',
         //    'deepskyblue',
         //    0,
         //    0.3
         // );

         for (const p of this.world.particles) {
            this.g.drawCircle(p.position.x, p.position.y, p.radius, 'tomato', 'cyan', 1);
         }
         requestAnimationFrame(() => this.update());
      } else {
         this.g.clear();
      }
   }

   setDelta() {
      let currentTime = window.performance.now();
      this.deltaTime = (currentTime - this.lastTime) / 1000;
      // protect delta time from weird values
      // good for debugging!
      if (this.deltaTime > 0.016) this.deltaTime = 0.016;
      this.lastTime = currentTime;
   }

   setDimensions() {
      this.g.setDimensions(this.root.clientWidth, this.root.clientHeight);
      this.world.setDimensions(this.root.clientWidth, this.root.clientHeight);
   }

   setListeners() {
      console.log('Setting listeners');
      window.addEventListener('resize', () => {
         this.setDimensions();
      });

      document.addEventListener('keyup', (event: KeyboardEvent) => {
         if (this.running) {
            if (event.key === 'Escape') {
               this.stop();
            }

            if (event.key === 'ArrowRight') {
               this.world.pushForce.x = 0;
            }

            if (event.key === 'ArrowLeft') {
               this.world.pushForce.x = 0;
            }

            if (event.key === 'ArrowUp') {
               this.world.pushForce.y = 0;
            }

            if (event.key === 'ArrowDown') {
               this.world.pushForce.y = 0;
            }
         } else {
            if (event.key === 'Enter') {
               this.start();
            }
         }
      });

      document.addEventListener('keydown', (event) => {
         if (this.running) {

            if (event.key === 'ArrowRight') {
               this.world.pushForce.x = 50 * PIXELS_PER_METER;
            }

            if (event.key === 'ArrowLeft') {
               this.world.pushForce.x = -50 * PIXELS_PER_METER;
            }

            if (event.key === 'ArrowUp') {
               this.world.pushForce.y = -50 * PIXELS_PER_METER;
            }

            if (event.key === 'ArrowDown') {
               this.world.pushForce.y = 50 * PIXELS_PER_METER;
            }
         }
      });

      this.g.canvas.addEventListener('click', (event: MouseEvent) => {
         // do something
         // console.log(event);
         this.world.addParticle(
            event.x,
            event.y,
            Math.random() * (12.0 - 4.0) + 4.0,
            Math.random() * (10.0 - 1.0) + 1.0
         );
      });

      this.g.canvas.addEventListener('drag', (event: Event) => {
         // do something
         console.log(event);
      });
   }
}
