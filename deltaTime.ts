let lastTime = new Date().getTime();

export function deltaTime() {
   let currentTime = new Date().getTime();
   let delta = (currentTime - lastTime) / 1000;

   lastTime = currentTime;
   return delta;
}