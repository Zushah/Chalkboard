/*
    Chalkboard
    Version 3.0.2 Euler
    Released April 13th, 2026
    Authored by Zushah: https://www.github.com/Zushah
    Example Program: Fluid Flow
*/

// Initialize the JavaScript Canvas API
const ctx = document.getElementById("canvas").getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize Chalkboard
const cb = Chalkboard;

// Vector field defined as F(x, y) = (y, -x/(1 + x^2)^2)
// adapted from "Learning about Hamiltonian Monte Carlo" which can be found here: https://www.github.com/anvaka/fieldplay/blob/main/Awesome%20Fields.md
const F = cb.vect.field((x, y) => y, (x, y) => -x / ((1 + x*x) * (1 + x*x)));

// Basic particle system to simulate the fluid flow
class Particle {
    constructor() {
        this.pos = cb.vect.random(2, -canvas.width / 2, canvas.width / 2); // Position vector
        this.vel = cb.vect.init(0, 0); // Velocity vector
        this.ppos = this.pos; // Previous position vector
    }
    update() {
        // Update the particle's position and velocity
        this.vel = cb.vect.magset(cb.vect.fromField(F, cb.vect.scl(this.pos, 1/100)), 5); // Velocity direction depends on the (scaled) vector field, velocity magnitude is set to always be 5
        this.pos = cb.vect.add(this.pos, this.vel); // Velocity is added to the position
    }
    constrain() {
        // Constrain the particle position within the canvas
        // The canvas coordinates are within -width/-height and width/height so that the Cartestian point (0, 0) is in the center of the canvas
        if (this.pos.x > canvas.width / 2) {
            this.pos.x = -canvas.width / 2;
            this.ppos = this.pos;
        }
        if (this.pos.x < -canvas.width / 2) {
            this.pos.x = canvas.width / 2;
            this.ppos = this.pos;
        }
        if (this.pos.y > canvas.height / 2) {
            this.pos.y = -canvas.height / 2;
            this.ppos = this.pos;
        }
        if (this.pos.y < -canvas.height / 2) {
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
let particles = [];
for (let i = 0; i < 500; i++) {
    particles.push(new Particle());
}

// Draw everything
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
const main = () => {
    for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
    }
    window.requestAnimationFrame(main);
};
main();
