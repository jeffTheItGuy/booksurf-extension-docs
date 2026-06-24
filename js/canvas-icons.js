// js/canvas-icons.js
function initCanvasBackgrounds() {
const canvases = document.querySelectorAll('.bg-canvas');
const drawColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#6366f1';

canvases.forEach(canvas => {
const ctx = canvas.getContext('2d');
const type = canvas.dataset.icon;

let width = canvas.parentElement.offsetWidth;
let height = canvas.parentElement.offsetHeight;

const dpr = window.devicePixelRatio || 1;

function resizeCanvas() {
width = canvas.parentElement.offsetWidth;
height = canvas.parentElement.offsetHeight;
canvas.width = width * dpr;
canvas.height = height * dpr;
ctx.scale(dpr, dpr);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let time = 0;
function draw() {
time += 0.02; // Slightly faster for more dynamic feel
ctx.clearRect(0, 0, width, height);
ctx.strokeStyle = drawColor;
ctx.fillStyle = drawColor;
ctx.lineWidth = 2; // Thicker lines for more visibility
ctx.beginPath();

// Center the animations more prominently
const cx = width * 0.5;
const cy = height * 0.5;

switch(type) {
case 'search':
// Large sweeping radar rings - bigger and more dynamic
for(let i=1; i<=4; i++) {
ctx.beginPath();
const radius = (i * 50) + Math.sin(time + i) * 20;
ctx.arc(cx, cy, radius, 0, Math.PI * 2);
ctx.stroke();
}
// Rotating radar line
ctx.beginPath();
ctx.moveTo(cx, cy);
ctx.lineTo(cx + Math.cos(time * 1.5) * 150, cy + Math.sin(time * 1.5) * 150);
ctx.stroke();
break;

case 'customize':
// Large rotating pentagon with inner triangle
for(let i = 0; i < 5; i++) {
const angle = (Math.PI * 2 / 5) * i + time * 0.5;
const x = cx + Math.cos(angle) * 80;
const y = cy + Math.sin(angle) * 80;
if(i === 0) ctx.moveTo(x, y);
else ctx.lineTo(x, y);
}
ctx.closePath();
ctx.stroke();

// Inner rotating triangle
ctx.beginPath();
for(let i = 0; i < 3; i++) {
const angle = (Math.PI * 2 / 3) * i - time;
const x = cx + Math.cos(angle) * 40;
const y = cy + Math.sin(angle) * 40;
if(i === 0) ctx.moveTo(x, y);
else ctx.lineTo(x, y);
}
ctx.closePath();
break;

case 'folders':
// Large sliding panels with more movement
const slide = Math.sin(time) * 40;
ctx.strokeRect(cx - 80, cy - 50 + slide, 120, 80);
ctx.stroke();
ctx.beginPath();
ctx.strokeRect(cx - 40 + slide * 0.5, cy - 20, 120, 80);
break;

case 'data':
// Vertical data streams - more visible
for(let i = 0; i < 10; i++) {
const xPos = cx - 100 + (i * 25);
const yPos = ((time * 80 + i * 40) % (height + 150)) - 75;
ctx.moveTo(xPos, yPos);
ctx.lineTo(xPos, yPos + 50);
ctx.moveTo(xPos, yPos + 60);
ctx.lineTo(xPos, yPos + 70);
}
break;

case 'grid':
// Large morphing grid dots
const spacing = 40;
const morph = Math.sin(time) * 15;
for(let row = -2; row < 4; row++) {
for(let col = -2; col < 4; col++) {
const x = cx - 60 + (col * spacing) + (row % 2 === 0 ? morph : -morph);
const y = cy - 60 + (row * spacing);
ctx.moveTo(x + 3, y);
ctx.arc(x, y, 3, 0, Math.PI * 2);
}
}
break;

case 'wave':
// Large sweeping sine waves across the whole card
for(let w = 0; w < 4; w++) {
ctx.beginPath();
ctx.moveTo(0, cy + (w * 25) - 40);
for(let x = 0; x <= width; x += 8) {
const y = cy + (w * 25) - 40 + Math.sin((x * 0.025) - time * 1.5 + w) * 30;
ctx.lineTo(x, y);
}
ctx.stroke();
}
break;
}
ctx.stroke();
requestAnimationFrame(draw);
}
draw();
});
}

document.addEventListener('DOMContentLoaded', initCanvasBackgrounds);