const w = window;

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

document.body.appendChild(canvas);

canvas.width = w.innerWidth;
canvas.height = w.innerHeight;

export { w, canvas, ctx };
