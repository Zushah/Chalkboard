/*
    The Chalkboard Library ===> https://www.github.com/Zushah/Chalkboard
    Version 1.7.0 Descartes Example Program: Fluid Flow
    Authored by Zushah ===> https://www.github.com/Zushah
*/

// Get the JavaScript Canvas API
var ctx = document.getElementById("canvas").getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var cb = Chalkboard; // Initialize Chalkboard as cb

// Vector field defined as F(x, y) = (-y, -x/(1 + x^2)^2), adapted from "Learning about Hamiltonian Monte Carlo" which can be found here: https://github.com/anvaka/fieldplay/blob/main/Awesome%20Fields.md
var F = cb.vec2.field("y", "-x / ((1 + x * x) * (1 + x * x))");

// Basic particle system to simulate the fluid flow
class Particle {
    constructor() {
        this.pos = cb.vec2.new(cb.numb.random(-canvas.width / 2, canvas.width / 2), cb.numb.random(-canvas.height / 2, canvas.height / 2)); // Position vector
        this.vel = cb.vec2.new(0); // Velocity vector
        this.ppos = this.pos; // Previous position vector
    }
    update() {
        // Update the particle's position and velocity
        this.vel = cb.vec2.magset(cb.vec2.fromField(F, cb.vec2.scl(this.pos, 1/100)), 5); // Velocity direction depends on the (scaled) vector field, velocity magnitude is set to always be 5
        this.pos = cb.vec2.add(this.pos, this.vel); // Velocity is added to the position
    }
    constrain() {
        // Constrain the particle position within the canvas
        // The canvas coordinates are within -width/-height and width/height so that the Cartestian point (0, 0) is in the center of the canvas
        if(this.pos.x > canvas.width / 2) {
            this.pos.x = -canvas.width / 2;
            this.ppos = this.pos;
        }
        if(this.pos.x < -canvas.width / 2) {
            this.pos.x = canvas.width / 2;
            this.ppos = this.pos;
        }
        if(this.pos.y > canvas.height / 2) {
            this.pos.y = -canvas.height / 2;
            this.ppos = this.pos;
        }
        if(this.pos.y < -canvas.height / 2) {
            this.pos.y = canvas.height / 2;
            this.ppos = this.pos;
        }
    }
    draw() {
        // Draw the particle
        ctx.strokeStyle = "rgba(0, 0, 255, 0.1)";
        ctx.lineWidth = 1;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(this.ppos.x, this.ppos.y);
        ctx.stroke();
        ctx.restore();
        this.ppos = this.pos;
        this.update();
        this.constrain();
    }
}
// Create 500 particles in the particles array
var particles = [];
for(var i = 0; i < 500; i++) {
    particles.push(new Particle());
}

// Draw everything
ctx.fillStyle = "rgb(0, 0, 0)";
ctx.fillRect(0, 0, canvas.width, canvas.height);
function main() {
    for(var i = 0; i < particles.length; i++) {
        particles[i].draw();
    }
    window.requestAnimationFrame(main);
}
window.requestAnimationFrame(main);