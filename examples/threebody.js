/*
    Chalkboard
    Version 3.0.1 Euler
    Released March 9th, 2026
    Authored by Zushah: https://www.github.com/Zushah
    Example Program: Three-Body Problem
*/

// Initialize the JavaScript Canvas API
const ctx = document.getElementById("canvas").getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize Chalkboard
const cb = Chalkboard;

// Define a custom 12-dimensional ODE system for three mutually attracting bodies
// State array structure: [x1, y1, x2, y2, x3, y3, vx1, vy1, vx2, vy2, vx3, vy3]
const ode = cb.diff.init((t, y) => {
    const x1 = y[0], y1 = y[1], x2 = y[2], y2 = y[3], x3 = y[4], y3 = y[5];
    const vx1 = y[6], vy1 = y[7], vx2 = y[8], vy2 = y[9], vx3 = y[10], vy3 = y[11];

    const dx12 = x2 - x1, dy12 = y2 - y1;
    const dx13 = x3 - x1, dy13 = y3 - y1;
    const dx23 = x3 - x2, dy23 = y3 - y2;

    // Distances cubed (|r|^3)
    const d12 = cb.real.pow(dx12 * dx12 + dy12 * dy12, 1.5);
    const d13 = cb.real.pow(dx13 * dx13 + dy13 * dy13, 1.5);
    const d23 = cb.real.pow(dx23 * dx23 + dy23 * dy23, 1.5);

    // Gravity accelerations (assuming G = 1 and m1 = m2 = m3 = 1)
    const ax1 = dx12 / d12 + dx13 / d13;
    const ay1 = dy12 / d12 + dy13 / d13;

    const ax2 = -dx12 / d12 + dx23 / d23;
    const ay2 = -dy12 / d12 + dy23 / d23;

    const ax3 = -dx13 / d13 - dx23 / d23;
    const ay3 = -dy13 / d13 - dy23 / d23;

    return [vx1, vy1, vx2, vy2, vx3, vy3, ax1, ay1, ax2, ay2, ax3, ay3];
}, 12);

// Setup variables
let smoothPoints = [];
let frame = 0;
const duration = 5;
const fps = 60;
const simulationSpeed = 0.25;
const scale = Math.min(canvas.width, canvas.height) / 3;
const colors = ["rgb(255, 100, 100)", "rgb(100, 255, 100)", "rgb(100, 100, 255)"];

const simulate = () => {
    // Generate random initial conditions between -1 and 1
    const y0 = cb.stat.random(12, -1, 1);

    // Solve via adaptive Dormand-Prince RK45 method
    const sol = cb.diff.solveAdaptive(ode, {
        t0: 0,
        t1: duration,
        y0: y0,
        h0: 0.01,
        hMin: 1e-15,
        rtol: 1e-8,
        atol: 1e-10,
        maxSteps: 500000
    });

    // Resample the variable-step RK45 solution into perfectly even time intervals
    const times = [];
    for (let t = 0; t <= duration; t += simulationSpeed / fps) {
        times.push(t);
    }
    smoothPoints = cb.diff.sample(sol, times);
    
    // Start animation state
    frame = 0;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// Generate the first simulation
simulate();

const main = () => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // If the animation finishes, generate a new simulation
    if (frame >= smoothPoints.length) {
        simulate();
    }

    const state = smoothPoints[frame];
    const cx = canvas.width / 2, cy = canvas.height / 2;

    // Draw the 3 bodies based on their extracted x, y positions
    for (let i = 0; i < 3; i++) {
        let x = cx + state[i * 2] * scale, y = cy + state[i * 2 + 1] * scale;

        // Wrap around the edges of the canvas ("toroidal" canvas) to create a continuous effect
        x = ((x % canvas.width) + canvas.width) % canvas.width;
        y = ((y % canvas.height) + canvas.height) % canvas.height;

        ctx.beginPath();
        ctx.arc(x, y, 6, 0, cb.PI(2));
        ctx.fillStyle = colors[i];
        ctx.fill();
    }

    frame++;
    window.requestAnimationFrame(main);
};
main();
